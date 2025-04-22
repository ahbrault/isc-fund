import React from 'react';
import Image from 'next/image';
import { Button, Section } from '@/components';
import { APP_ROUTES } from '@/common';

const DonateSection = () => {
  return (
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
        <p className="text-center text-xl text-white">Sickle Cell is invisible — but deadly.</p>
        <p className="text-center text-xl text-white">
          Together, <b className="text-white">we can change that</b>.
        </p>
        <p className="text-center text-xl text-white">
          Just <b className="text-white">$60 per year</b> gives a child the treatment they need to
          live.
        </p>
        <Button href={APP_ROUTES.donate.path} className="my-4 w-full font-bold">
          Donate Now
        </Button>
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
          <p className="text-2xl text-white">
            Just <b className="text-white">$60 per year</b> gives a child the treatment they need to
            live.
          </p>
          <Button href={APP_ROUTES.donate.path} className="my-4 font-bold">
            Donate Now
          </Button>
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
  );
};

export default DonateSection;
