'use client'

import Link from 'next/link'

interface PremiumGateProps {
  children: React.ReactNode
  title?: string
  description?: string
  variant?: 'default' | 'compact'
}

export default function PremiumGate({
  children,
  title = 'Unlock Premium Access',
  description = 'Premium content is locked for subscribers. Join the operator network to unlock the full stack and exclusive resources.',
  variant = 'default',
}: PremiumGateProps) {
  const isCompact = variant === 'compact'

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Content with blur overlay */}
      <div className="relative">
        <div className="filter blur-[3px] select-none pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 bg-stone-950/40" />
      </div>

      {/* Foreground lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="text-center max-w-sm transition-all duration-500 ease-out">
          {/* Lock icon */}
          <div className="mb-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/15 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
          </div>

          {!isCompact && (
            <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-3 text-amber-500">
              Premium
            </div>
          )}

          <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-stone-400 leading-relaxed mb-6">{description}</p>

          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-amber-500/25"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            {isCompact ? 'Unlock' : 'Unlock Premium Access'}
          </Link>

          {!isCompact && (
            <p className="text-[10px] font-mono text-stone-600 mt-4">
              Coming soon — payments integration in development
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
