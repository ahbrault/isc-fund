import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

/**
 * Phase 3 — RED test. `../BidNowOverlay` does not exist yet.
 *
 * Contract: `src/app/auction/BidNowOverlay.tsx`, props `{ lotId: number }`.
 *  - Renders a link (role link) whose accessible name matches /bid now/i.
 *  - `href` === `/auction/lot-<lotId>` (uses next/link).
 */

// Render next/link as a plain <a> so href + role=link assertions need no router.
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
    const resolvedHref = typeof href === 'string' ? href : href?.pathname ?? '';
    return (
      <a href={resolvedHref} {...rest}>
        {children}
      </a>
    );
  },
}));

import BidNowOverlay from '../BidNowOverlay';

describe('BidNowOverlay', () => {
  it('renders a "Bid Now" link', () => {
    render(<BidNowOverlay lotId={7} />);
    expect(screen.getByRole('link', { name: /bid now/i })).toBeInTheDocument();
  });

  it('links to /auction/lot-7 for lotId 7', () => {
    render(<BidNowOverlay lotId={7} />);
    expect(screen.getByRole('link', { name: /bid now/i })).toHaveAttribute(
      'href',
      '/auction/lot-7'
    );
  });

  it('links to /auction/lot-17 for lotId 17', () => {
    render(<BidNowOverlay lotId={17} />);
    expect(screen.getByRole('link', { name: /bid now/i })).toHaveAttribute(
      'href',
      '/auction/lot-17'
    );
  });
});
