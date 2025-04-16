'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from './Button';
import { APP_ROUTES, classNames, motionConfig, useIsMobile } from '@/common';
import Image from 'next/image';

const ANIMATION_DELAY = 0.2;
const { containerVariants, itemVariants, defaultViewport } = motionConfig;

export default function Header() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [hasScrolledButton, setHasScrolledButton] = useState(false);
  const prevY = React.useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (hasScrolledButton) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [hasScrolledButton]);

  useMotionValueEvent(scrollY, 'change', y => {
    if (!isMounted) return;

    const newDirection = y > prevY.current ? 'down' : 'up';
    setScrollDirection(newDirection);
    setHasScrolledButton(y > window.innerHeight * 0.6);
    prevY.current = y;
  });

  const logoAnimation = useCallback(() => {
    if (!isMounted || !isMobile) return {};

    const transition = {
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        delay: scrollDirection === 'down' || !hasScrolledButton ? 0 : ANIMATION_DELAY,
      },
    };
    if (hasScrolledButton)
      return {
        left: 0,
        x: 0,
        ...transition,
      };
    return {
      left: '50%',
      x: '-50%',
      ...transition,
    };
  }, [isMounted, isMobile, scrollDirection, hasScrolledButton]);

  if (!isMounted) return;

  return (
    <header
      className={classNames(
        'fixed left-0 right-0 top-0 z-50 bg-primary py-4',
        hasScrolledButton && 'shadow-md'
      )}
    >
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={defaultViewport}
      >
        <motion.div className="relative flex items-center justify-between">
          <motion.div
            className={classNames(
              'logo-header',
              hasScrolledButton && 'cursor-pointer transition-opacity hover:opacity-80'
            )}
            layout="position"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleLogoClick()}
            animate={{ ...logoAnimation(), ...itemVariants }}
          >
            <Image
              height={100}
              width={240}
              src="/logo.svg"
              alt="ISC Fund"
              className={classNames('w-60 md:w-40', hasScrolledButton && 'w-40')}
              priority
            />
          </motion.div>

          {isMobile !== null && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: hasScrolledButton ? 1 : 0,
                y: hasScrolledButton ? 0 : -20,
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 20,
                delay: isMobile ? (scrollDirection === 'down' ? ANIMATION_DELAY + 0.1 : 0) : 0,
              }}
              className="flex-shrink-0"
            >
              <Button
                href={APP_ROUTES.donation.path}
                size={isMobile ? 'sm' : 'md'}
                className="whitespace-nowrap font-bold"
              >
                Donate now
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
}
