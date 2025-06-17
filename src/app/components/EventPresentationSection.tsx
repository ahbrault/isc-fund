'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Section } from '@/components';
import { APP_ROUTES } from '@/common';

const EventBanner = () => {
  // const event: Prisma.Event = fetch('/api/events/next');
  return (
    <div className="my-8 grid items-center justify-center gap-4 rounded-lg bg-white/30 p-4 sm:grid-cols-2 sm:gap-8">
      <div className="order-2 sm:order-1">
        <h2 className="text-left">An Unforgettable Night of Hope and Elegance</h2>
        <h3 className="font-bold">Tuesday, July 15th, 2025 at Nikki Beach Saint-Tropez</h3>
        <p className="mt-4">
          Step into a world of chic sophistication and radiant glamour, where breathtaking decor
          meets the energy of an extraordinary cause.
        </p>
        <p className="mt-4">
          With Cathy’s unique charisma and creative spirit, this first Gala will transcend
          expectations to become a truly magical and unforgettable experience.
        </p>
        <p className="mt-4 font-semibold">Good vibes, Emotions, and Great People</p>
        <p className="mt-4 font-semibold">Exclusive auction – One-of-a-kind experiences & items</p>
        <p className="mt-4 font-semibold">Your participation can save a child’s life.</p>
        <p className="mt-8 font-bold">DONATION PACKAGES:</p>
        <ul className="list-inside list-disc">
          <li>Individual seat – €1,000</li>
          <li>Table of 10 – €10,000</li>
        </ul>
        <Button className="mt-8" href={APP_ROUTES.eventBookTable.build('nikki-beach-july-25')}>
          Book my seat
        </Button>
      </div>
      <Image
        src="/images/events/nikki-beach.jpg"
        height="500"
        width="300"
        className="max-h-xl order-1 mx-auto mb-8 w-auto sm:order-2"
        alt="Cathy Guetta for Sickle Cell Disease"
      />
    </div>
  );
};

export default function EventPresentationSection() {
  return (
    <Section className="py-16" id="event-presentation">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
        <div className="order-2 flex flex-col items-center justify-center space-y-4 md:order-1">
          <h2 className="mb-0 text-left">
            Cathy Guetta Named Ambassador for Sickle Cell Disease <br /> A New Light in the Fight
            for Life!
          </h2>
          <p>
            <b>Cathy Guetta</b>, the iconic Queen of the Night and successful entrepreneur, is now
            channeling her boundless energy into a cause that urgently needs more visibility and
            funding: <b>sickle cell disease</b>.
          </p>
          <p>
            Recently named <b>Ambassador for Sickle Cell Disease</b> by the{' '}
            <b>International Sickle Cell Fund (ISCF)</b>, Cathy is bringing her trademark passion
            and drive to this global fight. Born in Dakar and raised in France, she’s not just
            lighting up her powerful network—she’s igniting hope.
          </p>
          <p>
            Cathy is launching a series of high-impact fundraising events in support of both{' '}
            <b>ISCF</b>
            and the NGO <b>Drep.Africa</b>, with a bold mission: to help save thousands of children
            suffering from severe forms of this disease.
          </p>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src="/images/cathy-guetta.jpg"
            width={500}
            height={200}
            className="mx-auto h-auto max-h-96 w-full object-contain"
            alt="Cathy Guetta"
          />
        </div>
      </div>
      <div className="mt-24 flex items-center justify-center gap-4">
        <Image
          src="/images/cathyguetta-logo-ambassador.png"
          width={500}
          height={200}
          className="mx-auto h-auto w-auto max-w-72"
          alt="Cathy Guetta"
        />
      </div>
      <EventBanner />
    </Section>
  );
}
