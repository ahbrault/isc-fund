import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fs from 'node:fs';
import path from 'node:path';
import type { Catalog } from '@/common';

/**
 * Phase 3 — RED tests for the catalogue flipbook viewer.
 *
 * These intentionally fail right now: `../CatalogFlipbook` does not exist yet.
 *
 * --- Contract restated for the implementer --------------------------------
 * `src/app/auction/CatalogFlipbook.tsx` ("use client"), props `{ catalog: Catalog }`.
 *  - Renders ONE image per `catalog.pages` entry. Each image's `src` MUST equal
 *    the page's `image`, and each image MUST have a non-empty, accessible `alt`
 *    (e.g. `Page N`) so it is reachable via `getByRole('img')`.
 *  - Calls `useIsMobile()`. The ROOT container MUST carry a `data-mode`
 *    attribute: `data-mode="double"` on desktop (useIsMobile === false) and
 *    `data-mode="single"` on mobile (useIsMobile === true).
 *  - Renders two controls: a "next" button (accessible name /next/i) and a
 *    "previous" button (accessible name /prev|previous/i), both <button>s,
 *    keyboard-operable and enabled.
 *  - For every page whose `kind === 'lot'`, renders a <BidNowOverlay lotId={page.lotId} />
 *    (a link /bid now/i -> /auction/lot-<lotId>). No BidNowOverlay for
 *    cover / chapter / rules pages.
 *
 * useIsMobile lives at `src/common/hooks/useIsMobile.ts` (default export,
 * `(breakpoint?: number) => boolean | null`). We mock the leaf module so that
 * importing it via the leaf, `@/common/hooks`, or the `@/common` barrel all
 * resolve to the mock — the implementer may import it from any of those paths.
 */

const { useIsMobileMock } = vi.hoisted(() => ({ useIsMobileMock: vi.fn() }));

vi.mock('@/common/hooks/useIsMobile', () => ({
  __esModule: true,
  default: useIsMobileMock,
}));

// Render next/image as a plain <img> so src/alt assertions are deterministic.
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const {
      src,
      alt,
      // strip next-specific props that are invalid on a bare <img>
      fill: _fill,
      priority: _priority,
      quality: _quality,
      placeholder: _placeholder,
      blurDataURL: _blur,
      loader: _loader,
      unoptimized: _unopt,
      sizes: _sizes,
      ...rest
    } = props;
    const resolvedSrc =
      typeof src === 'string'
        ? src
        : (src as { src?: string } | undefined)?.src ?? '';
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={resolvedSrc} alt={(alt as string) ?? ''} {...rest} />;
  },
}));

// Render next/link as a plain <a> so href + role=link assertions don't need a router.
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
  } & Record<string, unknown>) => {
    const resolvedHref =
      typeof href === 'string' ? href : href?.pathname ?? '';
    return (
      <a href={resolvedHref} {...rest}>
        {children}
      </a>
    );
  },
}));

import CatalogFlipbook from '../CatalogFlipbook';

// Small, isolated fixture: cover (p1), one lot page (p2, lotId 7), rules (p3).
const fixture: Catalog = {
  pages: [
    { pageIndex: 1, image: '/images/catalog/page-01.webp', kind: 'cover' },
    { pageIndex: 2, image: '/images/catalog/page-02.webp', kind: 'lot', lotId: 7 },
    { pageIndex: 3, image: '/images/catalog/page-03.webp', kind: 'rules' },
  ],
};

