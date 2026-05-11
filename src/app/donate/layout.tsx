import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support children with Sickle Cell Disease. Every donation funds life-saving treatment through ISC Fund.',
  alternates: {
    canonical: '/donate',
  },
  openGraph: {
    title: 'Donate — ISC Fund',
    description:
      'Support children with Sickle Cell Disease. Every donation funds life-saving treatment through ISC Fund.',
    url: '/donate',
    type: 'website',
    siteName: 'ISC Fund',
    images: [
      {
        url: '/images/events/nikki-beach-26.jpg',
        width: 1023,
        height: 1537,
        alt: 'ISC Fund Gala 2026 — Nikki Beach flyer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donate — ISC Fund',
    description:
      'Support children with Sickle Cell Disease. Every donation funds life-saving treatment through ISC Fund.',
    images: ['/images/events/nikki-beach-26.jpg'],
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
