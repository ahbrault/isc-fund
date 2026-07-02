import React from 'react';
import Image from 'next/image';
import { Button, Section } from '@/components';
import { APP_ROUTES } from '@/common';

export default function AuctionCtaSection() {
  return (
    <Section className="py-16" id="auction">
      <div className="mx-auto max-w-3xl text-center">
        <Image
          src="/images/cathyguetta-logo-ambassador.png"
          width={500}
          height={200}
          className="mx-auto mb-8 h-auto w-auto max-w-72 object-contain"
          alt="Cathy Guetta"
        />
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          The Cathy For Sickle Cell Gala Is Back
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
          July 16, 2026, Nikki Beach Saint-Tropez. Exceptional auction lots donated by our
          partners. Bid now.
        </p>
        <Button href={APP_ROUTES.auction.build()} className="font-bold">
          Browse the Catalogue
        </Button>
      </div>
    </Section>
  );
}
