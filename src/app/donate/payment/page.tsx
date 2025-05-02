'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { DonationCheckout, DonationSelector } from './components';
import { StripeElementsOptions } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Page() {
  const [clientSecret, setClientSecret] = useState('');
  const [summary, setSummary] = useState<{
    name: string;
    email: string;
    phone: string;
    amount: number;
    label: string;
  }>({ name: '', email: '', phone: '', amount: 0, label: '' });

  const [step, setStep] = useState<'form' | 'checkout'>('form');

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4f46e5',
        fontFamily: '"Inter", system-ui, sans-serif',
        borderRadius: '6px',
      },
      rules: {
        'Input--selected': {
          borderColor: '#E0E6EB',
          boxShadow:
            '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen px-4 py-10">
      {step === 'form' ? (
        <DonationSelector
          onClientSecret={secret => {
            setClientSecret(secret);
            setStep('checkout');
          }}
          onSummary={setSummary}
        />
      ) : clientSecret ? (
        <div className="mx-auto max-w-xl space-y-6">
          <button
            onClick={() => setStep('form')}
            className="text-sm text-indigo-600 hover:underline"
          >
            ← Go back and edit information
          </button>

          <Elements stripe={stripePromise} options={options}>
            {summary && (
              <div className="rounded-md border border-indigo-200 bg-indigo-50 p-4 text-sm">
                <p className="text-gray-900">
                  <strong className="text-gray-900">Donor:</strong> {summary.name}
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">Email:</strong> {summary.email}
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">Phone:</strong> {summary.phone}
                </p>
                <p className="text-gray-900">
                  <strong className="text-gray-900">Amount:</strong> ${summary.amount} –{' '}
                  {summary.label}
                </p>
              </div>
            )}
            <DonationCheckout name={summary.name} email={summary.email} phone={summary.phone} />
          </Elements>
        </div>
      ) : null}
    </div>
  );
}
