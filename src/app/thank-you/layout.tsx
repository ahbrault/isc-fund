import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your generous contribution to ISC Fund.',
  robots: 'noindex, nofollow',
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
