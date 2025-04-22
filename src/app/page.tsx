import React from 'react';
import { Metadata, NextPage } from 'next';
import { Footer, Header } from '@/components';
import {
  BannerSection,
  ContactSection,
  DonateSection,
  DrepafSection,
  HeroSection,
  WhatIsSickleSection,
} from './components';

// TODO add metadata
export const metadata: Metadata = {
  title: 'International Sickle Cell Fund',
  description:
    'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children in Africa.',
  openGraph: {
    title: 'International Sickle Cell Fund',
    description:
      'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children in Africa.',
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

const LandingPage: NextPage = () => {
  return (
    <>
      <Header />

      <main className="pt-20">
        <HeroSection />
        <WhatIsSickleSection />
        <BannerSection />
        <DrepafSection />
        <DonateSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
