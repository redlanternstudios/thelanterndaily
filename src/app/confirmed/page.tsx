'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import OperatorNumber from '@/components/OperatorNumber'
import SharePrompt from '@/components/SharePrompt'
import Link from 'next/link'

function ConfirmedContent() {
  const searchParams = useSearchParams()
  const operatorNumber = searchParams.get('operator') || '0000'

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-8" style={{color: 'var(--red)'}}>
          Signal Confirmed
        </div>

        <div className="mb-6 flex justify-center">
          <OperatorNumber number={operatorNumber} />
        </div>

        <h1 className="font-serif text-[28px] md:text-[36px] font-black text-white leading-[1.1] mb-4">
          Welcome to The Lantern.
        </h1>
        <p className="text-[16px] leading-[1.7] mb-8" style={{color: 'var(--muted)'}}>
          Your signal is confirmed. You&apos;re now Operator <strong className="text-white">#{operatorNumber}</strong> among Muslim builders, founders, and operators who don&apos;t wait for consensus.
        </p>

        <div className="mb-10">
          <SharePrompt operatorNumber={operatorNumber} />
        </div>

        <div className="p-6 mb-8" style={{
          border: '1px solid var(--red-border)',
          background: 'var(--red-dim)'
        }}>
          <div className="font-serif text-[16px] font-bold text-white mb-2">
            Unlock the Weekly Brief
          </div>
          <p className="text-[12px] leading-[1.5] mb-4" style={{color: 'var(--muted)'}}>
            Free subscribers get daily signals. Premium operators get the full Weekly Brief, all signals, and the intelligence archive.
          </p>
          <div className="font-mono text-[22px] font-bold text-white mb-1">
            $15 <span className="text-sm" style={{color: 'var(--muted)'}}>/ month</span>
          </div>
          <Link href="/#subscribe" className="block w-full bg-[var(--red)] text-white font-mono text-[9px] font-bold tracking-[0.12em] uppercase py-3 text-center no-underline mt-4">
            Upgrade Now
          </Link>
        </div>

        <Link href="/" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase no-underline hover:text-white transition-colors" style={{color: 'var(--muted)'}}>
          ← Back to The Lantern
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="font-mono text-sm" style={{color: 'var(--muted)'}}>Loading…</div>
      </div>
    }>
      <ConfirmedContent />
    </Suspense>
  )
}