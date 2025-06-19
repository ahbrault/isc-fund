import { stripe } from '@/common/config/stripe';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { pi_id: string } }) {
  try {
    const paymentIntentId = params.pi_id;

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'Payment Intent ID is required' }, { status: 400 });
    }

    // Securely fetch payment details from Stripe on the server
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['latest_charge'], // expand to get card details
    });

    return NextResponse.json(paymentIntent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
