'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import LotCheckout from './LotCheckout';
import { getStripeOptions, Lot } from '@/common';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function LotForm({ lot }: { lot: Lot }) {
  const [clientSecret, setClientSecret] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    amount: lot.type === 'lottery' ? lot.ticketPrice! : 0,
  });

  const [step, setStep] = useState<'form' | 'checkout'>('form');

  const handleSubmit = async (formData: typeof userInfo) => {
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: formData.amount,
        email: formData.email,
        description: lot.title,
        metadata: {
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          lot_id: lot.id,
          lot_title: lot.title,
          is_lottery: lot.type === 'lottery',
          bid_amount: lot.type === 'auction' ? formData.amount : undefined,
          ticket_price: lot.type === 'lottery' ? lot.ticketPrice : undefined,
        },
      }),
    });

    const data = await res.json();
    if (data.clientSecret) {
      setUserInfo(formData);
      setClientSecret(data.clientSecret);
      setStep('checkout');
    }
  };

  const options = getStripeOptions(clientSecret);

  return step === 'form' ? (
    <form
      className="grid gap-4 rounded-md border border-gray-200 p-6"
      onSubmit={e => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
        const amount =
          lot.type === 'auction'
            ? parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value)
            : lot.ticketPrice!;

        if (!name || !email || !phone || isNaN(amount)) return;

        handleSubmit({ name, email, phone, amount });
      }}
    >
      <input name="name" type="text" placeholder="Full Name" required className="input" />
      <input name="email" type="email" placeholder="Email" required className="input" />
      <input name="phone" type="tel" placeholder="Phone Number" required className="input" />
      {lot.type === 'auction' && (
        <input
          name="amount"
          type="number"
          min={1}
          step="any"
          placeholder="Your Bid (USD)"
          required
          className="input"
        />
      )}
      {lot.type === 'lottery' && (
        <div className="rounded bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
          Ticket Price: ${lot.ticketPrice}
        </div>
      )}
      <button
        type="submit"
        className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        {lot.type === 'auction' ? 'Submit Bid' : 'Buy Ticket'}
      </button>
    </form>
  ) : clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <LotCheckout name={userInfo.name} email={userInfo.email} phone={userInfo.phone} />
    </Elements>
  ) : null;
}
