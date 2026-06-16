// PostHog analytics — install `posthog-js` and uncomment when connecting analytics
// import { PostHog } from 'posthog-js';
//
// export const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
//   host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
// });

export function getPostHog() {
  if (typeof window !== 'undefined') {
    // return posthog;
    return null;
  }
  return null;
}
