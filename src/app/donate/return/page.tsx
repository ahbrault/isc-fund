'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type PaymentStatus = 'loading' | 'succeeded' | 'processing' | 'requires_payment_method' | 'error';

export default function ReturnPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('payment_intent_client_secret');

  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!clientSecret) {
      setStatus('error');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const stripe = await import('@stripe/stripe-js').then(m =>
          m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        );
        if (!stripe) {
          setStatus('error');
          return;
        }

        const result = await stripe.retrievePaymentIntent(clientSecret);
        const pi = result.paymentIntent;

        if (!pi) {
          setStatus('error');
          return;
        }

        if (pi.status === 'succeeded') {
          setStatus('succeeded');
          setEmail(pi.receipt_email ?? null);
        } else {
          setStatus(pi.status as PaymentStatus);
        }
      } catch (err) {
        console.error('Error fetching payment intent:', err);
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [clientSecret]);

  if (status === 'loading') {
    return <p className="mt-10 text-center">Loading payment status...</p>;
  }

  if (status === 'succeeded') {
    return (
      <div className="mt-10 space-y-4 text-center">
        <h1 className="text-2xl font-bold text-green-600">🎉 Thank you for your donation!</h1>
        {email && (
          <p>
            A receipt has been sent to <strong>{email}</strong>.
          </p>
        )}
        <p>Your support makes a real difference ❤️</p>
        <a href="/donate" className="text-indigo-600 underline">
          Make another donation
        </a>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="mt-10 text-center">
        <p>⏳ Your payment is processing. You’ll receive an email once it’s confirmed.</p>
      </div>
    );
  }

  if (status === 'requires_payment_method') {
    return (
      <div className="mt-10 text-center">
        <p className="text-red-600">⚠️ Payment failed. Please try again with a different card.</p>
        <a href="/donate" className="text-indigo-600 underline">
          Return to donation page
        </a>
      </div>
    );
  }

  return (
    <div className="mt-10 text-center">
      <p className="text-red-600">
        An unexpected error occurred. Please contact us if the issue persists.
      </p>
      <a href="/donate" className="text-indigo-600 underline">
        Back to donation page
      </a>
    </div>
  );
}
