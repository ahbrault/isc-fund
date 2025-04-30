import React from 'react';
import { Button, Section } from '@/components';
import Image from 'next/image';
import { APP_ROUTES } from '@/common';

const EventBanner = ({ mobile = false }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <div className="my-8 rounded-lg bg-white/30 p-4 md:hidden">
        <div className="mb-1 inline-flex items-center gap-2">
          <div className="rounded-full font-bold uppercase">Next event</div>
          <span>•</span>
          <span className="font-medium">May 9–10, 2025</span>
        </div>
        <div className="mx-auto inline-flex flex-wrap items-center gap-x-2">
          <span className="text-lg font-medium text-white">
            Las Vegas Charity Gala & Supercar Race
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 hidden items-center gap-2 rounded-full bg-white/30 p-1.5 md:inline-flex">
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

const HeroSection = () => {
  return (
    <Section backgroundColor="bg-primary" className="pt-6 md:min-h-[70vh] md:py-16 md:pt-32">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-16">
        <Image
          src="/images/kid-1.png"
          width={300}
          height={300}
          className="mx-auto h-auto max-h-[35vh] w-auto max-w-48 md:order-2 md:h-[500px] md:max-h-full md:max-w-full"
          alt="Save a child"
        />
        <div className="md:order-1">
          <EventBanner />
          <h1 className="uppercase text-white md:normal-case">
            Every day 1000 children die from a disease that no one talks about
          </h1>
          <p className="text-white md:text-lg">
            Sickle cell disease is the world&apos;s most common genetic disorder, affecting over 20
            million people, primarily in Africa, the disease kills half of children with the severe
            form before age five, predominantly impacting black populations.
          </p>
          <p className="text-white md:text-lg">
            Despite its high mortality, sickle cell remains largely underfunded and overlooked
            globally, with limited access to life-saving treatments.
          </p>
          <p className="text-white md:text-lg">
            This silent epidemic claims more lives than HIV/AIDS in Africa...
          </p>
          <Button href={APP_ROUTES.donate.path} className="my-4 w-full font-bold md:w-auto">
            Donate Now
          </Button>
        </div>
        <EventBanner mobile />
      </div>
    </Section>
  );
};

export default HeroSection;
