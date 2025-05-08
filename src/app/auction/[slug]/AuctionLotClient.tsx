'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GenericCheckoutForm, SummaryCard } from '@/components';
import { DonorSummary, getStripeOptions, retrieveDonorBidInfo } from '@/common';
import { DonationCheckout } from '@/app/donate/components';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
  lot: {
    id: number;
    title: string;
    type: 'auction' | 'lottery';
    ticketPrice?: number;
  };
};

export default function AuctionLotClient({ lot }: Props) {
  const [clientSecret, setClientSecret] = useState('');
  const [summary, setSummary] = useState<DonorSummary>({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    label: '',
  });
  const [step, setStep] = useState<'form' | 'checkout'>('form');
  const [hasExistingBid, setHasExistingBid] = useState(false);

  const isLottery = lot.type === 'lottery';
  const isAuction = lot.type === 'auction';

  const options = getStripeOptions(clientSecret);

  useEffect(() => {
    if (isAuction) {
      const existing = retrieveDonorBidInfo(lot.id);
      if (existing) {
        setSummary(existing);
        setHasExistingBid(true);
      }
    }
  }, [lot.id, isAuction]);

  // For auction: render SummaryCard if bid exists, or the form
  if (isAuction && hasExistingBid) {
    return (
      <div className="mx-auto mt-8 w-full max-w-xl space-y-6">
        <SummaryCard
          {...summary}
          action={() => {
            // Allow editing: clear bid state
            setHasExistingBid(false);
          }}
        />
        <p className="text-center text-sm italic text-gray-500">
          You’ve already placed a bid on this lot.
        </p>
      </div>
    );
  }

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
