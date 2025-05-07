import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 100,
    });

    const raffleEntries = payments.data
      .filter(p => p.status === 'succeeded')
      .filter(p => p.metadata?.is_lottery === 'true')
      .filter(p => p.metadata?.lot_id === '7' || p.metadata?.lot_id === '8')
      .map(p => ({
        ticket_id: p.metadata.ticket_id || p.id,
        full_name: p.metadata.full_name || 'Unknown',
        phone: p.metadata.phone || 'Unknown',
        email: p.metadata.email || '',
        lot_id: parseInt(p.metadata.lot_id, 10),
      }));

    return NextResponse.json(raffleEntries);
  } catch (err) {
    console.error('[Raffle API error]', err);
    return NextResponse.json({ error: 'Failed to load raffle entries' }, { status: 500 });
  }
}
