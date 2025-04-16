import React from 'react';
import { Metadata, NextPage } from 'next';
import { Button, Header, Section } from '@/components';
import Image from 'next/image';

// TODO add metadata
export const metadata: Metadata = {
  title: 'International Sicle Cell Fund',
  description:
    'ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children in Africa.',
  // TODO add robots.txt
  robots: 'index, follow',
};

const LandingPage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section className="min-h-[calc(100vh-5rem)] bg-primary pt-6 md:min-h-[70vh] md:py-16 md:pt-32">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            <Image
              src="/images/kid-1.png"
              width={300}
              height={300}
              className="mx-auto h-96 w-auto"
              alt="Save a child"
            />
            <div>
              <h1 className="text-white">
                Every day 1000 children die from a disease that no one talks about
              </h1>
              <p className="text-white">
                ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children in
                Africa.
              </p>
              <Button className="my-8 w-full font-bold">Donate Now</Button>
            </div>
          </div>
        </Section>
        <Section>
          <Image
            src="/logo-2.svg"
            width={300}
            height={100}
            className="mx-auto h-24 w-auto"
            alt="Save a child"
          />
          <h2 className="mt-10 text-center">Sickle cell is #1 genetic disease in the World</h2>
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
            className="mx-auto my-12 w-auto"
            alt="Save a child"
          />
          <ul className="space-y-4">
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
        </Section>
        <Section className="bg-primary">
          <h2 className="mb-0 text-center text-white">
            We created ISC Fund to give access to the sickle cell treatment in Africa
          </h2>
        </Section>
        <Section>
          <h2 className="text-center">
            The first treatment for Sickle Cells disease produced in Africa at cost
          </h2>
          <Image
            src="/images/drepaf.png"
            width={300}
            height={100}
            className="mx-auto my-12 w-40"
            alt="Save a child"
          />
          <p className="mb-2">
            The International Sickle Cell Fund was founded to fight Sickle Cell Disease, the most
            common genetic disorder in the world, affecting millions of gene carriers globally — 80%
            of whom live in Africa.
          </p>
          <p className="mb-2">
            Despite its scale and devastating consequences, this disease remains largely overlooked.
          </p>
        </Section>
        <Section className="bg-primary">
          <h2 className="text-center text-4xl text-white">
            Every $60 can saves a child&apos;s life
          </h2>
          <Image
            src="/images/kid-2.png"
            width={300}
            height={300}
            className="mx-auto my-6 w-full"
            alt="Save a child"
          />
          <p className="mb-2 text-center text-xl text-white">
            Sickle Cell is invisible — but deadly.
          </p>
          <p className="mb-2 text-center text-xl text-white">
            Together, <b className="text-white">we can change that</b>.
          </p>
          <p className="mb-2 text-center text-xl text-white">
            Just <b className="text-white">$60 per year</b> gives a child the treatment they need to
            live.
          </p>
          <Button className="my-4 w-full font-bold">Donate Now</Button>
        </Section>
      </main>
    </>
  );
};

export default LandingPage;
