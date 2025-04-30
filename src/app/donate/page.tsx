import React from 'react';
import { NextPage } from 'next';
import { Footer, Section } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/common';

const DonatePage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <Link href={APP_ROUTES.home.path}>
        <Image
          height={100}
          width={240}
          src="/logo.svg"
          alt="ISC Fund"
          className="w-60 py-8"
          priority
        />
      </Link>
      <Section className="grid items-center md:grid-cols-2">
        <Image
          src="/images/kid-2.png"
          width={300}
          height={300}
          className="mx-auto mb-6 h-auto max-h-[40vh] w-auto max-w-52 md:max-h-full md:max-w-full"
          alt="Save a child"
        />
        <div>
          <h2 className="text-white">Your donation can save lives.</h2>
          <h4 className="mb-8 text-white">
            Join the fight against sickle cell disease – the most common genetic disorder in the
            world.
          </h4>
          <h3 className="text-white">Make a donation today</h3>
          <p className="text-white">Online donations will be available soon.</p>
          <p className="text-white">
            In the meantime, you can support us by making a direct bank transfer to our endowment
            account:
          </p>
          <p className="font-semibold uppercase text-white">Bank details</p>
          <p className="text-white">
            Domiciliation: <span className="font-bold text-white">BRED PARIS AGENCE RAPEE</span>
          </p>
          <p className="mb-8 text-white">
            International Bank Account Number (IBAN):{' '}
            <span className="font-bold text-white">FR76 1010 7001 1800 1260 5180 392</span>.
          </p>
          <h3 className="text-white">Prefer to speak with us?</h3>
          <p className="text-white">
            For more donation options or to request a receipt, please feel free to contact:
          </p>
          <p className="font-bold text-white">Emmanuel Jayr </p>
          <p className="text-white">Co-founder & Treasurer – ISC Fund</p>
          <p className="mb-8 text-white">
            <Link href="mailto:manujayr@gmail.com" className="underline">
              manujayr@gmail.com
            </Link>
          </p>
          <h3 className="text-white">Thank you for your support</h3>
          <p className="text-white">
            Every donation brings us closer to a world where sickle cell disease no longer takes
            lives.
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default DonatePage;
