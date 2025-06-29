'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components';
import { Lot } from '@/common';
import Link from 'next/link';

export default function AuctionCatalogSection() {
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    fetch('/data/lots.json')
      .then(res => res.json())
      .then(setLots)
      .catch(console.error);
  }, []);

  return (
    <Section className="py-16" id="auction">
      <div className="mb-16 flex items-center justify-center gap-4">
        <Image
          src="/images/cathyguetta-logo-ambassador.png"
          width={500}
          height={200}
          className="mx-auto h-auto w-auto max-w-72 object-fill"
          alt="Cathy Guetta"
        />
      </div>
      <h2 className="mb-8 text-center text-3xl font-bold">Auction & Lottery Catalog</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lots.map(lot => (
          <div
            key={lot.id}
            className="flex flex-col rounded-lg border border-gray-200 shadow-md transition hover:shadow-lg"
          >
            <Image
              src={lot.image}
              width={400}
              height={320}
              className="h-80 w-full rounded-t-lg object-cover"
              alt={lot.title}
            />
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <span
                  className={`mb-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    lot.type === 'auction'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {lot.type === 'auction'
                    ? lot.reserve
                      ? 'AUCTION – WITH RESERVE'
                      : 'AUCTION – NO RESERVE'
                    : `LOTTERY – ${lot.ticketPrice}€ TICKET`}
                </span>

                <h3 className="text-lg font-semibold text-gray-900">{lot.title}</h3>
                <p className="text-sm text-gray-600">{lot.shortDescription}</p>

                {lot.type === 'auction' && lot.reserve && lot.reservePrice ? (
                  <p className="text-sm font-semibold text-gray-900">
                    Starting Bid: ${lot.reservePrice.toLocaleString()}
                  </p>
                ) : lot.type === 'auction' && lot.reservePrice ? (
                  <p className="text-sm font-semibold text-gray-900">
                    Value: ${lot.reservePrice.toLocaleString()}
                  </p>
                ) : (
                  <></>
                )}
              </div>

              <Link
                href={`/auction/lot-${lot.id}`}
                className={`mt-4 w-full rounded-full px-4 py-2 text-center text-sm font-semibold text-white ${
                  lot.type === 'auction'
                    ? 'bg-secondary hover:bg-green-900'
                    : 'bg-primary hover:bg-amber-600'
                }`}
              >
                {lot.type === 'auction' ? 'BID NOW' : 'BUY A TICKET'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
