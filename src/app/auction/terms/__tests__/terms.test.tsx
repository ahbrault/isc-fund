import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuctionTermsPage, { metadata } from '../page';

describe('Auction Terms page', () => {
  it('renders the page heading', () => {
    render(<AuctionTermsPage />);
    expect(screen.getByRole('heading', { name: /Auction Terms/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the key rules content', () => {
    render(<AuctionTermsPage />);
    expect(screen.getByText(/legally binding/i)).toBeInTheDocument();
    expect(screen.getByText(/16 July 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/66%/)).toBeInTheDocument();
  });

  it('exposes a descriptive metadata title', () => {
    expect(metadata.title).toBe('Auction Terms & Conditions — ISC Fund');
  });
});
