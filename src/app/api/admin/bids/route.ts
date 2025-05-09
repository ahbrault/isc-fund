export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/common';

export async function GET() {
  try {
    const bids = await prisma.bid.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ items: bids });
  } catch (err) {
    console.error('[FETCH_BIDS_ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch bids' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bid = await prisma.bid.create({
      data: {
        fullName: body.name,
        email: body.email,
        phone: body.phone,
        amount: body.amount,
        lotId: body.metadata.lot_id,
        lotTitle: body.metadata.lot_title,
      },
    });

    return NextResponse.json({ id: bid.id });
  } catch (err) {
    console.error('[CREATE_BID_ERROR]', err);
    return NextResponse.json({ error: 'Failed to create bid' }, { status: 500 });
  }
}
