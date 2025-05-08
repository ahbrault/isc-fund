export type Lot = {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  type: 'auction' | 'lottery';
  reserve?: boolean;
  reservePrice?: number;
  ticketPrice?: number;
  video?: string;
};
