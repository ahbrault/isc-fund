import { prisma } from '@/common';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Missing bid ID' }, { status: 400 });
    }

    await prisma.bid.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE_BID_ERROR', err);
    return NextResponse.json({ error: 'Failed to delete bid' }, { status: 500 });
  }
}
