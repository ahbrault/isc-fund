import { validateEnv } from '@/common';

// Valider les variables d'environnement au démarrage
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
};

module.exports = nextConfig;
