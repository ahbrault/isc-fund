import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveDonorBidInfo,
  retrieveDonorBidInfo,
  clearDonorBidInfo,
} from '@/common/utils/storage';

const summary = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+15551234567',
  amount: 100,
  label: 'Lot Seven',
  id: 'b1',
};

beforeEach(() => {
  localStorage.clear();
});

describe('donor bid storage round-trip', () => {
  it('saves then retrieves the same summary', () => {
    saveDonorBidInfo(7, summary);
    expect(retrieveDonorBidInfo(7)).toEqual(summary);
  });

  it('clears a saved bid', () => {
    saveDonorBidInfo(7, summary);
    clearDonorBidInfo(7);
    expect(retrieveDonorBidInfo(7)).toBeNull();
  });

  it('returns null for a lot that was never saved', () => {
    expect(retrieveDonorBidInfo(999)).toBeNull();
  });

  it('scopes storage per lot id', () => {
    saveDonorBidInfo(7, summary);
    expect(retrieveDonorBidInfo(8)).toBeNull();
  });
});
