'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { styles } from './styles';
import { ButtonProps, LinkButtonProps, RegularButtonProps } from './Button.types';
import { classNames } from '@/common';

type RefType = HTMLButtonElement | HTMLAnchorElement;

const isLink = (props: ButtonProps): props is LinkButtonProps => 'href' in props;

const Button = forwardRef<RefType, ButtonProps>((props, ref) => {
  const { variant = 'primary', size = 'md', className, disabled, styled = true, ...rest } = props;

  const combinedClasses = classNames(
    styled
      ? [
          styles.base,
          styles.variants[variant],
          styles.sizes[size],
          {
            [styles.disabled]: disabled,
          },
          className,
        ]
      : [className]
  );

  if (isLink(rest)) {
    const { href, onClick, children, ...anchorProps } = rest;

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
      if (!disabled) {
        if (onClick) onClick(e);
      }
    };

    // Déterminer l'origine en fonction de l'environnement
    const baseOrigin =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || '';
    const hrefWithUTM = new URL(href, baseOrigin);

    return (
      <Link href={hrefWithUTM.toString()} passHref legacyBehavior>
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClasses}
          onClick={handleLinkClick}
          aria-disabled={disabled}
          {...anchorProps}
        >
          <span className={styles.touchTarget} aria-hidden="true" />
          {children}
        </a>
      </Link>
    );
  }

  // Regular Button
  const { type, onClick, children, ...buttonProps } = rest as RegularButtonProps;

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (!disabled) {
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={combinedClasses}
      onClick={handleButtonClick}
      type={type || 'button'}
      disabled={disabled}
      {...buttonProps}
    >
      <span className={styles.touchTarget} aria-hidden="true" />
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
