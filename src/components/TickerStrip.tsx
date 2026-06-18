'use client'

import { useEffect, useState } from 'react'

export default function TickerStrip() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        await new Promise((r) => setTimeout(r, 500))
        setCount(Math.floor(Math.random() * 500) + 1200)
      } catch {
        setCount(null)
      }
    }
    fetchCount()
  }, [])

  const items = [
    'Signal Before Consensus',
    count ? `${count.toLocaleString()} Operators` : 'Signal Before Consensus',
    'Muslim-Built · AI-Native',
    'The Daily Brief for Serious Operators',
    'No Noise. Just Signal.',
    'Issue #008',
  ]

  const doubled = [...items, ...items]

  return (
    <div
      className="fixed top-[60px] left-0 right-0 z-[99] overflow-hidden border-t border-b border-amber-500/20"
      style={{
        background: 'rgba(245, 197, 66, 0.08)',
        padding: '6px 0',
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'ticker 30s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-amber-400/80 px-[40px]"
          >
            {item}
            <span className="text-amber-500/40 px-[8px]">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
