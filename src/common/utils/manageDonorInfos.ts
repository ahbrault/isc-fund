import { DonorInfo } from '@/common';

const GLOBAL_KEY = 'donorInfo';
const LOT_KEY_PREFIX = 'lotBid_';

/**
 * Global Data (donation / lottery)
 */
export const saveDonorInfo = (info: DonorInfo) => {
  localStorage.setItem(GLOBAL_KEY, JSON.stringify(info));
};

export const retrieveDonorInfo = (): DonorInfo | null => {
  const raw = localStorage.getItem(GLOBAL_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearDonorInfo = () => {
  localStorage.removeItem(GLOBAL_KEY);
};

/**
 * Auction Data
 */
export const saveLotBidInfo = (lotId: number, info: DonorInfo & { amount: number }) => {
  localStorage.setItem(`${LOT_KEY_PREFIX}${lotId}`, JSON.stringify(info));
};

export const retrieveLotBidInfo = (lotId: number): (DonorInfo & { amount: number }) | null => {
  const raw = localStorage.getItem(`${LOT_KEY_PREFIX}${lotId}`);
  return raw ? JSON.parse(raw) : null;
};

export const clearLotBidInfo = (lotId: number) => {
  localStorage.removeItem(`${LOT_KEY_PREFIX}${lotId}`);
};
