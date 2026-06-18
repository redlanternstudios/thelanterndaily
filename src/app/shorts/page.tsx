'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import SubscribeForm from '@/components/SubscribeForm'
import type { Short } from '@/lib/types'
import { getShorts } from '@/lib/supabase-queries'
import { formatDate } from '@/lib/utils'

export default function ShortsPage() {
  const [shorts, setShorts] = useState<Short[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  const loadShorts = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const data = await getShorts(page, 10)
      if (data.length === 0) {
        setHasMore(false)
      } else {
        setShorts((prev) => [...prev, ...data])
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      console.error('Error loading shorts:', err)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  useEffect(() => {
    loadShorts()
  }, [])

  useEffect(() => {
    const el = loaderRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadShorts()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadShorts, hasMore, loading])

  return (
    <div>
      <div className="px-6 md:px-12 pt-12 pb-6" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-[10px] mb-4" style={{color: 'var(--red)'}}>
          <span className="w-6 h-px" style={{background: 'var(--red)'}} />
          Shorts
        </div>
        <h1 className="font-serif text-[36px] md:text-[48px] font-black text-white leading-[1.1]">
          Quick Signals
        </h1>
        <p className="text-[15px] leading-[1.6] mt-3 max-w-lg" style={{color: 'var(--muted)'}}>
          Bite-sized intelligence. Always free. Always signal.
        </p>
      </div>

      <div className="px-6 md:px-12 py-8 max-w-2xl mx-auto">
        {shorts.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="font-serif text-2xl text-white mb-3">No shorts yet</div>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Quick signals will appear here once published.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {shorts.map((short, index) => {
              const showCta = (index + 1) % 5 === 0

              return (
                <div key={short.id}>
                  <div className="py-6" style={{borderBottom: '1px solid var(--border)'}}>
                    <div className="flex items-center gap-3 mb-3">
                      {short.tag && (
                        <span className="font-mono text-[8px] tracking-[0.1em] uppercase px-[7px] py-[2px] border" style={{color: 'var(--muted)', borderColor: 'var(--border-bright)'}}>
                          {short.tag}
                        </span>
                      )}
                      <span className="font-mono text-[8px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>
                        {formatDate(short.published_at)}
                      </span>
                    </div>
                    <h3 className="font-serif text-[20px] font-bold leading-[1.3] text-white mb-2">
                      {short.title}
                    </h3>
                    <p className="text-[14px] leading-[1.8]" style={{color: 'var(--muted)'}}>
                      {short.body}
                    </p>
                  </div>

                  {showCta && (
                    <div className="py-8 px-6 my-4" style={{
                      border: '1px solid var(--red-border)',
                      background: 'var(--red-dim)'
                    }}>
                      <div className="font-serif text-[18px] font-bold text-white mb-3 text-center">
                        Getting value from these shorts?
                      </div>
                      <p className="text-[13px] text-center mb-4" style={{color: 'var(--muted)'}}>
                        Get the full daily brief delivered to your inbox.
                      </p>
                      <SubscribeForm variant="inline" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div ref={loaderRef} className="py-8 text-center">
          {loading && (
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>
              Loading more signals…
            </div>
          )}
          {!hasMore && shorts.length > 0 && (
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>
              — All signals loaded —
            </div>
          )}
        </div>
      </div>
    </div>
  )
}