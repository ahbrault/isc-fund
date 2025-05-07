import React from 'react';
import { Section } from '@/components';
import Image from 'next/image';

const WhatIsSickleSection = () => {
  return (
    <Section id="what-is">
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
          <p>
            Sickle cell disease is a genetic disorder affecting hemoglobin, the substance in red
            blood cells that carries oxygen. In affected individuals, red blood cells are fragile,
            destroyed quickly, and deformed into a sickle shape, obstructing blood flow and causing
            oxygen deprivation to organs.
          </p>
          <p>
            This results in anemia, pain crises, and a higher risk of infections. Vaso-occlusive
            crises, marked by severe and unpredictable pain, can affect bones and organs.
          </p>
          <p>
            In Africa, high infant mortality rates are due to limited access to treatment,
            exacerbating the disease&apos;s devastating impact. Despite its scale and devastating
            consequences, this disease remains largely overlooked.
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
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                <Image
                  src="/icons/africa.svg"
                  width={24}
                  height={24}
                  className="m-5 size-6 text-white"
                  alt="Sickle Cell Disease Africa"
                />
              </div>
              80% of patients are in Africa.
            </li>
            <li className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                <Image
                  src="/icons/baby.png"
                  width={24}
                  height={24}
                  className="m-5 size-6 text-white"
                  alt="Sickle Cell Disease child"
                />
              </div>
              50% of affected children die before the age of 5.
            </li>
            <li className="inline-flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                <Image
                  src="/icons/treatment.png"
                  width={24}
                  height={24}
                  className="m-5 size-6 text-white"
                  alt="Sickle Cell Disease child"
                />
              </div>
              {'<'} 20% of patients have access to hydroxyurea treatment
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsSickleSection;
