'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('Global error:', error)
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          background: '#07080F',
          color: '#E8E9EF',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '16px',
              fontFamily: 'Georgia, serif'
            }}>
              Error
            </div>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#7A8299',
              marginBottom: '32px'
            }}>
              Something went wrong. The signal is temporarily unavailable.
            </p>
            <button
              onClick={reset}
              style={{
                background: '#D42535',
                color: '#FFFFFF',
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '16px 32px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