function readRealCatalog(): Catalog {
  const file = path.resolve(process.cwd(), 'public/data/catalog.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as Catalog;
}

beforeEach(() => {
  // Default to desktop unless a test overrides it.
  useIsMobileMock.mockReturnValue(false);
});

describe('CatalogFlipbook — rendering', () => {
  it('renders one accessible image per catalog page (inline fixture)', () => {
    render(<CatalogFlipbook catalog={fixture} />);
    expect(screen.getAllByRole('img')).toHaveLength(fixture.pages.length);
  });

  it('points each image at the page.image src', () => {
    const { container } = render(<CatalogFlipbook catalog={fixture} />);
    for (const page of fixture.pages) {
      expect(
        container.querySelector(`img[src="${page.image}"]`)
      ).toBeInTheDocument();
    }
  });

  it('renders 22 images for the real catalog.json', () => {
    const real = readRealCatalog();
    expect(real.pages).toHaveLength(22);
    const { container } = render(<CatalogFlipbook catalog={real} />);
    expect(screen.getAllByRole('img')).toHaveLength(22);
    // spot-check a couple of real page images
    expect(
      container.querySelector('img[src="/images/catalog/page-01.webp"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[src="/images/catalog/page-22.webp"]')
    ).toBeInTheDocument();
  });
});

describe('CatalogFlipbook — responsive mode (data-mode on root)', () => {
  it('uses data-mode="double" on desktop (useIsMobile === false)', () => {
    useIsMobileMock.mockReturnValue(false);
    const { container } = render(<CatalogFlipbook catalog={fixture} />);
    expect(container.querySelector('[data-mode="double"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-mode="single"]')
    ).not.toBeInTheDocument();
  });

  it('uses data-mode="single" on mobile (useIsMobile === true)', () => {
    useIsMobileMock.mockReturnValue(true);
    const { container } = render(<CatalogFlipbook catalog={fixture} />);
    expect(container.querySelector('[data-mode="single"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-mode="double"]')
    ).not.toBeInTheDocument();
  });
});

describe('CatalogFlipbook — navigation controls', () => {
  it('renders enabled next and previous buttons', () => {
    render(<CatalogFlipbook catalog={fixture} />);
    const next = screen.getByRole('button', { name: /next/i });
    const prev = screen.getByRole('button', { name: /prev|previous/i });
    expect(next).toBeEnabled();
    expect(prev).toBeEnabled();
  });

  it('exposes the next control to the keyboard (focusable button)', async () => {
    const user = userEvent.setup();
    render(<CatalogFlipbook catalog={fixture} />);
    const next = screen.getByRole('button', { name: /next/i });
    next.focus();
    expect(next).toHaveFocus();
    // Activating via keyboard must not throw.
    await user.keyboard('{Enter}');
  });
});

describe('CatalogFlipbook — BidNowOverlay placement', () => {
  it('renders a Bid Now link only for lot pages, with the correct href', () => {
    render(<CatalogFlipbook catalog={fixture} />);
    const bidLinks = screen.getAllByRole('link', { name: /bid now/i });
    // fixture has exactly one lot page (lotId 7)
    expect(bidLinks).toHaveLength(1);
    expect(bidLinks[0]).toHaveAttribute('href', '/auction/lot-7');
  });

  it('renders one Bid Now link per lot page in the real catalog (15 lots)', () => {
    const real = readRealCatalog();
    const lotPages = real.pages.filter((p) => p.kind === 'lot');
    expect(lotPages).toHaveLength(15);
    render(<CatalogFlipbook catalog={real} />);
    const bidLinks = screen.getAllByRole('link', { name: /bid now/i });
    expect(bidLinks).toHaveLength(lotPages.length);
    // pageIndex 5 -> lotId 1, 11 -> lotId 7, 21 -> lotId 17
    const hrefs = bidLinks.map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining(['/auction/lot-1']));
    expect(hrefs).toEqual(expect.arrayContaining(['/auction/lot-7']));
    expect(hrefs).toEqual(expect.arrayContaining(['/auction/lot-17']));
  });

  it('renders NO Bid Now link when there are no lot pages', () => {
    const noLots: Catalog = {
      pages: [
        { pageIndex: 1, image: '/images/catalog/page-01.webp', kind: 'cover' },
        { pageIndex: 2, image: '/images/catalog/page-02.webp', kind: 'chapter' },
        { pageIndex: 3, image: '/images/catalog/page-03.webp', kind: 'rules' },
      ],
    };
    render(<CatalogFlipbook catalog={noLots} />);
    expect(screen.queryByRole('link', { name: /bid now/i })).not.toBeInTheDocument();
  });
});
