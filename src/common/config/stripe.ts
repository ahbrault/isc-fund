import Stripe from 'stripe';

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
export const stripe = new Stripe(
  'sk_test_51RES5jF0EE8n8UBRhB1ZtJNWXmeP3zcTmKQ168XgcZx7OWYNdzqc8wyLtMzBt2YzawgUUFGhm3pzMZscSCScTJd200JUZq8QMX',
  {
    apiVersion: '2025-03-31.basil',
  }
);
