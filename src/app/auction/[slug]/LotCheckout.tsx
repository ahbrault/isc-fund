'use client';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function LotCheckout({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            name,
            email,
            phone,
          },
        },
      },
    });

    if (error) setMessage(error.message || 'Payment failed.');
    setLoading(false);
  };

  return (
    <form onSubmit={handleConfirm} className="mt-8 max-w-xl space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
      >
        {loading ? 'Processing…' : 'Confirm Payment'}
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}
