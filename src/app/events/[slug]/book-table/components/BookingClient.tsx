'use client'; // This directive is crucial and applies to this entire file.

import React, { useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

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

  const [reservationDetails, setReservationDetails] = useState<{
    reservationId: string;
    hostInfo: BookingFormData['hostInfo'];
    totalAmount: number;
    totalSeats: number;
    currency: 'eur' | 'usd';
    paymentOption: 'full' | 'partial';
  } | null>(null);

  const handleFormSubmit = async (formData: BookingFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hostInfo: {
            ...formData.hostInfo,
            address: {
              ...formData.hostInfo.address,
              country: formData.hostInfo.address.country?.name,
            },
          },
          eventSlug: event.slug,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create reservation.');
      }

      const { hostInfo, totalSeats, paymentOption } = formData;

      const { clientSecret, reservationId, amount, currency } = await res.json();
      setClientSecret(clientSecret);
      setReservationDetails({
        reservationId,
        currency,
        totalAmount: amount * 100,
        hostInfo,
        totalSeats,
        paymentOption,
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
              compactDisplay: 'short',
            }).format(event.seatPrice)}{' '}
            per guest
          </p>
          {/*<p className="mt-4 text-center text-lg font-semibold text-gray-900">*/}
          {/*  Seats left: {initialAvailability.availableSeats} / {initialAvailability.totalSeats}*/}
          {/*</p>*/}
          <div className="mt-8">
            <BookingForm
              onFormSubmit={handleFormSubmit}
              isLoading={isLoading || initialAvailability.availableSeats === 0}
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
  );
}
