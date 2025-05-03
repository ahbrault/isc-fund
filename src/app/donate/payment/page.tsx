'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { DonationCheckout, DonationSelector, SummaryCard } from './components';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { clearDonorInfo, DonorSummary } from '@/common';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Page() {
  const [clientSecret, setClientSecret] = useState('');
  const [summary, setSummary] = useState<DonorSummary>({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    label: '',
  });

  const [step, setStep] = useState<'form' | 'checkout'>('form');

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4f46e5',
        fontFamily: '"Cabin", "Inter", system-ui, sans-serif',
        borderRadius: '6px',
      },
      rules: {
        '.Input--selected': {
          borderColor: '#e5e7eb',
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
          defaultValues={{
            name: summary.name,
            email: summary.email,
            phone: summary.phone,
            customAmount:
              summary.amount && !['$60', '$600', '$6000'].includes(summary.label)
                ? summary.amount
                : undefined,
          }}
        />
      ) : clientSecret ? (
        <div className="mx-auto max-w-xl space-y-6">
          <Elements stripe={stripePromise} options={options}>
            {summary && (
              <SummaryCard
                {...summary}
                action={() => {
                  clearDonorInfo();
                  setStep('form');
                }}
              />
            )}
            <DonationCheckout name={summary.name} email={summary.email} phone={summary.phone} />
          </Elements>
        </div>
      ) : null}
    </div>
  );
}
