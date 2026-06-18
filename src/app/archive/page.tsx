'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import IssueCard from '@/components/IssueCard'
import type { Issue } from '@/lib/types'
import { getIssues } from '@/lib/supabase-queries'

function ArchiveContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [issues, setIssues] = useState<Issue[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const currentTier = searchParams.get('tier') || 'all'
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const perPage = 12
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  const fetchIssues = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getIssues(currentTier === 'all' ? undefined : currentTier, currentPage, perPage)
      setIssues(result.issues)
      setTotal(result.total)
    } catch (err) {
      console.error('Error fetching archive:', err)
    } finally {
      setLoading(false)
    }
  }, [currentTier, currentPage])

  useEffect(() => {
    fetchIssues()
  }, [fetchIssues])

  const setFilter = (tier: string) => {
    const params = new URLSearchParams()
    if (tier !== 'all') params.set('tier', tier)
    params.set('page', '1')
    router.push(`/archive?${params.toString()}`)
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams()
    if (currentTier !== 'all') params.set('tier', currentTier)
    params.set('page', String(page))
    router.push(`/archive?${params.toString()}`)
  }

  const filters = ['all', 'free', 'paid']

  return (
    <div>
      <div className="px-6 md:px-12 pt-12 pb-6" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-[10px] mb-4" style={{color: 'var(--red)'}}>
          <span className="w-6 h-px" style={{background: 'var(--red)'}} />
          Intelligence Archive
        </div>
        <h1 className="font-serif text-[36px] md:text-[48px] font-black text-white leading-[1.1]">
          All Signals
        </h1>
      </div>

      <div className="px-6 md:px-12 py-4 flex gap-4" style={{borderBottom: '1px solid var(--border)'}}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2 border bg-transparent cursor-pointer transition-all ${
              currentTier === f
                ? 'text-white border-[var(--red)]'
                : 'text-[var(--muted)] border-[var(--border)] hover:text-white'
            }`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="flex-1 text-right font-mono text-[9px] tracking-[0.1em] uppercase self-center" style={{color: 'var(--dim)'}}>
          {total} signals
        </span>
      </div>

      <div className="px-6 md:px-12 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[240px] animate-pulse" style={{background: 'var(--bg-card)'}} />
            ))}
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-serif text-2xl text-white mb-3">No signals yet</div>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Signals will appear here once published.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  slug={issue.slug}
                  title={issue.title}
                  excerpt={issue.excerpt}
                  date={issue.date}
                  category={issue.category}
                  tier={issue.tier}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase px-4 py-2 border bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
                  style={{color: 'var(--muted)', borderColor: 'var(--border)'}}
                >
                  ← Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`font-mono text-[10px] px-3 py-1 border bg-transparent cursor-pointer transition-all ${
                          currentPage === pageNum
                            ? 'text-white border-[var(--red)]'
                            : 'text-[var(--muted)] border-transparent hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase px-4 py-2 border bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
                  style={{color: 'var(--muted)', borderColor: 'var(--border)'}}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function ArchivePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-mono text-sm" style={{color: 'var(--muted)'}}>Loading…</div>
      </div>
    }>
      <ArchiveContent />
    </Suspense>
  )
}
