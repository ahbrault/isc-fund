export type DonorInfo = {
  name: string;
  email: string;
  phone: string;
};

export type DonorSummary = DonorInfo & {
  amount: number;
  label: string;
};
