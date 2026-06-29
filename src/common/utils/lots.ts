import type { Lot } from '@/common/@types/Lot.type';

/**
 * Parse a lot slug of the form `lot-<number>` into its numeric id.
 *
 * Strictly matches `^lot-(\d+)$`, so `'lot-007'` -> 7 and anything that is
 * not a `lot-<digits>` slug returns null (never NaN).
 */
export function parseLotSlug(slug: string): number | null {
  const match = /^lot-(\d+)$/.exec(slug);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export function getLotById(id: number, lots: Lot[]): Lot | null {
  return lots.find(lot => lot.id === id) ?? null;
}

export function getLotBySlug(slug: string, lots: Lot[]): Lot | null {
  const id = parseLotSlug(slug);
  if (id === null) return null;
  return getLotById(id, lots);
}
