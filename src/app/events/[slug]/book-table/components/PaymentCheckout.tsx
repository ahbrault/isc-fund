'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { BookingFormData } from './BookingForm';

interface Props {
  onSuccessfulPayment: () => void;
  billingDetails: BookingFormData['hostInfo'];
}

export function PaymentCheckout({ billingDetails, onSuccessfulPayment }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // This is the core of the payment processing.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            ...billingDetails,
            address: {
              ...billingDetails.address,
              country: billingDetails.address.country?.name,
            },
          },
        },
      },
      redirect: 'if_required',
    });

    // This point will only be reached if the payment fails or requires an extra step.
    // If it succeeds immediately, the `else` block below is triggered.
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An unexpected error occurred.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else {
      // The payment was successful and did not require a redirect.
      // We can now update our UI to show the confirmation step.
      onSuccessfulPayment();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleConfirm} className="w-full space-y-6">
      <div className="rounded-md border border-gray-200 bg-white p-4 shadow-inner">
        <PaymentElement
          id="payment-element"
          options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
            },
            defaultValues: {
              billingDetails: {
                ...billingDetails,
                address: {
                  ...billingDetails.address,
                  country: billingDetails.address.country?.name,
                },
              },
            },
          }}
          onChange={() => setMessage(null)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Pay and Confirm Booking'}
      </button>

      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  );
}
