import React from 'react';
import Image from 'next/image';
import { Button, Section } from '@/components';
import { APP_ROUTES } from '@/common';

const DonateSection = () => {
  return (
    <Section backgroundColor="bg-primary">
      <div className="md:hidden">
        <h2 className="text-4xl uppercase text-white">You can save a life for $60</h2>
        <Image
          src="/images/kid-2.png"
          width={300}
          height={300}
          className="mx-auto my-6 h-auto max-h-[40vh] w-auto max-w-52"
          alt="Save a child"
        />
        <p className="text-lg text-white">
          The generic hydroxyurea formulation DREPAF® is sold at cost price in Senegal, making it
          three times cheaper than the few treatments available today.
        </p>
        <p className="text-lg text-white">
          However, even at this reduced price, the poorest families with multiple children affected
          by the disease cannot afford the treatment.
        </p>
        <p className="text-lg text-white">
          This is why the International Sickle Cell Fund is reaching out to your generosity to help
          save thousands of children suffering from the severe form of the disease.
        </p>
        <p className="text-lg text-white">Together, we can change their lives!</p>
        <Button href={APP_ROUTES.donate.path} className="my-4 w-full font-bold">
          Donate Now
        </Button>
      </div>

      <div className="hidden items-center md:grid md:grid-cols-2 md:gap-x-16">
        <h2 className="col-span-2 text-center text-5xl uppercase text-white">
          You can save a life for $60
        </h2>
        <div>
          <p className="text-lg text-white">
            The generic hydroxyurea formulation DREPAF® is sold at cost price in Senegal, making it
            three times cheaper than the few treatments available today.
          </p>
          <p className="text-lg text-white">
            However, even at this reduced price, the poorest families with multiple children
            affected by the disease cannot afford the treatment.
          </p>
          <p className="text-lg text-white">
            This is why the International Sickle Cell Fund is reaching out to your generosity to
            help save thousands of children suffering from the severe form of the disease.
          </p>
          <p className="text-lg text-white">Together, we can change their lives!</p>
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
