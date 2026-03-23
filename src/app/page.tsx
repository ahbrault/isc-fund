import React from 'react';
import { NextPage } from 'next';
import { Footer, Header } from '@/components';
import {
  // AuctionCatalogSection,
  BabiesSection,
  BannerSection,
  ContactSection,
  DonateSection,
  DrepafSection,
  EventPresentationSection,
  HeroSection,
  PartnersSection,
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
        <BabiesSection />
        <BannerSection />
        <DrepafSection />
        <PartnersSection />
        <DonateSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
