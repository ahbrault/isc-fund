import { DonorSummary } from '@/common';

export const getBidStorageKey = (lotId: number) => `bidInfo_${lotId}`;

export const saveDonorBidInfo = (lotId: number, summary: DonorSummary) => {
  localStorage.setItem(getBidStorageKey(lotId), JSON.stringify(summary));
};

export const retrieveDonorBidInfo = (lotId: number): DonorSummary | null => {
  const raw = localStorage.getItem(getBidStorageKey(lotId));
  return raw ? JSON.parse(raw) : null;
};

export const clearDonorBidInfo = (lotId: number) => {
  localStorage.removeItem(getBidStorageKey(lotId));
};
