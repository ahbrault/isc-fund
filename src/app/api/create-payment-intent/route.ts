import { NextResponse } from 'next/server';
import { stripe } from '@/common';

export async function POST(req: Request) {
  const { amount, email, description } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // en cents
      currency: 'usd',
      description: description || 'Donation',
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
