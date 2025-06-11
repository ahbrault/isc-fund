import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/common';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
      where: { slug },
      select: { id: true, totalSeats: true },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
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
