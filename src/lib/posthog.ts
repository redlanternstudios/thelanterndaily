import posthog from 'posthog-js'

export function getPostHog() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!posthog.__loaded) {
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        loaded: (ph) => {
          if (process.env.NODE_ENV !== 'production') ph.opt_out_capturing()
        },
      }
    )
  }

  return posthog
}
