export const saveDonorInfo = (name: string, email: string, phone: string) => {
  return localStorage.setItem('donorInfo', `${JSON.stringify({ name, email, phone })}`);
};

export const retrieveDonorInfo = (): { name: string; email: string; phone: string } | null => {
  const localInfo = localStorage.getItem('donorInfo');
  return localInfo ? JSON.parse(localInfo) : null;
};

export const clearDonorInfo = () => {
  return localStorage.removeItem('donorInfo');
};
