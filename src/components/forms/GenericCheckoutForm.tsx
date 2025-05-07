'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DonorInfo,
  DonorSummary,
  retrieveDonorInfo,
  saveDonorInfo,
  clearDonorInfo,
} from '@/common';
import SummaryCard from './SummaryCard';

type Props = {
  onClientSecret: Dispatch<SetStateAction<string>>;
  onSummary: Dispatch<SetStateAction<DonorSummary>>;
  mode: 'donation' | 'lottery' | 'auction';
  defaultValues?: Partial<DonorInfo>;
  fixedAmount?: number;
  label?: string;
  metadata?: Record<string, any>;
};

type FormValues = DonorInfo & {
  customAmount?: number;
};

export default function GenericCheckoutForm({
  onClientSecret,
  onSummary,
  mode,
  fixedAmount,
  label,
  metadata = {},
  defaultValues,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [donorInfo, setDonorInfo] = useState<Omit<FormValues, 'customAmount'> | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const watchCustomAmount = watch('customAmount');

  const onSubmit = async (data: FormValues) => {
    const amount =
      mode === 'donation'
        ? (fixedAmount ?? parseFloat(String(watchCustomAmount)))
        : (fixedAmount ?? parseFloat(String(data.customAmount)));

    if (!amount || isNaN(amount) || amount < 1) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setMessage('');
    const infos = {
      name: donorInfo?.name || data.name,
      email: donorInfo?.email || data.email,
      phone: donorInfo?.phone || data.phone,
    };

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email: infos.email,
          description: label ?? 'Donation',
          metadata: {
            ...metadata,
            full_name: infos.name,
            phone: infos.phone,
            email: infos.email,
          },
        }),
      });

      const json = await res.json();

      if (!json.clientSecret) {
        throw new Error('Missing client secret');
      }

      onClientSecret(json.clientSecret);
      onSummary({
        ...infos,
        amount,
        label: label ?? '',
      });

      saveDonorInfo(infos);
    } catch (err: any) {
      setMessage(err.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDonorInfo(retrieveDonorInfo());
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 w-full max-w-xl space-y-6">
      <h2 className="text-center text-2xl font-semibold text-indigo-600">
        {mode === 'donation'
          ? 'Make a donation'
          : mode === 'lottery'
            ? 'Enter the raffle'
            : 'Place your bid'}
      </h2>

      {/* Fields */}
      <div className="grid gap-4 rounded-md border border-gray-200 p-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">Full Name</span>
          <input
            type="text"
            placeholder="Jane Doe"
            {...register('name', { required: true })}
            className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">Please enter a valid name.</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">Please enter a valid email.</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Phone</span>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            {...register('phone', { required: true })}
            className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">Please enter a valid phone number.</p>
          )}
        </label>

        {/* Amount */}
        {mode === 'donation' || mode === 'auction' ? (
          <label className="block">
            <span className="text-sm font-medium text-gray-800">
              {mode === 'auction' ? 'Bid Amount (USD)' : 'Donation Amount (USD)'}
            </span>
            <input
              type="number"
              step="any"
              min={1}
              {...register('customAmount', { required: true, min: 1 })}
              placeholder="Enter amount"
              className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
            {errors.customAmount && (
              <p className="mt-1 text-sm text-red-600">Please enter a valid amount.</p>
            )}
          </label>
        ) : (
          <div className="rounded bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
            Ticket Price: ${fixedAmount}
          </div>
        )}
      </div>

      {/* Résumé si infos déjà en mémoire */}
      {donorInfo && (
        <SummaryCard
          {...donorInfo}
          amount={fixedAmount}
          action={() => {
            clearDonorInfo();
            setDonorInfo(null);
          }}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
      >
        {loading ? 'Processing…' : 'Continue to payment'}
      </button>

      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  ) : null;
}
