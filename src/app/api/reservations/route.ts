import { prisma } from '@/common';
import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';
import { PaymentStatus } from '@prisma/client';

interface ReservationRequestBody {
  eventSlug: string;
  bookingType: 'individual' | 'table';
  totalSeats: number;
  paymentOption: 'full' | 'partial';
  hostInfo: {
    name: string;
    email: string;
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReservationRequestBody;
    const { eventSlug, bookingType, hostInfo, paymentOption } = body;
    const totalSeats = Number(body.totalSeats);

    // --- 1. Validate minimal required fields ---
    if (!eventSlug || !bookingType || !hostInfo?.name || !hostInfo?.email || !totalSeats) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // --- 2. Fetch Event ---
    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // --- 3. Advanced Availability Check (to prevent race conditions) ---
    const reservedSeatsCount = await prisma.tableGuest.count({
      where: {
        reservation: { eventId: event.id },
        paymentStatus: PaymentStatus.PAID,
      },
    });

    if (reservedSeatsCount + totalSeats > event.totalSeats) {
      const availableSeats = event.totalSeats - reservedSeatsCount;
      return NextResponse.json(
        { error: `Not enough seats available. Only ${availableSeats} seats left.` },
        { status: 409 }
      );
    }

    // --- 4. Create Reservation Shell in a Transaction ---
    const { newReservation, hostGuest } = await prisma.$transaction(async tx => {
      // Step A: Create the reservation record
      const reservation = await tx.tableReservation.create({
        data: {
          totalSeats: totalSeats,
          eventId: event.id,
          status: PaymentStatus.PENDING,
        },
      });

      // Step B: Create the host guest with minimal info
      const host = await tx.tableGuest.create({
        data: {
          name: hostInfo.name,
          email: hostInfo.email,
          isHost: true,
          paymentStatus: PaymentStatus.PENDING,
          reservationId: reservation.id,
        },
      });

      // Step C: If it's a table, create placeholder guests to reserve the seats
      if (bookingType === 'table' && totalSeats > 1) {
        const guestPlaceholders = Array.from({ length: totalSeats - 1 }).map((_, index) => ({
          name: `Guest ${index + 1}`,
          isHost: false,
          paymentStatus: PaymentStatus.PENDING,
          reservationId: reservation.id,
        }));
        await tx.tableGuest.createMany({
          data: guestPlaceholders,
        });
      }

      return { newReservation: reservation, hostGuest: host };
    });

    // --- 5. Create Stripe Payment Intent ---
    let amountToPay: number;
    const paymentMetadata: { [key: string]: string } = {
      reservationId: newReservation.id,
      guestId: hostGuest.id,
    };

    if (bookingType === 'table' && paymentOption === 'full') {
      amountToPay = event.seatPrice * totalSeats;
      paymentMetadata.payingFor = 'full_table';
    } else {
      // For individual bookings or partial table payment, host pays for one seat.
      amountToPay = event.seatPrice;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountToPay * 100),
      currency: event.currency,
      receipt_email: hostInfo.email,
      description: `Gala Reservation for ${event.name}`,
      automatic_payment_methods: { enabled: true },
      metadata: paymentMetadata,
    });

    // --- 6. Return the necessary info to the client ---
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      reservationId: newReservation.id,
      managementToken: newReservation.managementToken,
      amount: amountToPay,
      currency: event.currency,
    });
  } catch (err) {
    console.error('[API Create Reservation] Error:', err);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
