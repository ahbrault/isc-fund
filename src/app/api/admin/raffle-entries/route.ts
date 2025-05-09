import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    let hasMore = true;
    let startingAfter: string | undefined = undefined;
    const raffleEntries: {
      ticket_id: string;
      full_name: string;
      email: string;
      phone?: string;
      lot_id: number;
    }[] = [];

    while (hasMore) {
      const result: Stripe.ApiList<Stripe.PaymentIntent> = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: startingAfter,
      });

      const valid = result.data.filter(
        p =>
          p.status === 'succeeded' &&
          p.metadata?.is_lottery === 'true' &&
          (p.metadata?.lot_id === '7' || p.metadata?.lot_id === '8')
      );

      for (const p of valid) {
        raffleEntries.push({
          ticket_id: p.metadata.ticket_id || p.id,
          full_name: p.metadata.full_name || 'Unknown',
          email: p.metadata.email || '',
          phone: p.metadata.phone || undefined,
          lot_id: parseInt(p.metadata.lot_id, 10),
        });
      }

      hasMore = result.has_more;
      startingAfter = result.data.at(-1)?.id;
    }

    return NextResponse.json(raffleEntries);
  } catch (err) {
    console.error('[RAFFLE_ENTRIES_FETCH_ERROR]', err);
    return NextResponse.json({ error: 'Failed to load raffle entries' }, { status: 500 });
  }
}
