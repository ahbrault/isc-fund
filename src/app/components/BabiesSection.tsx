import React from 'react';
import { Section } from '@/components';
import Image from 'next/image';

const BabiesSection = () => {
  return (
    <Section id="babies" className="relative py-20 md:py-28">
      {/* Warm gradient background with subtle radial element */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-40" />
      <div className="bg-gradient-radial absolute right-0 top-0 -mr-48 -mt-32 h-96 w-96 rounded-full from-amber-200 via-orange-100 to-transparent opacity-15 blur-3xl" />

      {/* Soft baby icon background element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-16 opacity-5">
          <Image src="/icons/baby.png" width={400} height={400} alt="" className="blur-sm" />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Header with heart icon accent */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-2xl text-primary md:text-3xl">♡</span>
            <h2 className="text-4xl font-bold leading-tight text-secondary md:text-5xl lg:text-6xl">
              Early <span className="text-primary">hope</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-secondary/80">
            Starting treatment at <span className="font-semibold text-primary">9 months old</span>{' '}
            can transform a child&apos;s life. We believe the fight against sickle cell disease must
            begin in infancy.
          </p>
        </div>

        {/* Two-column layout: text and stats */}
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Left: Narrative text */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-secondary/90 md:text-lg">
                Every year,{' '}
                <span className="font-semibold text-primary">300,000 to 400,000 babies</span> are
                born with sickle cell disease worldwide. Eighty percent are born in Africa.
              </p>
              <p className="text-base leading-relaxed text-secondary/90 md:text-lg">
                Most organizations focus on children — but the fight must start earlier. With proper
                diagnosis and access to treatments like DREPAF®, babies as young as 9 months can
                begin receiving life-saving care.
              </p>
              <p className="text-base leading-relaxed text-secondary/90 md:text-lg">
                Cathy Guetta is personally committed to shining a light on{' '}
                <span className="font-semibold text-secondary">infants and toddlers</span> —
                children aged 1, 2, and 3 years old. Early intervention doesn&apos;t just extend
                life; it transforms futures.
              </p>
            </div>
          </div>

          {/* Right: Premium stat cards */}
          <div className="space-y-6 md:space-y-8">
            {/* Stat 1: 400K */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-200/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative rounded-2xl border border-white/40 bg-white/60 p-8 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl md:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary/60">
                  Annual births
                </p>
                <p className="mb-2 text-6xl font-bold leading-none text-primary md:text-7xl">
                  400K
                </p>
                <p className="text-base font-light text-secondary/80">
                  babies born with sickle cell disease each year worldwide
                </p>
              </div>
            </div>

            {/* Stat 2: 9 months */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-secondary/10 to-teal-200/10 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative rounded-2xl border border-white/40 bg-white/60 p-8 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl md:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary/60">
                  Earliest treatment age
                </p>
                <p className="mb-2 text-6xl font-bold leading-none text-secondary md:text-7xl">
                  9 mo.
                </p>
                <p className="text-base font-light text-secondary/80">
                  when babies can begin receiving life-saving care
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Soft divider */}
        <div className="mt-16 flex justify-center opacity-20 md:mt-20">
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
            <path
              d="M30 0C20 0 10 12 0 12M30 0C40 0 50 12 60 12"
              stroke="currentColor"
              strokeWidth="2"
              className="text-secondary"
            />
          </svg>
        </div>
      </div>
    </Section>
  );
};

export default BabiesSection;
