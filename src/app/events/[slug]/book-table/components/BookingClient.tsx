'use client';

import React, { useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Link from 'next/link';

import { BookingForm, BookingFormData } from './BookingForm';
import { PaymentCheckout } from './PaymentCheckout';
import { SummaryCard } from './SummaryCard';
import { Event, EventAvailability } from '@/common';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type BookingStep = 'form' | 'payment' | 'confirmation';

export function BookingClient({
  event,
  initialAvailability,
}: {
  event: Event;
  initialAvailability: EventAvailability;
}) {
  const [step, setStep] = useState<BookingStep>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  // The state now includes the managementToken
  const [reservationDetails, setReservationDetails] = useState<{
    reservationId: string;
    managementToken: string;
    hostInfo: BookingFormData['hostInfo']; // This will be the simplified hostInfo
    totalAmount: number;
    totalSeats: number;
    currency: 'eur' | 'usd';
    paymentOption: 'full' | 'partial';
  } | null>(null);

  // The handleFormSubmit now sends a simplified payload
  const handleFormSubmit = async (formData: BookingFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventSlug: event.slug }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create reservation.');
      }

      // The API now returns the managementToken
      const { clientSecret, reservationId, amount, currency, managementToken } = await res.json();

      setClientSecret(clientSecret);
      setReservationDetails({
        reservationId,
        managementToken, // Store the token
        currency,
        totalAmount: amount * 100,
        hostInfo: formData.hostInfo,
        totalSeats: formData.totalSeats,
        paymentOption: formData.paymentOption,
      });
      setStep('payment');
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe', labels: 'floating' },
  };

  return (
    <div className="mx-auto max-w-xl">
      {step === 'form' && (
        <>
          <h1 className="text-center text-3xl font-bold text-indigo-600">Book your table</h1>
          <p className="mt-4 text-center text-lg font-semibold text-gray-900">
            {new Intl.NumberFormat(event.currency === 'eur' ? 'fr-FR' : 'en-US', {
              style: 'currency',
              currency: event.currency.toUpperCase(),
            }).format(event.seatPrice)}{' '}
            donation per guest
          </p>
          <div className="mt-8">
            {/* We pass the availability prop to the form */}
            <BookingForm
              onFormSubmit={handleFormSubmit}
              isLoading={isLoading || initialAvailability.availableSeats === 0}
              availability={initialAvailability}
            />
            {initialAvailability.availableSeats === 0 && (
              <p className="mt-4 text-center font-bold text-red-700">This event is sold out.</p>
            )}
          </div>
        </>
      )}

      {step === 'payment' && clientSecret && reservationDetails && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <h1 className="text-center text-3xl font-bold text-indigo-600">Confirm Your Booking</h1>
          <div className="mt-8 space-y-6">
            {/* The SummaryCard will now display simplified info, which is fine */}
            <SummaryCard
              hostInfo={reservationDetails.hostInfo}
              totalAmount={reservationDetails.totalAmount}
              totalSeats={reservationDetails.totalSeats}
              paymentOption={reservationDetails.paymentOption}
              currency={reservationDetails.currency}
              onEdit={() => setStep('form')}
            />
            {/* PaymentCheckout no longer needs the full address, just name and email */}
            <PaymentCheckout
              billingDetails={{
                name: reservationDetails.hostInfo.name,
                email: reservationDetails.hostInfo.email,
              }}
              onSuccessfulPayment={() => setStep('confirmation')}
            />
          </div>
        </Elements>
      )}

      {/* The confirmation step is now a call to action */}
      {step === 'confirmation' && reservationDetails && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-green-800">
            Thank You! Your payment is confirmed.
          </h1>
          <p className="mt-2 text-gray-700">
            The next step is to finalize your reservation details to receive your official tax
            receipt.
          </p>
          <div className="mt-6">
            <Link
              href={`/reservations/${reservationDetails.managementToken}`}
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Finalize My Reservation &rarr;
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            A confirmation email has been sent to{' '}
            <strong>{reservationDetails.hostInfo.email}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
