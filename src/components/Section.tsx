import React from 'react';

import { classNames } from '@/common';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  id?: string;
};

export default function Section({ children, className = '', backgroundColor, id }: SectionProps) {
  const hasPaddingClass = /\b(p[ytb]-\d+)\b/.test(className);

  return (
    <section id={id ? `${id}-section` : ''} className={backgroundColor}>
      <div className={classNames('container', className, !hasPaddingClass && 'py-16 md:py-20')}>
        {children}
      </div>
    </section>
  );
}
