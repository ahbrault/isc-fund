import { prisma } from '@/common';
import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';

// The request body interface is complete
interface ReservationRequestBody {
  eventSlug: string;
  bookingType: 'individual' | 'table';
  joinByEmail?: string;
  totalSeats: number;
  paymentOption: 'full' | 'partial';
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
    const { eventSlug, bookingType, joinByEmail, hostInfo, totalSeats, paymentOption, guests } =
      body;

    // --- 1. Find the Event ---
    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // --- 2. Advanced Availability Check ---
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const reservedSeatsCount = await prisma.tableGuest.count({
      where: {
        reservation: { eventId: event.id },
        OR: [{ paymentStatus: 'PAID' }, { reservation: { createdAt: { gte: oneWeekAgo } } }],
      },
    });

    const seatsForThisBooking = bookingType === 'table' ? totalSeats : 1;

    if (reservedSeatsCount + seatsForThisBooking > event.totalSeats) {
      const availableSeats = event.totalSeats - reservedSeatsCount;
      return NextResponse.json(
        { error: `Not enough seats available. Only ${availableSeats} seats left.` },
        { status: 409 }
      );
    }

    let reservationId: string;
    let guestId: string;
    let amountToPay: number;
    let paymentMetadata: { [key: string]: string } = {};

    // --- 3. Handle different booking types ---

    if (bookingType === 'individual' && joinByEmail) {
      // --- SCENARIO A: Join an existing table ---
      const guestToJoin = await prisma.tableGuest.findFirst({
        where: { email: joinByEmail, reservation: { eventId: event.id } },
        include: { reservation: true },
      });

      if (!guestToJoin) {
        return NextResponse.json(
          { error: 'No reservation found with this email for this event.' },
          { status: 404 }
        );
      }

      const tableGuestCount = await prisma.tableGuest.count({
        where: { reservationId: guestToJoin.reservationId },
      });

      if (tableGuestCount >= guestToJoin.reservation.totalSeats) {
        return NextResponse.json({ error: 'This table is already full.' }, { status: 409 });
      }

      const newGuest = await prisma.tableGuest.create({
        data: {
          ...hostInfo,
          isHost: false,
          paymentStatus: 'PENDING',
          reservationId: guestToJoin.reservationId,
        },
      });

      reservationId = newGuest.reservationId;
      guestId = newGuest.id;
      amountToPay = event.seatPrice;
      paymentMetadata = { reservationId, guestId };
    } else {
      // --- SCENARIO B & C: Create a new reservation (for a table or an individual) ---
      const { newReservation, hostGuest } = await prisma.$transaction(async tx => {
        const reservation = await tx.tableReservation.create({
          data: {
            totalSeats: seatsForThisBooking,
            eventId: event.id,
            status: 'PENDING',
          },
        });

        const host = await tx.tableGuest.create({
          data: {
            ...hostInfo,
            isHost: true,
            paymentStatus: 'PENDING',
            reservationId: reservation.id,
          },
        });

        if (bookingType === 'table' && guests.length > 0) {
          await tx.tableGuest.createMany({
            data: guests.map(guest => ({
              name: guest.name,
              isHost: false,
              paymentStatus: 'PENDING',
              reservationId: reservation.id,
            })),
          });
        }
        return { newReservation: reservation, hostGuest: host };
      });

      reservationId = newReservation.id;
      guestId = hostGuest.id;
      amountToPay =
        bookingType === 'table' && paymentOption === 'full'
          ? event.seatPrice * totalSeats
          : event.seatPrice;
      paymentMetadata = { reservationId, guestId };
      if (bookingType === 'table' && paymentOption === 'full') {
        paymentMetadata.payingFor = 'full_table';
      }
    }

    // --- 4. Create Stripe Payment Intent ---
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountToPay * 100),
      currency: event.currency,
      receipt_email: hostInfo.email,
      description: `Gala Reservation for ${event.name}`,
      automatic_payment_methods: { enabled: true },
      metadata: paymentMetadata,
    });

    // --- 5. Return Response to Client ---
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      reservationId,
      amount: amountToPay,
      currency: event.currency,
    });
  } catch (err) {
    console.error('[API Create Reservation] Error:', err);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
