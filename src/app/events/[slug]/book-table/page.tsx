import React from 'react';
import { notFound } from 'next/navigation';
import { EventAvailability, prisma } from '@/common';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES, Event } from '@/common';
import { BookingClient } from './components/BookingClient';

export default async function BookTablePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const event: Event | null = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) {
    notFound();
  }

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const reservedSeatsCount = await prisma.tableGuest.count({
    where: {
      reservation: { eventId: event.id },
      OR: [{ paymentStatus: 'PAID' }, { reservation: { createdAt: { gte: oneWeekAgo } } }],
    },
  });

  const initialAvailability: EventAvailability = {
    availableSeats: event.totalSeats - reservedSeatsCount,
    totalSeats: event.totalSeats,
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
      <BookingClient event={event} initialAvailability={initialAvailability} />
    </div>
  );
}
