'use client';

import React, { useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/common';

import { BookingForm, BookingFormData } from './components/BookingForm';
import { PaymentCheckout } from './components/PaymentCheckout';
import { SummaryCard } from './components/SummaryCard'; // <-- 1. Importer le nouveau composant
import { useParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type BookingStep = 'form' | 'payment' | 'confirmation';

export default function BookTablePage() {
  const [step, setStep] = useState<BookingStep>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const params = useParams<{ slug: string }>();

  // 2. Mettre à jour l'état pour inclure toutes les infos nécessaires
  const [reservationDetails, setReservationDetails] = useState<{
    reservationId: string;
    hostInfo: BookingFormData['hostInfo'];
    totalAmount: number;
    totalSeats: number;
    currency: 'eur' | 'usd';
    paymentOption: 'full' | 'partial';
  } | null>(null);

  const handleFormSubmit = async (dataForDb: any) => {
    console.log('Submitting form data to API:', { ...dataForDb, eventSlug: params?.slug });

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dataForDb, // On envoie bien les données formatées pour la BDD
          eventSlug: params?.slug,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create reservation.');
      }

      // On récupère les données critiques de l'API
      const { clientSecret, reservationId, amount, currency } = await res.json();

      // On utilise les données du formulaire (que l'on possède déjà)
      // et les données de l'API pour construire le récapitulatif.
      setClientSecret(clientSecret);

      setReservationDetails({
        reservationId,
        currency,
        hostInfo: dataForDb.hostInfo,
        totalAmount: amount * 100,
        totalSeats: dataForDb.totalSeats,
        paymentOption: dataForDb.paymentOption,
      });

      // On passe à l'étape de paiement
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
        {step === 'form' && (
          <>
            <h1 className="text-center text-3xl font-bold text-indigo-600">Book Your Table</h1>
            <p className="mt-2 text-center text-gray-600">
              Join us for a night of purpose and celebration.
            </p>
            <div className="mt-8">
              <BookingForm onFormSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </>
        )}

        {step === 'payment' && clientSecret && reservationDetails && (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <h1 className="text-center text-3xl font-bold text-indigo-600">Confirm Your Booking</h1>
            <div className="mt-8 space-y-6">
              {/* 3. Intégrer la SummaryCard avec les bonnes props */}
              <SummaryCard
                hostInfo={reservationDetails.hostInfo}
                totalAmount={reservationDetails.totalAmount}
                totalSeats={reservationDetails.totalSeats}
                paymentOption={reservationDetails.paymentOption}
                currency={reservationDetails.currency}
                onEdit={() => setStep('form')} // Permet de revenir en arrière
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
