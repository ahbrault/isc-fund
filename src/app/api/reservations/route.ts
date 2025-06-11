import { prisma } from '@/common';
import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';

interface ReservationRequestBody {
  eventSlug: string;
  totalSeats: number;
  paymentOption: 'full' | 'partial';
  bookingType: 'individual' | 'table';
  joinByEmail?: string;
  hostInfo: {
    name: string;
    email: string;
    phone?: string;
    address: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
  guests: { name: string }[];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReservationRequestBody;

    const { eventSlug, totalSeats, paymentOption, hostInfo, guests } = body;

    if (!eventSlug || !totalSeats || !paymentOption || !hostInfo || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (guests.length !== totalSeats - 1) {
      return NextResponse.json(
        { error: 'Guest count does not match total seats' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const reservedSeatsCount = await prisma.tableGuest.count({
      where: { reservation: { eventId: event.id } },
    });

    // Check the availability of seats
    if (reservedSeatsCount + totalSeats > event.totalSeats) {
      const availableSeats = event.totalSeats - reservedSeatsCount;
      return NextResponse.json(
        { error: `Not enough seats available. Only ${availableSeats} seats left.` },
        { status: 409 }
      );
    }

    const { newReservation, hostGuest } = await prisma.$transaction(async tx => {
      // Step 1: Create reservation
      const reservation = await tx.tableReservation.create({
        data: {
          totalSeats,
          eventId: event.id,
          status: 'PENDING',
        },
      });

      // Step 2: Create tableGuest for the host
      const host = await tx.tableGuest.create({
        data: {
          ...hostInfo,
          isHost: true,
          reservationId: reservation.id,
          // Managed by stripe webhook
          hasPaid: false,
        },
      });

      // Step 3: Create other tableGuests
      if (guests.length > 0) {
        await tx.tableGuest.createMany({
          data: guests.map(guest => ({
            name: guest.name,
            isHost: false,
            reservationId: reservation.id,
            hasPaid: false,
          })),
        });
      }

      return { newReservation: reservation, hostGuest: host };
    });

    // Create payment intent
    let amountToPay = 0;
    let paymentMetadata: { [key: string]: string } = {
      reservationId: newReservation.id,
      guestId: hostGuest.id,
    };

    if (paymentOption === 'full') {
      amountToPay = event.seatPrice * totalSeats;
      paymentMetadata.payingFor = 'full_table'; // Flag used for the webhook
    } else {
      // 'partial'
      amountToPay = event.seatPrice;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountToPay * 100),
      currency: event.currency,
      receipt_email: hostGuest.email || '',
      description: `Gala Reservation: Table for ${totalSeats}`,
      automatic_payment_methods: { enabled: true },
      metadata: paymentMetadata,
    });

    // Return client Response
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      reservationId: newReservation.id,
      amount: amountToPay,
      currency: event.currency,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
