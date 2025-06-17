import { prisma } from '@/common';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const event = await prisma.event.findFirstOrThrow({});
    console.log('event', event);
    return NextResponse.json(event);
  } catch (err) {
    console.error('[API Create Reservation] Error:', err);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
