'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { DonationCheckout, DonationSelector } from './components';
import { APP_ROUTES, clearDonorInfo, DonorSummary, getStripeOptions } from '@/common';
import Image from 'next/image';
import Link from 'next/link';
import { SummaryCard } from '@/components';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DonatePage() {
  const [clientSecret, setClientSecret] = useState('');
  const [summary, setSummary] = useState<DonorSummary>({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    label: '',
  });

  const [step, setStep] = useState<'form' | 'checkout'>('form');
  const options = getStripeOptions(clientSecret);

  return (
    <div className="min-h-screen px-4 py-10">
      <Link href={APP_ROUTES.home.path}>
        <Image
          height={100}
          width={240}
          src="/logo-icon-indigo.svg"
          alt="ISC Fund"
          className="mx-auto mb-4 h-12"
          priority
        />
      </Link>

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
              summary.amount && !['60€', '600€', '6000€'].includes(summary.label)
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
