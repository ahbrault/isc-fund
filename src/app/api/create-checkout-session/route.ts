import { NextResponse } from 'next/server';
import { stripe } from '@/common';

export async function POST(req: Request) {
  const body = await req.json();

  const { amount, customLabel } = body;

  const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'custom',
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: customLabel || `Donation`,
            },
            unit_amount: amount * 100, // Stripe attend des cents
          },
          quantity: 1,
        },
      ],
      return_url: `${YOUR_DOMAIN}/donate/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
