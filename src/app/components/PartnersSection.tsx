import React from 'react';
import { Section } from '@/components';
import Image from 'next/image';

const partners = [
  { name: 'Petrus', logo: '/images/partners/petrus.svg', width: 140 },
  { name: 'Chopard', logo: '/images/partners/chopard.svg', width: 150 },
  { name: 'Audemars Piguet', logo: '/images/partners/audemars-piguet.svg', width: 180 },
  { name: 'Christian Louboutin', logo: '/images/partners/christian-louboutin.svg', width: 180 },
  { name: 'Amiri', logo: '/images/partners/amiri.svg', width: 130 },
  { name: 'Pucci', logo: '/images/partners/pucci.svg', width: 120 },
  { name: 'APM Monaco', logo: '/images/partners/apm-monaco.svg', width: 120 },
  { name: 'Cincoro', logo: '/images/partners/cincoro.svg', width: 140 },
  { name: 'Kujten', logo: '/images/partners/kujten.svg', width: 130 },
  { name: 'Sentara', logo: '/images/partners/sentara.svg', width: 140 },
  { name: 'So To', logo: '/images/partners/solo.svg', width: 100 },
];

const PartnersSection = () => {
  return (
    <Section id="partners" backgroundColor="bg-[#1a1a1a]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container { overflow: hidden; }
        .marquee-content {
          display: inline-flex;
          align-items: center;
          animation: marquee 35s linear infinite;
          gap: 60px;
          padding-right: 60px;
        }
        .marquee-content:hover { animation-play-state: paused; }
        .partner-logo {
          opacity: 0.7;
          filter: brightness(0) invert(1);
          transition: all 0.3s ease;
        }
        .partner-logo:hover {
          opacity: 1;
          filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg);
        }
      `}</style>

      <div className="mb-16">
        <h2 className="mb-3 text-center font-serif text-4xl font-light italic tracking-wide text-white">
          Distinguished Partners
        </h2>
        <div className="mb-8 flex justify-center">
          <div className="h-1 w-12 bg-[#F48E12]"></div>
        </div>
        <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-gray-300">
          In 2025, these prestigious brands joined Cathy Guetta to raise €250,000 for children with
          sickle cell disease.
        </p>
      </div>

      <div className="relative mb-12">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...partners, ...partners].map((partner, index) => (
              <Image
                key={`${partner.name}-${index}`}
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={50}
                className="partner-logo h-10 w-auto md:h-12"
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent"></div>
      </div>

      <div className="mt-16 border-t border-gray-700 pt-8">
        <p className="text-center text-sm tracking-wide text-gray-400">
          Presented by{' '}
          <Image
            src="/images/partners/jack-e.svg"
            alt="Jack-e"
            width={80}
            height={30}
            className="ml-2 inline-block h-6 w-auto"
          />
        </p>
      </div>
    </Section>
  );
};

export default PartnersSection;
