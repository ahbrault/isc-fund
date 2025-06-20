import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/common';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/common';
import { ManagementClient } from './components/ManagementClient'; // Import the new client component

export default async function ManageReservationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Fetch the reservation, including the full guest objects and the event details
  const reservation = await prisma.tableReservation.findUnique({
    where: { managementToken: token },
    include: {
      guests: { orderBy: { isHost: 'desc' } },
      event: true, // Fetch the full event object to get the date
    },
  });

  if (!reservation) {
    notFound();
  }

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
        <h1 className="text-center text-3xl font-bold text-indigo-600">
          Finalize Your Reservation
        </h1>
        <p className="mt-2 text-center text-gray-600">
          For {reservation.event.name} on{' '}
          {new Date(reservation.event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="mt-8">
          <ManagementClient reservation={reservation} />
        </div>
      </div>
    </div>
  );
}
