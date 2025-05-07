import { StripeElementsOptions } from '@stripe/stripe-js';

export const getStripeOptions = (clientSecret: string): StripeElementsOptions => {
  return {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4f46e5',
        fontFamily: '"Cabin", "Inter", system-ui, sans-serif',
        borderRadius: '6px',
      },
      rules: {
        '.Input--selected': {
          borderColor: '#e5e7eb',
          boxShadow:
            '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
        },
      },
    },
  };
};
