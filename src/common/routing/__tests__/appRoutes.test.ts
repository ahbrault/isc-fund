import { describe, it, expect } from 'vitest';
import { APP_ROUTES } from '../AppRoutes';

describe('APP_ROUTES auction routes', () => {
  it('builds the auction catalogue path', () => {
    expect(APP_ROUTES.auction.build()).toBe('/auction');
    expect(APP_ROUTES.auction.path).toBe('/auction');
  });

  it('builds a lot path from an id', () => {
    expect(APP_ROUTES.auctionLot.build(7)).toBe('/auction/lot-7');
    expect(APP_ROUTES.auctionLot.build('17')).toBe('/auction/lot-17');
  });

  it('builds the auction terms path', () => {
    expect(APP_ROUTES.auctionTerms.build()).toBe('/auction/terms');
    expect(APP_ROUTES.auctionTerms.path).toBe('/auction/terms');
  });
});
