import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    let hasMore = true;
    let startingAfter: string | undefined = undefined;
    const allPayments = [];

    while (hasMore) {
      const result: Stripe.ApiList<Stripe.PaymentIntent> = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: startingAfter,
      });

      const valid = result.data.filter(p => p.status === 'succeeded');

      for (const p of valid) {
        allPayments.push({
          id: p.id,
          stripeId: p.id,
          fullName: p.metadata.full_name || p.metadata.name || 'Unknown',
          email: p.metadata.email || p.receipt_email || '',
          phone: p.metadata.phone || '',
          amount: p.amount,
          currency: p.currency,
          lotId: p.metadata.lot_id ? parseInt(p.metadata.lot_id) : null,
          type: (p.metadata.type || (p.metadata.is_lottery === 'true' ? 'lottery' : 'donation')) as
            | 'donation'
            | 'lottery'
            | 'auction',
          createdAt: p.created,
        });
      }

      hasMore = result.has_more;
      startingAfter = result.data.at(-1)?.id;
    }

    return NextResponse.json({ items: allPayments });
  } catch (error) {
    console.error('[STRIPE_FETCH_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch all payments' }, { status: 500 });
  }
}
