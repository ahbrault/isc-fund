import React from 'react';
import { Section } from '@/components';
import Link from 'next/link';
import Image from 'next/image';

type ContactSectionProps = {
  children?: React.ReactNode;
};

const ContactSection: React.FC<ContactSectionProps> = () => {
  return (
    <Section
      className="grid items-center justify-center gap-16 py-20 md:grid-cols-2 md:py-32"
      id="contact"
    >
      <Image
        src="/images/drep-africa.png"
        width={400}
        height={200}
        className="mx-auto max-h-56 max-w-[80%] md:h-full md:w-auto md:object-contain"
        alt="Drep Afrique"
      />
      <div>
        <p className="mb-8 text-xl font-semibold">
          We invite you to visit{' '}
          <Link href="https://www.drep-afrique.org" target="_blank" className="underline">
            Drep Africa
          </Link>{' '}
          for detailed information about the NGO and its missions supported by the ISC Fund.
        </p>
        <p className="mb-4 text-xl font-semibold">
          For any inquiries, please feel free to contact Emmanuel Jayr, Co-founder and Treasurer of
          the ISC Fund, at{' '}
          <Link href="mailto:manu@iscfund.com" target="_blank" className="underline">
            manu@iscfund.com
          </Link>
          .
        </p>
      </div>
    </Section>
  );
};

export default ContactSection;
