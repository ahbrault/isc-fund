'use client';

import React, { forwardRef, useRef, useState } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import useIsMobile from '@/common/hooks/useIsMobile';
import type { Catalog, CatalogPage } from '@/common';
import BidNowOverlay from './BidNowOverlay';

type CatalogFlipbookProps = {
  catalog: Catalog;
};

type PageProps = {
  page: CatalogPage;
  eager: boolean;
};

const Page = forwardRef<HTMLDivElement, PageProps>(({ page, eager }, ref) => {
  return (
    <div ref={ref} className="relative h-full w-full bg-white">
      <Image
        src={page.image}
        alt={`Page ${page.pageIndex}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        priority={eager}
        loading={eager ? 'eager' : 'lazy'}
        className="object-contain"
      />
      {page.kind === 'lot' && typeof page.lotId === 'number' && (
        <BidNowOverlay lotId={page.lotId} />
      )}
    </div>
  );
});

Page.displayName = 'Page';

export default function CatalogFlipbook({ catalog }: CatalogFlipbookProps) {
  const isMobile = useIsMobile();
  const flipRef = useRef<{ pageFlip?: () => { flipNext: () => void; flipPrev: () => void } }>(null);
  // Until react-pageflip finishes initialising in a real browser, keep every
  // page in normal flow so the catalogue is fully accessible (SSR/no-JS and
  // unit/jsdom environments where the flip engine never measures a layout).
  // Once `onInit` fires, the flip engine owns page visibility (one spread).
  const [flipReady, setFlipReady] = useState(false);

  // null (pre-hydration) defaults to "single".
  const mode = isMobile === false ? 'double' : 'single';
  const single = mode === 'single';

  const handleNext = () => {
    try {
      flipRef.current?.pageFlip?.()?.flipNext();
    } catch {
      /* flip engine not ready (e.g. jsdom) */
    }
  };

  const handlePrev = () => {
    try {
      flipRef.current?.pageFlip?.()?.flipPrev();
    } catch {
      /* flip engine not ready (e.g. jsdom) */
    }
  };

  return (
    <div
      data-mode={mode}
      data-flip-ready={flipReady ? 'true' : 'false'}
      className="flex w-full flex-col items-center gap-4"
    >
      {/* Before the flip engine initialises, reveal every page (overrides
          page-flip's injected `.stf__item { display: none }`). */}
      <style>{`[data-flip-ready="false"] .stf__item{display:block !important;position:relative !important;}`}</style>
      {/* Full-bleed wrapper: react-pageflip's `size="stretch"` fits the book to
          this element's width, so the catalogue fills the viewport on mobile
          (single landscape page) and desktop (double-page spread). */}
      <div className="w-full">
        {/* @ts-expect-error react-pageflip's typings require every FlipSetting prop; we pass a subset. */}
        <HTMLFlipBook
          ref={flipRef}
          // A4 landscape page ratio (842 × 595 → ~1.415:1).
          width={1000}
          height={707}
          size="stretch"
          minWidth={315}
          maxWidth={2000}
          minHeight={223}
          maxHeight={1414}
          showCover
          usePortrait={single}
          mobileScrollSupport
          className="catalog-flipbook mx-auto w-full"
          style={{}}
          onInit={() => setFlipReady(true)}
        >
          {catalog.pages.map((page, index) => (
            <Page key={page.pageIndex} page={page} eager={index === 0} />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-full bg-[var(--color-primary,#1a1a2e)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary,#fff)] shadow transition hover:opacity-90"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-full bg-[var(--color-primary,#1a1a2e)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary,#fff)] shadow transition hover:opacity-90"
        >
          Next
        </button>
      </div>
    </div>
  );
}
