'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { APP_ROUTES, retrieveDonorInfo, retrieveDonorBidInfo, DonorInfo } from '@/common';
import Image from 'next/image';
import Link from 'next/link';

type PaymentStatus = 'loading' | 'succeeded' | 'processing' | 'requires_payment_method' | 'error';

function ReturnClient() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams?.get('payment_intent_client_secret');
  const mode = searchParams?.get('mode'); // 'bid'
  const lotId = searchParams?.get('lot_id'); // used for auction summary

  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [donorInfo, setDonorInfo] = useState<DonorInfo | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    if (mode === 'bid' && lotId) {
      const bid = retrieveDonorBidInfo(Number(lotId));
      if (bid) {
        setDonorInfo(bid);
        setAmount(bid.amount);
      }
      setStatus('succeeded');
      return;
    }

    const info = retrieveDonorInfo();
    if (info) {
      setDonorInfo(info);
    }

    const storedAmount = sessionStorage.getItem('donation_amount');
    if (storedAmount) {
      setAmount(Number(storedAmount));
    }

    if (!clientSecret) {
      setStatus('error');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const stripe = await import('@stripe/stripe-js').then(m =>
          m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        );
        if (!stripe) {
          setStatus('error');
          return;
        }

        const result = await stripe.retrievePaymentIntent(clientSecret);
        const pi = result.paymentIntent;

        if (!pi) {
          setStatus('error');
          return;
        }

        if (pi.status === 'succeeded') {
          setStatus('succeeded');
          setEmail(pi.receipt_email ?? null);
        } else {
          setStatus(pi.status as PaymentStatus);
        }
      } catch (err) {
        console.error('Error fetching payment intent:', err);
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [clientSecret, mode, lotId]);

  const renderContent = () => {
    const summaryBlock = donorInfo && (
      <div className="mt-4 space-y-1 text-center text-sm text-gray-800">
        <p>
          <strong>Name:</strong> {donorInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {donorInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {donorInfo.phone}
        </p>
        {amount && (
          <p>
            <strong>Amount:</strong> ${amount.toFixed(2)}
          </p>
        )}
      </div>
    );

    if (mode === 'bid') {
      return {
        icon: <CheckCircleIcon className="mx-auto h-12 w-12 stroke-indigo-600" />,
        title: 'Bid submitted!',
        message: 'Thank you for your bid. We’ll contact you if you’re the winning participant.',
        note: 'No payment has been processed yet.',
        action: {
          label: 'Back to lots',
          href: APP_ROUTES.home.path + '#auction-section',
        },
        summary: summaryBlock,
      };
    }

    switch (status) {
      case 'loading':
        return {
          icon: <ClockIcon className="mx-auto h-12 w-12 stroke-gray-400" />,
          title: 'Checking payment status...',
          message: 'Please wait while we verify your transaction.',
        };
      case 'succeeded':
        return {
          icon: <CheckCircleIcon className="mx-auto h-12 w-12 stroke-green-600" />,
          title: 'Thank you for your donation!',
          message: email
            ? `A receipt has been sent to ${email}.`
            : 'Your donation has been confirmed.',
          note: 'Your support makes a real difference ❤️',
          action: {
            label: 'Make another donation',
            href: APP_ROUTES.donate.path,
          },
          summary: summaryBlock,
        };
      case 'processing':
        return {
          icon: <ClockIcon className="mx-auto h-12 w-12 stroke-yellow-500" />,
          title: 'Payment is processing',
          message: 'You’ll receive a confirmation email shortly.',
        };
      case 'requires_payment_method':
        return {
          icon: <XCircleIcon className="mx-auto h-12 w-12 stroke-red-600" />,
          title: 'Payment failed',
          message: 'Please try again using a different payment method.',
          action: {
            label: 'Return to donation page',
            href: APP_ROUTES.donate.path,
          },
        };
      case 'error':
      default:
        return {
          icon: <XCircleIcon className="mx-auto h-12 w-12 stroke-red-600" />,
          title: 'Unexpected error',
          message: 'Something went wrong. Please contact support if the issue persists.',
          action: {
            label: 'Back to donation page',
            href: APP_ROUTES.donate.path,
          },
        };
    }
  };

  const content = renderContent();

  return (
    <div className="mx-auto mt-16 max-w-md rounded-lg p-6">
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

      {content.icon}
      <h1 className="mt-4 text-center text-2xl font-semibold text-gray-900">{content.title}</h1>
      <p className="mt-2 text-center text-sm text-gray-600">{content.message}</p>
      {content.summary}
      {content.note && (
        <p className="mt-2 text-center text-sm font-medium text-indigo-600">{content.note}</p>
      )}
      {content.action && (
        <div className="mt-6 text-center">
          <a
            href={content.action.href}
            className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {content.action.label}
          </a>
        </div>
      )}
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="mt-16 text-center">Loading confirmation...</div>}>
      <ReturnClient />
    </Suspense>
  );
}
