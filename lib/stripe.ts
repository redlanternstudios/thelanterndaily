// Stripe integration — install `stripe` package and uncomment when connecting payments
// import Stripe from 'stripe';
//
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-11-20.acacia',
// });

export const PLANS = {
  free: {
    name: 'Free',
    slug: 'free',
    stripePriceId: '',
    price: 0,
  },
  monthly: {
    name: 'Monthly',
    slug: 'monthly',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY || '',
    price: 9,
  },
  annual: {
    name: 'Annual',
    slug: 'annual',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL || '',
    price: 90,
  },
} as const;
