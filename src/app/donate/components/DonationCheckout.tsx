'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { APP_ROUTES, DonorInfo } from '@/common';

type Props = DonorInfo & { label?: string };

export default function DonationCheckout({ name, email, phone, label }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isGala = label?.startsWith('Gala 2026');

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    // Store the payment type for the thank-you page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('payment_type', isGala ? 'gala' : 'donation');
      if (label) sessionStorage.setItem('payment_label', label);
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${APP_ROUTES.thankYou.path}`,
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
        onChange={() => setMessage('')}
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
        className={`w-full rounded-md py-2 text-white ${
          'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Processing…' : isGala ? 'Confirm Reservation' : 'Confirm Donation'}
      </button>
      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  );
}
