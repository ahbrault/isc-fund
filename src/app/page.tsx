import React from 'react';
import { NextPage } from 'next';
import { Footer, Header } from '@/components';
import {
  // AuctionCatalogSection,
  BannerSection,
  ContactSection,
  DonateSection,
  DrepafSection,
  EventPresentationSection,
  HeroSection,
  WhatIsSickleSection,
} from './components';

const LandingPage: NextPage = () => {
  return (
    <>
      <Header />

      <main className="pt-20">
        <HeroSection />
        {/*<AuctionCatalogSection />*/}
        <EventPresentationSection />
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
