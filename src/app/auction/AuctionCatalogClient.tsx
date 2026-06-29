'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { Catalog } from '@/common';

const Flip = dynamic(() => import('./CatalogFlipbook'), { ssr: false });

type AuctionCatalogClientProps = {
  catalog: Catalog;
};

export default function AuctionCatalogClient({ catalog }: AuctionCatalogClientProps) {
  return <Flip catalog={catalog} />;
}
