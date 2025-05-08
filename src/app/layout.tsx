import React from 'react';

import type { Metadata } from 'next';
import { Cabin } from 'next/font/google';
import '../styles/globals.css';

const cabinSans = Cabin({
  variable: '--font-cabin',
  subsets: ['latin'],
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
  // TODO add robots.txt
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabinSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
