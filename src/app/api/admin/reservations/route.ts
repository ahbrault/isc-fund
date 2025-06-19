import { prisma } from '@/common';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all table reservations, and include the related event and guests for each.
    const reservations = await prisma.tableReservation.findMany({
      include: {
        event: true,
        guests: {
          orderBy: {
            isHost: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Process the data to create a clean structure for the frontend table
    const formattedData = reservations.map(res => {
      const host = res.guests.find(g => g.isHost);
      const paidSeats = res.guests.filter(g => g.paymentStatus === 'PAID').length;

      return {
        id: res.id,
        createdAt: res.createdAt,
        eventName: res.event.name,
        totalSeats: res.totalSeats,
        paidSeats: paidSeats,
        status: res.status,
        host: host
          ? {
              name: host.name,
              email: host.email,
              companyName: host.companyName,
            }
          : null,
        guests: res.guests.map(g => ({
          name: g.name,
          paymentStatus: g.paymentStatus,
        })),
      };
    });

    return NextResponse.json({ items: formattedData });
  } catch (error) {
    console.error('[API_ADMIN_RESERVATIONS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}
