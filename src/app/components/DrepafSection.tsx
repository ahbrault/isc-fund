import React from 'react';
import Image from 'next/image';
import { Section } from '@/components';

const DrepafSection = () => {
  return (
    <Section>
      <div className="md:hidden">
        <h2 className="flex flex-col">
          The first treatment for Sickle Cell disease produced in Africa{' '}
          <span className="block uppercase">at cost</span>
        </h2>
        <Image
          src="/images/drepaf-box.png"
          width={300}
          height={100}
          className="mx-auto my-12 w-40"
          alt="Drepaf treatment"
        />
        <p>
          The International Sickle Cell Fund financially supports the NGO Drep Afrique, particularly
          the DREPAF® project.
        </p>
        <p>
          The association has signed a unique humanitarian agreement with the laboratory Teranga
          Pharma to produce and distribute the only treatment that significantly reduces infant
          mortality among patients with Sickle Cell Disease using the hydroxyurea molecule.
        </p>
        <p>
          DREPAF® is produced in Senegal by Teranga Pharma. The first treatment sold at cost,
          available in 2025 in all pharmacies from $60 per year.
        </p>
        <p>The program will soon be available in four other African countries.</p>
      </div>
      <div className="hidden items-center md:grid md:grid-cols-2 md:gap-16">
        <div>
          <h2>The first treatment for Sickle Cells disease produced in Africa at cost</h2>
          <p>
            The International Sickle Cell Fund financially supports the NGO Drep Afrique,
            particularly the DREPAF® project.
          </p>
          <p>
            The association has signed a unique humanitarian agreement with the laboratory Teranga
            Pharma to produce and distribute the only treatment that significantly reduces infant
            mortality among patients with Sickle Cell Disease using the hydroxyurea molecule.
          </p>
          <p>
            DREPAF® is produced in Senegal by Teranga Pharma. The first treatment sold at cost,
            available in 2025 in all pharmacies from $60 per year.
          </p>
          <p>The program will soon be available in four other African countries.</p>
        </div>

        <Image
          src="/images/drepaf-box.png"
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
