import React from 'react';
import Image from 'next/image';
import { Section } from '@/components';

const DrepafSection = () => {
  return (
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
          The ISC Fund provides financial support to DREP AFRIQUE and, most notably, to the DREPAF®
          program.
        </p>
        <p className="mb-2">
          This program is the result of a groundbreaking humanitarian agreement with the
          pharmaceutical company Teranga Pharma, to produce and distribute the only known treatment
          proven to drastically reduce child mortality from Sickle Cell Disease: hydroxyurea.
        </p>
        <p className="mb-2">
          DREPAF® will be manufactured in Senegal and sold at cost price beginning in 2025 — $60
          per year per child.
        </p>
        <p className="mb-2">
          We are currently awaiting final approval from the Senegalese National Drug Agency to begin
          distribution in local pharmacies. The program will then be expanded to four additional
          African countries.
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
            DREPAF® will be manufactured in Senegal and sold at cost price beginning in 2025 — $60
            per year per child.
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
  );
};

export default DrepafSection;
