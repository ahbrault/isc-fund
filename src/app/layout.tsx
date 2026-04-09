import React from 'react';
import { Cabin } from 'next/font/google';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/next';

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
  display: 'swap',
});

const signPainter = localFont({
  src: '../../public/fonts/SignPainterHouseScript.ttf',
  variable: '--font-sign-painter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.iscfund.com'),
  title: {
    default: 'International Sickle Cell Fund',
    template: '%s — ISC Fund',
  },
  description: 'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'International Sickle Cell Fund',
    description:
      'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/images/events/nikki-beach-26.jpg',
        width: 1200,
        height: 630,
        alt: 'International Sickle Cell Fund',
      },
    ],
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cabin.variable} ${signPainter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.iscfund.com/#organization',
                  name: 'International Sickle Cell Fund',
                  url: 'https://www.iscfund.com',
                  logo: 'https://www.iscfund.com/logo-icon-indigo.svg',
                  description:
                    'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children.',
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.iscfund.com/#website',
                  url: 'https://www.iscfund.com',
                  name: 'International Sickle Cell Fund',
                  publisher: { '@id': 'https://www.iscfund.com/#organization' },
                },
              ],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
