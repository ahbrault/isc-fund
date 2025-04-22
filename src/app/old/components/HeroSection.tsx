import React from 'react';
import { Button, Section } from '@/components';
import Image from 'next/image';

const EventBanner = ({ mobile = false }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <div className="my-8 rounded-lg bg-white/30 p-4 md:hidden">
        <div className="mb-1 rounded-full font-bold uppercase">Next event</div>
        <div className="mx-auto inline-flex flex-wrap items-center gap-x-2">
          <span className="text-sm font-medium text-white">May 9–10, 2025</span>
          <span className="text-sm text-white">Las Vegas Charity Gala & Supercar Race</span>
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
  );
};

export default HeroSection;
