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
        sign: ['var(--font-sign-painter)', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
