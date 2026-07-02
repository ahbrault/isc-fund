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
        url: '/images/events/cathy-guetta-gala-sickle-cell-july-16-2026.webp',
        width: 848,
        height: 1200,
        alt: 'Cathy Guetta for Sickle Cell Gala — July 16, 2026, Nikki Beach Saint-Tropez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donate — ISC Fund',
    description:
      'Support children with Sickle Cell Disease. Every donation funds life-saving treatment through ISC Fund.',
    images: ['/images/events/cathy-guetta-gala-sickle-cell-july-16-2026.webp'],
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
