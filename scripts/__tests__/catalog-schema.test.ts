import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  lotsSchema,
  parseLots,
  catalogSchema,
  parseCatalog,
} from '@/common/validation/catalog';
import type { Lot } from '@/common/@types/Lot.type';
import type { Catalog, CatalogPageKind } from '@/common/@types/Catalog.type';

// Ground-truth from the V5 catalogue PDF (22 pages, 15 lots).
const EXPECTED_LOT_NUMBERS = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17];

// 1-based page kind map for the 22-page catalogue.
const EXPECTED_PAGE_KINDS: Record<number, CatalogPageKind> = {
  1: 'cover',
  2: 'chapter',
  3: 'chapter',
  4: 'chapter',
  5: 'lot',
  6: 'lot',
  7: 'lot',
  8: 'chapter',
  9: 'lot',
  10: 'lot',
  11: 'lot',
  12: 'lot',
  13: 'lot',
  14: 'lot',
  15: 'lot',
  16: 'lot',
  17: 'lot',
  18: 'chapter',
  19: 'lot',
  20: 'lot',
  21: 'lot',
  22: 'rules',
};

// lotNumber -> 1-based catalog page.
const EXPECTED_LOT_TO_PAGE: Record<number, number> = {
  1: 5,
  3: 6,
  4: 7,
  5: 9,
  6: 10,
  7: 11,
  8: 12,
  9: 13,
  10: 14,
  11: 15,
  12: 16,
  13: 17,
  14: 19,
  16: 20,
  17: 21,
};

function readJson(relPath: string): unknown {
  const filePath = path.join(process.cwd(), relPath);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('public/data/lots.json', () => {
  const raw = readJson('public/data/lots.json');

  it('parses through lotsSchema without throwing', () => {
    expect(() => lotsSchema.parse(raw)).not.toThrow();
  });

  it('parses through parseLots without throwing', () => {
    expect(() => parseLots(raw)).not.toThrow();
  });

  it('has exactly 15 lots', () => {
    const lots: Lot[] = parseLots(raw);
    expect(lots).toHaveLength(15);
  });

  it('has unique lot ids', () => {
    const lots: Lot[] = parseLots(raw);
    const ids = lots.map(l => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has every lot type in {auction, lottery}', () => {
    const lots: Lot[] = parseLots(raw);
    for (const lot of lots) {
      expect(['auction', 'lottery']).toContain(lot.type);
    }
  });

  it('has a present, positive integer catalogPage on every lot', () => {
    const lots: Lot[] = parseLots(raw);
    for (const lot of lots) {
      expect(lot.catalogPage).toBeTypeOf('number');
      expect(Number.isInteger(lot.catalogPage)).toBe(true);
      expect(lot.catalogPage as number).toBeGreaterThan(0);
    }
  });

  it('has the expected (non-contiguous) set of lotNumbers', () => {
    const lots: Lot[] = parseLots(raw);
    const lotNumbers = lots.map(l => l.lotNumber).sort((a, b) => a - b);
    expect(lotNumbers).toEqual(EXPECTED_LOT_NUMBERS);
  });
});

describe('public/data/catalog.json', () => {
  const raw = readJson('public/data/catalog.json');

  it('parses through catalogSchema without throwing', () => {
    expect(() => catalogSchema.parse(raw)).not.toThrow();
  });

  it('parses through parseCatalog without throwing', () => {
    expect(() => parseCatalog(raw)).not.toThrow();
  });

  it('has exactly 22 pages', () => {
    const catalog: Catalog = parseCatalog(raw);
    expect(catalog.pages).toHaveLength(22);
  });

  it('has pageIndex 1..22 with no gaps/dupes, sorted ascending', () => {
    const catalog: Catalog = parseCatalog(raw);
    const indices = catalog.pages.map(p => p.pageIndex);
    expect(indices).toEqual(Array.from({ length: 22 }, (_, i) => i + 1));
  });

  it('matches the ground-truth page kind map', () => {
    const catalog: Catalog = parseCatalog(raw);
    for (const page of catalog.pages) {
      expect(page.kind).toBe(EXPECTED_PAGE_KINDS[page.pageIndex]);
    }
  });

  it('has page 1 = cover and page 22 = rules', () => {
    const catalog: Catalog = parseCatalog(raw);
    const byIndex = new Map(catalog.pages.map(p => [p.pageIndex, p]));
    expect(byIndex.get(1)?.kind).toBe('cover');
    expect(byIndex.get(22)?.kind).toBe('rules');
  });

  it('has exactly 15 lot pages', () => {
    const catalog: Catalog = parseCatalog(raw);
    const lotPages = catalog.pages.filter(p => p.kind === 'lot');
    expect(lotPages).toHaveLength(15);
  });
});

describe('cross-ref integrity between lots.json and catalog.json', () => {
  const lots: Lot[] = parseLots(readJson('public/data/lots.json'));
  const catalog: Catalog = parseCatalog(readJson('public/data/catalog.json'));

  it('every catalog page lotId points to an existing lot id', () => {
    const lotIds = new Set(lots.map(l => l.id));
    for (const page of catalog.pages) {
      if (page.lotId !== undefined) {
        expect(lotIds.has(page.lotId)).toBe(true);
      }
    }
  });

  it("every lot's catalogPage maps back to a catalog page whose lotId is that lot's id", () => {
    const pageByIndex = new Map(catalog.pages.map(p => [p.pageIndex, p]));
    for (const lot of lots) {
      const page = pageByIndex.get(lot.catalogPage as number);
      expect(page, `lot ${lot.id} -> page ${lot.catalogPage}`).toBeDefined();
      expect(page?.lotId).toBe(lot.id);
    }
  });

  it('matches the expected lotNumber -> catalogPage mapping', () => {
    const byLotNumber = new Map(lots.map(l => [l.lotNumber, l]));
    for (const [lotNumber, expectedPage] of Object.entries(EXPECTED_LOT_TO_PAGE)) {
      const lot = byLotNumber.get(Number(lotNumber));
      expect(lot, `lotNumber ${lotNumber}`).toBeDefined();
      expect(lot?.catalogPage).toBe(expectedPage);
    }
  });
});
