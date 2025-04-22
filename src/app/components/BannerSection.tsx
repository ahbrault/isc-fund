import React from 'react';
import { Section } from '@/components';
import Image from 'next/image';

const BannerSection = () => {
  return (
    <Section backgroundColor="bg-primary">
      <div className="grid gap-8 md:grid-cols-3 md:items-center md:gap-16">
        <div className="col-span-1 flex flex-wrap items-center gap-4 lg:flex-nowrap">
          <Image
            src="/images/drepaf-logo-white.svg"
            width={300}
            height={100}
            className="mx-auto w-40"
            alt="Drepaf treatment"
          />
          <Image
            src="/icons/x.svg"
            width={40}
            height={40}
            className="mx-auto hidden size-6 text-white lg:block"
            alt="ISC Fund"
          />
          <Image
            src="/logo-icon-white.svg"
            width={300}
            height={100}
            className="mx-auto hidden h-24 w-auto md:block"
            alt="ISC Fund"
          />
        </div>
        <h2 className="col-span-1 mb-0 text-white md:col-span-2">
          We created ISC Fund to give access to the sickle cell treatment in Africa
        </h2>
      </div>
    </Section>
  );
};

export default BannerSection;
