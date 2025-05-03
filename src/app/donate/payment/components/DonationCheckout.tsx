'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { DonorInfo } from '@/common';

export default function DonationCheckout({ name, email, phone }: DonorInfo) {
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
        return_url: `${window.location.origin}/donate/return`,
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            email,
            name,
            phone,
          },
        },
      },
    });

    if (error) {
      setMessage(error.message || 'Payment failed.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleConfirm} className="mx-auto mt-8 w-full max-w-xl space-y-6">
      <PaymentElement
        options={{
          layout: {
            type: 'tabs',
            defaultCollapsed: false,
          },
          defaultValues: {
            billingDetails: {
              name,
              phone,
              email,
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
      >
        {loading ? 'Processing…' : 'Confirm Donation'}
      </button>
      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  );
}
