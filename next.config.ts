import { validateEnv } from '@/common';

try {
  validateEnv();
} catch (error) {
  console.error('\n', error);
  process.exit(1);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['framer-motion'],
  // This will prevent Vercel from issuing redirects on your API routes.
  trailingSlash: false,
};

module.exports = nextConfig;
