import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Cabin', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'infinite-scroll-mobile': 'infinite-scroll 80s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
