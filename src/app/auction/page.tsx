import React from 'react';
import path from 'path';
import fs from 'fs/promises';
import type { Metadata } from 'next';
import type { Catalog } from '@/common';
import AuctionCatalogClient from './AuctionCatalogClient';

export const metadata: Metadata = {
  title: 'Auction Catalogue — ISC Fund',
  description: 'Browse the ISC Fund auction catalogue and place your bids.',
  alternates: { canonical: '/auction' },
};

async function getCatalog(): Promise<Catalog> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'catalog.json');
  const json = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(json) as Catalog;
}

export default async function AuctionCataloguePage() {
  const catalog = await getCatalog();

  return (
    <div className="flex w-full flex-col items-center gap-8 py-16 md:py-20">
      <h1 className="text-center text-3xl font-bold text-gray-900">Auction Catalogue</h1>
      {/* Full-bleed: the flipbook spans the viewport (minus small gutters) so
          the catalogue pages stay legible on mobile and desktop. */}
      <div className="w-full px-2 md:px-6">
        <AuctionCatalogClient catalog={catalog} />
      </div>
    </div>
  );
}
