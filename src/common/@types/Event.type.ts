export type Event = {
  id: string;
  slug: string;
  name: string;
  date: Date;
  totalSeats: number;
  seatPrice: number;
  currency: string;
};

export type EventAvailability = {
  availableSeats: number;
  totalSeats: number;
};
