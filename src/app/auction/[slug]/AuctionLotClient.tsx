'use client';

import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GenericCheckoutForm from '@/components/forms/GenericCheckoutForm';
import SummaryCard from '@/components/forms/SummaryCard';
import { DonorSummary, getStripeOptions } from '@/common';
import { DonationCheckout } from '@/app/donate/components';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function AuctionLotClient({
  lot,
}: {
  lot: {
    id: number;
    title: string;
    type: 'auction' | 'lottery';
    ticketPrice?: number;
  };
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [summary, setSummary] = useState<DonorSummary>({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    label: '',
  });

  const [step, setStep] = useState<'form' | 'checkout'>('form');

  const isLottery = lot.type === 'lottery';

  const options = getStripeOptions(clientSecret);

  return step === 'form' ? (
    <GenericCheckoutForm
      mode={lot.type}
      fixedAmount={isLottery ? lot.ticketPrice : undefined}
      label={isLottery ? `Ticket – ${lot.title}` : `Bid – ${lot.title}`}
      metadata={{
        lot_id: lot.id,
        lot_title: lot.title,
        is_lottery: isLottery,
      }}
      onClientSecret={secret => {
        setClientSecret(secret);
        setStep('checkout');
      }}
      onSummary={setSummary}
    />
  ) : clientSecret ? (
    <div className="mx-auto mt-8 max-w-xl space-y-6">
      <Elements stripe={stripePromise} options={options}>
        {summary && (
          <SummaryCard
            {...summary}
            action={() => {
              setStep('form');
            }}
          />
        )}
        <DonationCheckout name={summary.name} email={summary.email} phone={summary.phone} />
      </Elements>
    </div>
  ) : null;
}
