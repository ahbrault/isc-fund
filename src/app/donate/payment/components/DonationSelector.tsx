'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { clearDonorInfo, retrieveDonorInfo, saveDonorInfo } from '@/common';
import SummaryDonorInfo from './SummaryDonorInfo';

const donationOptions = [
  { id: 'price_1RGfQ3LgzWiYznm9S4Lt5nh9', label: '$60 – Help 1 child', amount: 60 },
  { id: 'price_1RGfTqLgzWiYznm9pTmmVIFP', label: '$600 – Help 10 children', amount: 600 },
  { id: 'price_1RGfTuLgzWiYznm9Xlay7FL6', label: '$6000 – Help 100 children', amount: 6000 },
  { id: 'custom', label: 'Custom amount', amount: 0 },
];

interface FormValues {
  name: string;
  phone: string;
  email: string;
  customAmount?: number;
}

interface Props {
  onClientSecret: Dispatch<SetStateAction<string>>;
  onSummary: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      phone: string;
      amount: number;
      label: string;
    }>
  >;
  defaultValues?: Partial<FormValues>;
}

const donorFields = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Jane Doe',
    validation: { required: true },
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '(555) 123-4567',
    validation: { required: true },
  },
] as const;

export default function DonationSelector({ onClientSecret, onSummary, defaultValues }: Props) {
  const [selectedOption, setSelectedOption] = useState(donationOptions[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [donorInfo, setDonorInfo] = useState<Omit<FormValues, 'customAmount'> | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const watchCustomAmount = watch('customAmount');

  const onSubmit = async (data: FormValues) => {
    const amount =
      selectedOption.id === 'custom'
        ? parseFloat(String(watchCustomAmount))
        : selectedOption.amount;

    if (!amount || isNaN(amount) || amount < 1) {
      setMessage('Please enter a valid donation amount.');
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
          description: selectedOption.label,
          metadata: {
            name: infos.name,
            phone: infos.phone,
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
        label: selectedOption.label,
      });

      saveDonorInfo(infos.name, infos.email, infos.phone);
    } catch (err: any) {
      setMessage(err.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultValues?.customAmount) {
      setSelectedOption(donationOptions.find(d => d.id === 'custom') || donationOptions[0]);
    } else if (defaultValues) {
      const match = donationOptions.find(opt => opt.amount === defaultValues.customAmount);
      if (match) setSelectedOption(match);
    }
  }, [defaultValues]);

  useEffect(() => {
    setDonorInfo(retrieveDonorInfo());
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 w-full max-w-xl space-y-6">
      <h2 className="text-center text-2xl font-semibold text-indigo-600">Make a donation</h2>

      <div className="grid gap-4">
        {donationOptions.map(opt => (
          <label
            key={opt.id}
            className={`relative block cursor-pointer rounded-md border p-4 shadow-sm transition-all hover:shadow-md ${
              selectedOption.id === opt.id
                ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-400'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="donation"
              value={opt.id}
              className="sr-only"
              onChange={() => setSelectedOption(opt)}
              checked={selectedOption.id === opt.id}
            />
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">{opt.label}</span>
              {selectedOption.id === opt.id && (
                <svg
                  className="h-5 w-5 fill-indigo-600 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                </svg>
              )}
            </div>

            {opt.id === 'custom' && (
              <div className={`mt-4 ${selectedOption.id !== 'custom' ? 'hidden' : ''}`}>
                <label htmlFor="customAmount" className="block text-sm font-medium text-gray-900">
                  Enter custom amount
                </label>
                <div className="mt-1 flex items-center rounded-md bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                  <span className="shrink-0 text-sm text-gray-500">$</span>
                  <input
                    id="customAmount"
                    type="number"
                    step="any"
                    min="1"
                    placeholder="0.00"
                    {...register('customAmount', {
                      required: selectedOption.id === 'custom',
                      min: 1,
                    })}
                    className="block w-full grow border-0 bg-transparent py-1.5 pl-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  />
                  <span className="shrink-0 text-sm text-gray-500">USD</span>
                </div>
                {errors.customAmount && selectedOption.id === 'custom' && (
                  <p className="mt-1 text-sm text-red-600">Please enter a valid amount.</p>
                )}
              </div>
            )}
          </label>
        ))}
      </div>

      {donorInfo ? (
        <SummaryDonorInfo
          {...donorInfo}
          action={() => {
            clearDonorInfo();
            setDonorInfo(null);
          }}
        />
      ) : (
        <div className="grid gap-4 rounded-md border border-gray-200 p-4">
          {donorFields.map(({ id, label, type, placeholder, validation }) => (
            <label className="block" key={id}>
              <span className="text-sm font-medium text-gray-800">{label}</span>
              <input
                type={type}
                placeholder={placeholder}
                {...register(id as keyof FormValues, validation)}
                className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
              {errors?.[id as keyof FormValues] && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid {label.toLowerCase()}.
                </p>
              )}
            </label>
          ))}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
      >
        {loading ? 'Preparing…' : 'Continue to payment'}
      </button>

      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  ) : (
    <></>
  );
}
