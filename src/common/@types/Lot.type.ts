export type Lot = {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  type: 'auction' | 'lottery';
  reserve?: number | null;
  ticketPrice?: number;
};
