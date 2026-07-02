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
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-center">
          Cathy Guetta for Sickle Cell
          <br />
          Charity Gala Dinner
          <br />
          Saint-Tropez, July 16
          <br />
          Auctions Preview Catalog
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
          Exceptional auction lots donated by our partners. Browse the lots and bid now.
        </p>
        <Button href={APP_ROUTES.auction.build()} className="font-bold">
          Browse the Catalogue
        </Button>
      </div>
    </Section>
  );
}
