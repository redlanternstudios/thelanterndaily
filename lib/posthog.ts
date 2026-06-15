// PostHog client — uncomment and install posthog-js when ready for analytics
// import { PostHog } from 'posthog-js'

export function createPostHogClient() {
  return null
  /* Uncomment when posthog-js is installed
  if (typeof window === 'undefined') return null
  
  const posthog = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY!,
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      loaded: (ph) => {
        if (process.env.NODE_ENV !== 'production') ph.opt_out_capturing()
      },
    }
  )
  
  return posthog
  */
}
