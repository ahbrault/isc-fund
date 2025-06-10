'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/common';

import { BookingForm, BookingFormData } from './components/BookingForm';
import { PaymentCheckout } from './components/PaymentCheckout';
import { SummaryCard } from './components/SummaryCard';
import { useParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type BookingStep = 'form' | 'payment' | 'confirmation';

export default function BookTablePage() {
  const [step, setStep] = useState<BookingStep>('form');
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string>('');
  const params = useParams<{ slug: string }>();

  const [reservationDetails, setReservationDetails] = useState<{
    reservationId: string;
    hostInfo: BookingFormData['hostInfo'];
    totalAmount: number;
    totalSeats: number;
    currency: 'eur' | 'usd';
    paymentOption: 'full' | 'partial';
  } | null>(null);

  const [availability, setAvailability] = useState<{
    availableSeats: number;
    totalSeats: number;
  } | null>(null);

  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/events/${params?.slug}/availability`);
        if (!res.ok) {
          throw new Error('Could not fetch seat availability.');
        }
        const data = await res.json();
        setAvailability(data);
      } catch (error) {
        console.error(error);
        setAvailabilityError('Unable to load seat information.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params?.slug) {
      fetchAvailability();
    }
  }, [params?.slug]);

  const handleFormSubmit = async (dataForDb: any) => {
    console.log('Submitting form data to API:', { ...dataForDb, eventSlug: params?.slug });

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dataForDb,
          eventSlug: params?.slug,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create reservation.');
      }

      const { clientSecret, reservationId, amount, currency } = await res.json();

      setClientSecret(clientSecret);
      setReservationDetails({
        reservationId,
        currency,
        hostInfo: dataForDb.hostInfo,
        totalAmount: amount * 100,
        totalSeats: dataForDb.totalSeats,
        paymentOption: dataForDb.paymentOption,
      });

      setStep('payment');
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe', labels: 'floating' },
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <Link href={APP_ROUTES.home.path}>
        <Image
          height={100}
          width={240}
          src="/logo-icon-indigo.svg"
          alt="ISC Fund"
          className="mx-auto mb-8 h-12"
          priority
        />
      </Link>

      <div className="mx-auto max-w-xl">
        <div className="mx-auto max-w-xl">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <div className="size-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
            </div>
          )}
          {step === 'form' && !isLoading && (
            <>
              <h1 className="text-center text-3xl font-bold text-indigo-600">Book Your Table</h1>
              {availability && (
                <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                  Seats left: {availability.availableSeats} / {availability.totalSeats}
                </p>
              )}
              {availabilityError && (
                <p className="mt-4 text-center text-red-600">{availabilityError}</p>
              )}

              <div className="mt-8">
                <BookingForm
                  onFormSubmit={handleFormSubmit}
                  isLoading={isLoading || availability?.availableSeats === 0}
                />
                {availability?.availableSeats === 0 && (
                  <p className="mt-4 text-center font-bold text-red-700">This event is sold out.</p>
                )}
              </div>
            </>
          )}
        </div>

        {step === 'payment' && clientSecret && reservationDetails && (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <h1 className="text-center text-3xl font-bold text-indigo-600">Confirm Your Booking</h1>
            <div className="mt-8 space-y-6">
              <SummaryCard
                hostInfo={reservationDetails.hostInfo}
                totalAmount={reservationDetails.totalAmount}
                totalSeats={reservationDetails.totalSeats}
                paymentOption={reservationDetails.paymentOption}
                currency={reservationDetails.currency}
                onEdit={() => setStep('form')}
              />
              <PaymentCheckout
                billingDetails={reservationDetails.hostInfo}
                onSuccessfulPayment={() => setStep('confirmation')}
              />
            </div>
          </Elements>
        )}

        {step === 'confirmation' && reservationDetails && (
          <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-center shadow-md">
            <h1 className="text-2xl font-bold text-green-800">Thank You!</h1>
            <p className="mt-2 text-green-700">
              Your payment was successful and your booking is confirmed.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              A confirmation email and receipt have been sent to{' '}
              <strong>{reservationDetails.hostInfo.email}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
