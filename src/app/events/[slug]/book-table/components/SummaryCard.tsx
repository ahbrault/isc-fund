'use client';

import React from 'react';
import { UserIcon, EnvelopeIcon, TicketIcon } from '@heroicons/react/24/outline';
import { BookingFormData } from './BookingForm';

interface SummaryCardProps {
  hostInfo: BookingFormData['hostInfo'];
  totalAmount: number;
  totalSeats: number;
  currency: 'eur' | 'usd';
  paymentOption: 'full' | 'partial';
  onEdit: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  hostInfo,
  totalAmount,
  totalSeats,
  paymentOption,
  currency,
  onEdit,
}) => {
  // Currency formatter for a clean display
  const formattedAmount = new Intl.NumberFormat(currency === 'eur' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(totalAmount / 100); // Stripe works in cents

  // Creates a clear description of what is being paid for
  const paymentDescription =
    paymentOption === 'full'
      ? `Full table payment for ${totalSeats} seats`
      : `Your share (1 of ${totalSeats} seats)`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="mb-0 text-lg font-semibold text-gray-900">Booking Summary</h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
        >
          Change
        </button>
      </div>

      <div className="space-y-4 p-6">
        {/* Host Information */}
        <div className="flex items-center">
          <UserIcon className="mr-4 h-5 w-5 flex-shrink-0 stroke-indigo-600" />
          <div>
            <p className="mb-0 text-sm text-gray-500">Name</p>
            <p className="mb-0 font-medium text-gray-900">{hostInfo.name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <EnvelopeIcon className="mr-4 h-5 w-5 flex-shrink-0 stroke-indigo-600" />
          <div>
            <p className="mb-0 text-sm text-gray-500">Email</p>
            <p className="mb-0 font-medium text-gray-900">{hostInfo.email}</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="flex items-center">
          <TicketIcon className="mr-4 h-5 w-5 flex-shrink-0 stroke-indigo-600" />
          <div>
            <p className="mb-0 text-sm text-gray-500">Your Payment</p>
            <p className="mb-0 font-medium text-gray-900">{paymentDescription}</p>
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div className="rounded-b-lg border-t border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <p className="mb-0 text-base font-semibold text-gray-900">Amount to Pay</p>
          <p className="text-xl font-bold text-indigo-600">{formattedAmount}</p>
        </div>
      </div>
    </div>
  );
};
