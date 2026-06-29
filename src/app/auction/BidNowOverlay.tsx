'use client';

import React from 'react';
import Link from 'next/link';

type BidNowOverlayProps = {
  lotId: number;
};

export default function BidNowOverlay({ lotId }: BidNowOverlayProps) {
  return (
    <Link
      href={`/auction/lot-${lotId}`}
      className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--color-primary,#1a1a2e)] px-6 py-2 text-sm font-semibold text-[var(--color-secondary,#fff)] shadow-lg transition hover:opacity-90"
    >
      Bid Now
    </Link>
  );
}
