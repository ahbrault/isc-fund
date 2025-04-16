import React from 'react';
import { Metadata, NextPage } from 'next';
import { Button, Header, Section } from '@/components';
import Image from 'next/image';

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

const EventBanner = ({ mobile = false }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <div className="my-8 rounded-lg bg-white/30 p-4 md:hidden">
        <div className="mb-1 rounded-full font-bold uppercase">Next event</div>
        <div className="mx-auto inline-flex flex-wrap items-center">
          <span className="text-sm font-medium text-white">May 9–10, 2025</span>
          <span className="text-sm text-white">Las Vegas Charity Gala & Supercar Race</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 hidden gap-2 rounded-full bg-white/30 p-1.5 md:inline-flex">
      <div className="h-full rounded-full bg-secondary px-3 py-1.5 text-center text-sm text-white">
        Next event
      </div>
      <div className="mx-auto mr-2 inline-flex flex-wrap items-center gap-x-1 font-medium">
        <span className="text-sm text-white">May 9–10, 2025</span>
        <span className="hidden text-sm text-white md:block">·</span>
        <span className="text-sm text-white">Las Vegas Charity Gala & Supercar Race</span>
      </div>
    </div>
  );
};

const LandingPage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section backgroundColor="bg-primary" className="pt-6 md:min-h-[70vh] md:py-16 md:pt-32">
          <div className="grid items-center gap-4 md:grid-cols-2 md:gap-16">
            <Image
              src="/images/kid-1.png"
              width={300}
              height={300}
              className="mx-auto h-auto max-h-[35vh] w-auto max-w-48 md:order-2 md:h-[500px] md:max-h-full md:max-w-full"
              alt="Save a child"
            />
            <div className="md:order-1">
              <EventBanner />
              <h1 className="text-white">
                Every day 1000 children die from a disease that no one talks about
              </h1>
              <p className="text-white md:text-lg">
                ISC Fund fights Sickle Cell Disease by funding life-saving treatment for children in
                Africa.
              </p>
              <Button className="my-4 w-full font-bold md:w-auto">Donate Now</Button>
            </div>
            <EventBanner mobile />
          </div>
        </Section>

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
                The International Sickle Cell Fund was founded to fight Sickle Cell Disease, the
                most common genetic disorder in the world, affecting millions of gene carriers
                globally — 80% of whom live in Africa.
              </p>
              <p className="mb-2">
                Despite its scale and devastating consequences, this disease remains largely
                overlooked.
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

        <Section>
          <div className="md:hidden">
            <h2>The first treatment for Sickle Cells disease produced in Africa at cost</h2>
            <Image
              src="/images/drepaf.png"
              width={300}
              height={100}
              className="mx-auto my-12 w-40"
              alt="Drepaf treatment"
            />
            <p className="mb-2">
              The ISC Fund provides financial support to DREP AFRIQUE and, most notably, to the
              DREPAF® program.
            </p>
            <p className="mb-2">
              This program is the result of a groundbreaking humanitarian agreement with the
              pharmaceutical company Teranga Pharma, to produce and distribute the only known
              treatment proven to drastically reduce child mortality from Sickle Cell Disease:
              hydroxyurea.
            </p>
            <p className="mb-2">
              DREPAF® will be manufactured in Senegal and sold at cost price beginning in 2025 —
              $60 per year per child.
            </p>
            <p className="mb-2">
              We are currently awaiting final approval from the Senegalese National Drug Agency to
              begin distribution in local pharmacies. The program will then be expanded to four
              additional African countries.
            </p>
          </div>
          <div className="hidden items-center md:grid md:grid-cols-2 md:gap-16">
            <div>
              <h2>The first treatment for Sickle Cells disease produced in Africa at cost</h2>
              <p className="mb-2">
                The ISC Fund provides financial support to DREP AFRIQUE and, most notably, to the
                DREPAF® program.
              </p>
              <p className="mb-2">
                This program is the result of a groundbreaking humanitarian agreement with the
                pharmaceutical company Teranga Pharma, to produce and distribute the only known
                treatment proven to drastically reduce child mortality from Sickle Cell Disease:
                hydroxyurea.
              </p>
              <p className="mb-2">
                DREPAF® will be manufactured in Senegal and sold at cost price beginning in 2025 —
                $60 per year per child.
              </p>
              <p className="mb-2">
                We are currently awaiting final approval from the Senegalese National Drug Agency to
                begin distribution in local pharmacies. The program will then be expanded to four
                additional African countries.
              </p>
            </div>
            <Image
              src="/images/drepaf.png"
              width={300}
              height={100}
              className="mx-auto my-12 max-h-[400px] w-auto"
              alt="Drepaf treatment"
            />
          </div>
        </Section>

        <Section backgroundColor="bg-primary">
          <div className="md:hidden">
            <h2 className="text-4xl text-white">Every $60 can saves a child&apos;s life</h2>
            <Image
              src="/images/kid-2.png"
              width={300}
              height={300}
              className="mx-auto my-6 h-auto max-h-[40vh] w-auto max-w-52"
              alt="Save a child"
            />
            <p className="mb-2 text-center text-xl text-white">
              Sickle Cell is invisible — but deadly.
            </p>
            <p className="mb-2 text-center text-xl text-white">
              Together, <b className="text-white">we can change that</b>.
            </p>
            <p className="mb-2 text-center text-xl text-white">
              Just <b className="text-white">$60 per year</b> gives a child the treatment they need
              to live.
            </p>
            <Button className="my-4 w-full font-bold">Donate Now</Button>
          </div>

          <div className="hidden items-center md:grid md:grid-cols-2 md:gap-x-16">
            <h2 className="col-span-2 text-center text-5xl text-white">
              Every $60 can saves a child&apos;s life
            </h2>
            <div>
              <p className="mb-4 text-2xl text-white">Sickle Cell is invisible — but deadly.</p>
              <p className="mb-4 text-2xl text-white">
                Together, <b className="text-white">we can change that</b>.
              </p>
              <p className="mb-2 text-2xl text-white">
                Just <b className="text-white">$60 per year</b> gives a child the treatment they
                need to live.
              </p>
              <Button className="my-4 font-bold">Donate Now</Button>
            </div>

            <Image
              src="/images/kid-2.png"
              width={300}
              height={300}
              className="mx-auto my-6 h-[400px] w-auto"
              alt="Save a child"
            />
          </div>
        </Section>
      </main>
    </>
  );
};

export default LandingPage;
