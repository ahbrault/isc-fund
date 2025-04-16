import React from 'react';
import { Section } from '@/components';
import Image from 'next/image';

const WhatIsSickleSection = () => {
  return (
    <Section>
      <Image
        src="/logo-icon-primary.svg"
        width={300}
        height={100}
        className="mx-auto h-24 w-auto md:mb-16 md:hidden"
        alt="ISC Fund"
      />

      <div className="grid items-center gap-4 md:grid-cols-2 md:gap-16">
        <Image
          src="/images/schema.png"
          width={300}
          height={100}
          className="mx-auto hidden w-[80%] md:block"
          alt="Sickle Cell Disease"
        />

        <div>
          <h2 className="mt-10 md:mt-0">Sickle cell is #1 genetic disease in the World</h2>
          <p className="mb-2">
            The International Sickle Cell Fund was founded to fight Sickle Cell Disease, the most
            common genetic disorder in the world, affecting millions of gene carriers globally — 80%
            of whom live in Africa.
          </p>
          <p className="mb-2">
            Despite its scale and devastating consequences, this disease remains largely overlooked.
          </p>
          <Image
            src="/images/schema.png"
            width={300}
            height={100}
            className="mx-auto my-12 w-full max-w-96 md:hidden"
            alt="Sickle Cell Disease"
          />

          <ul className="flex flex-col space-y-4 md:mt-8">
            <li className="inline-flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20"></div>
              50% mortality under 5
            </li>
            <li className="inline-flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20"></div>
              60$ = 1 child saved
            </li>
            <li className="inline-flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20"></div>
              2025: Rollout in 5 African countries
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsSickleSection;
