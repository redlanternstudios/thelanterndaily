'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import PremiumGate from '@/components/PremiumGate'
import type { Issue } from '@/lib/types'
import { getIssueBySlug } from '@/lib/supabase-queries'
import { formatDate } from '@/lib/utils'

export default function IssuePage() {
  const params = useParams()
  const slug = params.slug as string
  const [issue, setIssue] = useState<Issue | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getIssueBySlug(slug)
        if (!data) {
          setError('Issue not found')
        } else {
          setIssue(data)
        }
      } catch (err) {
        setError('Failed to load issue')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-mono text-sm" style={{color: 'var(--muted)'}}>Loading…</div>
      </div>
    )
  }

  if (error || !issue) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="font-serif text-3xl font-bold text-white mb-4">Signal Not Found</div>
          <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
            {error || 'This issue could not be found. It may have been removed or the link is incorrect.'}
          </p>
          <Link
            href="/archive"
            className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--red)] no-underline hover:text-white transition-colors"
          >
            ← Back to Archive
          </Link>
        </div>
      </div>
    )
  }

  const isPremium = issue.tier === 'paid'

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
      {/* Back link */}
      <Link
        href="/archive"
        className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline mb-8 inline-block hover:text-white transition-colors"
        style={{color: 'var(--muted)'}}
      >
        ← Back to Archive
      </Link>

      {/* Issue header */}
      <div className="mb-10 pb-8" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`font-mono text-[8px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] border ${
              isPremium
                ? 'text-[var(--red)] border-[var(--red-border)]'
                : 'text-[var(--muted)] border-[var(--dim)]'
            }`}
          >
            {isPremium ? 'Premium' : 'Free'}
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>
            Issue #{issue.issue_number}
          </span>
        </div>

        <h1 className="font-serif text-[36px] md:text-[48px] font-black text-white leading-[1.1] mb-4">
          {issue.title}
        </h1>

        {issue.category && (
          <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-3" style={{color: 'var(--red)'}}>
            {issue.category}
          </div>
        )}

        <div className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>
          {formatDate(issue.published_at)}
        </div>
      </div>

      {/* Issue body */}
      {isPremium ? (
        <PremiumGate previewWords={200}>
          <div
            className="text-[15px] leading-[1.8] space-y-4"
            style={{color: 'var(--muted)'}}
            dangerouslySetInnerHTML={{ __html: issue.body }}
          />
        </PremiumGate>
      ) : (
        <div
          className="text-[15px] leading-[1.8] space-y-4"
          style={{color: 'var(--muted)'}}
          dangerouslySetInnerHTML={{ __html: issue.body }}
        />
      )}

      {/* Related / Navigation */}
      <div className="mt-16 pt-8" style={{borderTop: '1px solid var(--border)'}}>
        <Link
          href="/archive"
          className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase no-underline hover:text-white transition-colors"
          style={{color: 'var(--muted)'}}
        >
          ← Back to Archive
        </Link>
      </div>
    </div>
  )
}
