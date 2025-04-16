import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function classNames(...args: any[]) {
  return twMerge(clsx(...args));
}
