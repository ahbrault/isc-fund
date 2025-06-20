'use client';

import React, { useState } from 'react';
import { ManagementForm, ManagementFormData } from './ManagementForm';
import { countries } from './CountrySelect';

type ReservationData = {
  id: string;
  totalSeats: number;
  guests: {
    id: string;
    name: string;
    companyName: string | null;
    email: string | null;
    phone: string | null;
    address: any;
    isHost: boolean;
  }[];
};

export function ManagementClient({ reservation }: { reservation: ReservationData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const host = reservation.guests.find(g => g.isHost)!;
  const otherGuests = reservation.guests.filter(g => !g.isHost);

  // Prepare the defaultValues with the correct country object shape
  const formDefaultValues = {
    hostInfo: {
      name: host.name,
      email: host.email || '',
      companyName: host.companyName || '',
      phone: host.phone || '',
      address: {
        line1: host.address?.line1 || '',
        city: host.address?.city || '',
        postal_code: host.address?.postal_code || '',
        // Find the full country object that the Combobox component expects
        country: countries.find(c => c.value === host.address?.country) || null,
      },
    },
    guests: otherGuests.map(g => ({ id: g.id, name: g.name })),
  };

  const handleUpdate = async (formData: ManagementFormData) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const payload = {
        hostInfo: {
          ...formData.hostInfo,
          // Send only the 2-letter country code to the API
          address: {
            ...formData.hostInfo.address,
            country: formData.hostInfo.address.country?.value,
          },
        },
        guests: formData.guests,
      };

      const res = await fetch(`/api/reservations/${reservation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to update reservation.');
      }
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold text-green-800">Thank You!</h1>
        <p className="mt-2 text-green-700">
          Your reservation details have been updated successfully.
        </p>
        <p className="mt-4 text-sm text-gray-600">Your tax receipt will be sent to you shortly.</p>
      </div>
    );
  }

  return (
    <ManagementForm
      onSubmit={handleUpdate}
      isLoading={isLoading}
      defaultValues={formDefaultValues}
    />
  );
}
