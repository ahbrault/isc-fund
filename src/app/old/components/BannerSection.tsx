import React from 'react';
import { Section } from '@/components';
import Image from 'next/image';

const BannerSection = () => {
  return (
    <Section
      backgroundColor="bg-primary"
      className="md:grid md:grid-cols-3 md:items-center md:gap-16"
    >
      <Image
        src="/logo-icon-white.svg"
        width={300}
        height={100}
        className="col-span-1 mx-auto hidden h-24 w-auto md:block"
        alt="ISC Fund"
      />
      <h2 className="col-span-2 mb-0 text-white">
        We created ISC Fund to give access to the sickle cell treatment in Africa
      </h2>
    </Section>
  );
};

export default BannerSection;
