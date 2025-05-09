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
  title: 'International Sickle Cell Fund',
  description: 'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children.',
  openGraph: {
    title: 'International Sickle Cell Fund',
    description:
      'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/kid-1-with-bg.jpg`,
        width: 1000,
        height: 1000,
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
