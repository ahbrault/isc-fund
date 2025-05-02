import { NextResponse } from 'next/server';
import { stripe } from '@/common/config/stripe';

export async function POST(req: Request) {
  const { amount, email, description, metadata } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // en cents
      currency: 'usd',
      description: description || 'Donation',
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
