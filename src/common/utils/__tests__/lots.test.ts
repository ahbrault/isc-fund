import { describe, it, expect } from 'vitest';
import { parseLotSlug, getLotById, getLotBySlug } from '@/common/utils/lots';
import type { Lot } from '@/common/@types/Lot.type';

// NOTE: An equivalent inline parser already exists in
// src/app/auction/[slug]/page.tsx (getLotBySlug, using
// `parseInt(slug.replace('lot-', ''))`). The implementer should make
// `src/common/utils/lots.ts` the canonical home and have the page reuse it.
// The inline parseInt approach is intentionally NOT what we test against:
// 'lot-abc' must yield null, not NaN.

const fixture: Lot[] = [
  {
    id: 1,
    lotNumber: 1,
    title: 'Lot One',
    description: 'desc',
    image: '/images/lots/1.png',
    type: 'auction',
    catalogPage: 5,
  },
  {
    id: 7,
    lotNumber: 7,
    title: 'Lot Seven',
    description: 'desc',
    image: '/images/lots/7.png',
    type: 'auction',
    catalogPage: 11,
  },
  {
    id: 16,
    lotNumber: 16,
    title: 'Lot Sixteen',
    description: 'desc',
    image: '/images/lots/16.png',
    type: 'auction',
    catalogPage: 20,
  },
];

describe('parseLotSlug', () => {
  it('parses "lot-7" to 7', () => {
    expect(parseLotSlug('lot-7')).toBe(7);
  });

  it('parses "lot-16" to 16', () => {
    expect(parseLotSlug('lot-16')).toBe(16);
  });

  it('parses zero-padded "lot-007" to 7', () => {
    expect(parseLotSlug('lot-007')).toBe(7);
  });

  it('returns null for "lot-" with no number', () => {
    expect(parseLotSlug('lot-')).toBeNull();
  });

  it('returns null for non-numeric "lot-abc"', () => {
    expect(parseLotSlug('lot-abc')).toBeNull();
  });

  it('returns null for a bare number "7"', () => {
    expect(parseLotSlug('7')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(parseLotSlug('')).toBeNull();
  });
});

describe('getLotById', () => {
  it('returns the lot for a known id', () => {
    expect(getLotById(7, fixture)).toEqual(fixture[1]);
  });

  it('returns null for a gap id (2)', () => {
    expect(getLotById(2, fixture)).toBeNull();
  });

  it('returns null for a missing id (999)', () => {
    expect(getLotById(999, fixture)).toBeNull();
  });
});

describe('getLotBySlug', () => {
  it('returns lot 7 for "lot-7"', () => {
    expect(getLotBySlug('lot-7', fixture)).toEqual(fixture[1]);
  });

  it('returns null for gap slug "lot-2"', () => {
    expect(getLotBySlug('lot-2', fixture)).toBeNull();
  });

  it('returns null for garbage slug', () => {
    expect(getLotBySlug('garbage', fixture)).toBeNull();
  });
});
