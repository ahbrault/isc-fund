import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Reservation',
  robots: 'noindex, nofollow',
};

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
