'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Section } from '@/components';
import { APP_ROUTES } from '@/common';

const EventBanner = () => {
  // const event: Prisma.Event = fetch('/api/events/next');
  return (
    <div className="my-8 grid items-center justify-center gap-4 rounded-lg bg-white/30 p-4 sm:grid-cols-2 sm:gap-8">
      <div className="order-2 sm:order-1">
        <h2 className="text-left">An Unforgettable Night of Hope and Elegance</h2>
        <h3 className="font-bold">Thursday, July 16th, 2026 at Nikki Beach Saint-Tropez</h3>
        <p className="mt-4">
          Step into a world of chic sophistication and radiant glamour, where breathtaking decor
          meets the energy of an extraordinary cause.
        </p>
        <p className="mt-4">
          With Cathy’s unique charisma and creative spirit, this Gala will transcend expectations to
          become a truly magical and unforgettable experience.
        </p>
        <p className="mt-4 font-semibold">Good vibes, Emotions, and Great People</p>
        <p className="mt-4 font-semibold">Exclusive auction – One-of-a-kind experiences & items</p>
        <p className="mt-4 font-semibold">Your participation can save a child’s life.</p>
        <p className="mt-8 font-bold">DONATION PACKAGES:</p>
        <ul className="list-inside list-disc">
          <li>Individual VIP Seat – €600</li>
          <li>VIP Table – €5,000 (8 guests)</li>
        </ul>
        <Button className="mt-8" href={APP_ROUTES.donate.path}>
          Reserve now
        </Button>
      </div>
      <Link
        href={APP_ROUTES.donate.path}
        aria-label="Reserve your seat for the Gala"
        className="max-h-xl order-1 mx-auto mb-8 w-auto sm:order-2"
      >
        <Image
          src="/images/events/cathy-guetta-gala-sickle-cell-july-16-2026.webp"
          height="500"
          width="300"
          className="h-auto w-auto"
          alt="Cathy Guetta for Sickle Cell Gala invitation - July 16, 2026 at Nikki Beach Saint-Tropez"
        />
      </Link>
    </div>
  );
};

export default function EventPresentationSection() {
  return (
    <Section className="py-16" id="event-presentation">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
        <div className="order-2 flex flex-col items-center justify-center space-y-4 md:order-1">
          <h2 className="mb-0 text-left">Cathy Guetta, Global Ambassador for Sickle Cell Disease</h2>
          <p>
            Some encounters change a cause. When Emmanuel Jayr, Robert Hue, and Professor
            Jean-Benoît Arlet asked <b>Cathy Guetta</b> to join the International Sickle Cell Fund,
            they were hoping for support for their fight. What they found was an extraordinary
            champion.
          </p>
          <p>
            Cathy Guetta never does anything by halves. The entrepreneur who reinvented nightlife,
            the creator who turns every idea into an event, the tireless producer, the devoted
            mother: she has poured that same energy, talent, and immense heart into the cause of
            sick children in Africa. Sickle cell disease, the world’s most common genetic disease,
            remains one of the most overlooked. Cathy chose to become its voice, to give it a face,
            a light, a global reach.
          </p>
          <p>
            The second edition of the Cathy Guetta for Sickle Cell gala, on <b>July 16th</b> at{' '}
            <b>Nikki Beach Saint-Tropez</b>, will bring together more than 200 prestigious guests.
            Cathy has spent months preparing this charity dinner down to the smallest detail—both
            to raise the funds needed to save the lives of thousands of children with sickle cell
            disease, and, in making this a must-attend event on the Saint-Tropez peninsula, to send
            a message of hope, energy, and ambition, carried by her enthusiasm, generosity, and
            deep sincerity.
          </p>
          <p>
            Cathy has made this fight her mission. As Global Ambassador, as a woman, as a mother:
            so that sickle cell disease is no longer overlooked, and so that millions of patients
            can access treatment. Because we cannot let a thousand children die every day from a
            disease that can be treated. What Cathy Guetta is achieving is remarkable. On behalf of
            the International Sickle Cell Fund and the NGO Drep Africa, we want to express our
            deepest gratitude to her.
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
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="relative mb-6 text-left text-xl font-bold text-secondary">
            1st Edition Impact
            <span className="absolute bottom-0 left-0 h-1 w-16 bg-primary"></span>
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-primary/20 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-3xl font-bold text-primary">€250,000</p>
            <p className="mt-2 text-sm text-gray-700">Raised during the gala</p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-3xl font-bold text-primary">95%</p>
            <p className="mt-2 text-sm text-gray-700">Funds allocated to Drep.Afrique</p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-3xl font-bold text-primary">1,000</p>
            <p className="mt-2 text-sm text-gray-700">
              Children in Senegal receiving 3 years of free treatment
            </p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-3xl font-bold text-primary">300</p>
            <p className="mt-2 text-sm text-gray-700">
              African doctors trained via medical conference
            </p>
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-secondary bg-secondary/5 p-4">
          <p className="mb-2 font-semibold text-secondary">
            Official launch of <b>DREPAF</b>
          </p>
          <p className="text-sm text-gray-700">First sickle cell treatment produced in Africa</p>
        </div>

        <div className="rounded-lg border-l-4 border-secondary bg-secondary/10 p-4">
          <p className="font-semibold text-secondary">2026 Goal</p>
          <p className="mt-1 text-sm text-gray-700">
            Raise €300,000 to expand DREPAF access to Niger, Cameroon, Côte d&apos;Ivoire, DRC, and
            Guinea.
          </p>
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
