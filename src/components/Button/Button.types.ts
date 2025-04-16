import React from 'react';

export type BaseButtonProps = {
  styled?: boolean;
  variant?: keyof typeof import('./styles').styles.variants;
  size?: keyof typeof import('./styles').styles.sizes;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

// Props for a link Button
export type LinkButtonProps = BaseButtonProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'onClick' | 'children'
  >;

// Props for a regular Button
export type RegularButtonProps = BaseButtonProps & {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'onClick' | 'type' | 'children'
  >;

// Props union
export type ButtonProps = LinkButtonProps | RegularButtonProps;
