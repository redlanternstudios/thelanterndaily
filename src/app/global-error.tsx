'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-base, #07080F)' }}>
          <div className="text-center max-w-md">
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--red, #D42535)' }}>
              System Error
            </div>
            <h1 className="font-serif text-[32px] font-black leading-[1.1] mb-4" style={{ color: 'var(--white, #FFFFFF)' }}>
              Something went wrong.
            </h1>
            <p className="text-[14px] leading-[1.7] mb-8" style={{ color: 'var(--muted, #7A8299)' }}>
              Signal interrupted. The team has been notified.
            </p>
            <button
              onClick={reset}
              className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-[28px] py-[13px] border-none cursor-pointer"
              style={{ background: 'var(--red, #D42535)', color: 'var(--white, #FFFFFF)' }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}