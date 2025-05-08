import { DonorInfo } from '@/common';

export const saveDonorInfo = (info: DonorInfo) => {
  return localStorage.setItem('donorInfo', JSON.stringify(info));
};

export const retrieveDonorInfo = (): DonorInfo | null => {
  const localInfo = localStorage.getItem('donorInfo');
  return localInfo ? JSON.parse(localInfo) : null;
};

export const clearDonorInfo = () => {
  return localStorage.removeItem('donorInfo');
};
