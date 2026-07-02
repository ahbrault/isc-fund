import { prisma } from '@/common';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const event = await prisma.event.findFirst({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
    });
    if (!event) {
      return NextResponse.json({ error: 'No upcoming event' }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (err) {
    console.error('[API events/next] Error:', err);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
