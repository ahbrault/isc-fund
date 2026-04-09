import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support children with Sickle Cell Disease. Every donation funds life-saving treatment through ISC Fund.',
  alternates: {
    canonical: '/donate',
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
