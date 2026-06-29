import { describe, it, expect } from 'vitest';
import {
  lotSchema,
  catalogSchema,
  catalogPageSchema,
} from '@/common/validation/catalog';

const validLot = {
  id: 1,
  lotNumber: 1,
  title: 'A valid lot',
  description: 'A description',
  image: '/images/lots/1.png',
  type: 'auction',
  catalogPage: 5,
};

const validCatalogPage = {
  pageIndex: 5,
  image: '/images/catalog/5.png',
  kind: 'lot',
  lotId: 1,
};

const validCatalog = {
  pages: [
    { pageIndex: 1, image: '/images/catalog/1.png', kind: 'cover' },
    validCatalogPage,
    { pageIndex: 22, image: '/images/catalog/22.png', kind: 'rules' },
  ],
};

describe('lotSchema', () => {
  it('accepts a valid minimal lot', () => {
    expect(() => lotSchema.parse(validLot)).not.toThrow();
  });

  it('rejects an unknown type value', () => {
    expect(() => lotSchema.parse({ ...validLot, type: 'bogus' })).toThrow();
  });

  it('rejects a negative id', () => {
    expect(() => lotSchema.parse({ ...validLot, id: -1 })).toThrow();
  });

  it('rejects a zero id', () => {
    expect(() => lotSchema.parse({ ...validLot, id: 0 })).toThrow();
  });

  it('rejects a missing title', () => {
    const { title: _title, ...noTitle } = validLot;
    expect(() => lotSchema.parse(noTitle)).toThrow();
  });
});

describe('catalogPageSchema', () => {
  it('accepts a valid page', () => {
    expect(() => catalogPageSchema.parse(validCatalogPage)).not.toThrow();
  });

  it('rejects a non-positive pageIndex', () => {
    expect(() =>
      catalogPageSchema.parse({ ...validCatalogPage, pageIndex: 0 })
    ).toThrow();
  });

  it('rejects a bad kind', () => {
    expect(() =>
      catalogPageSchema.parse({ ...validCatalogPage, kind: 'nope' })
    ).toThrow();
  });
});

describe('catalogSchema', () => {
  it('accepts a valid minimal catalog', () => {
    expect(() => catalogSchema.parse(validCatalog)).not.toThrow();
  });

  it('rejects a catalog whose page has a non-positive pageIndex', () => {
    const bad = {
      pages: [{ pageIndex: -3, image: '/x.png', kind: 'cover' }],
    };
    expect(() => catalogSchema.parse(bad)).toThrow();
  });

  it('rejects a catalog whose page has a bad kind', () => {
    const bad = {
      pages: [{ pageIndex: 1, image: '/x.png', kind: 'banana' }],
    };
    expect(() => catalogSchema.parse(bad)).toThrow();
  });
});
