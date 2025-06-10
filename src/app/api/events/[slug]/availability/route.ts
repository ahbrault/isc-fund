import { prisma } from '@/common';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;

    const event = await prisma.event.findUnique({
      where: { slug },
      select: { id: true, totalSeats: true },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // --- 1. Advanced Availability Logic ---
    // Calculate the date for one week ago from now.
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Count guests who have either paid OR have a pending reservation
    // that is less than a week old.
    const reservedSeatsCount = await prisma.tableGuest.count({
      where: {
        reservation: { eventId: event.id },
        OR: [
          { hasPaid: true },
          {
            AND: [{ hasPaid: false }, { reservation: { createdAt: { gte: oneWeekAgo } } }],
          },
        ],
      },
    });

    const availableSeats = event.totalSeats - reservedSeatsCount;

    return NextResponse.json({
      totalSeats: event.totalSeats,
      reservedSeatsCount,
      availableSeats,
    });
  } catch (err) {
    console.error('Availability fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch event availability' }, { status: 500 });
  }
}
