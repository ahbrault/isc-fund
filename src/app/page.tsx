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
