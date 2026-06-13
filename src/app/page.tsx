'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import IssueCard from '@/components/IssueCard'
import type { Issue, Short } from '@/lib/types'
import { getSubscriberCount, getRecentIssues, getRecentShorts } from '@/lib/supabase-queries'

export default function HomePage() {
  const [operatorCount, setOperatorCount] = useState(247)
  const [issues, setIssues] = useState<Issue[]>([])
  const [shorts, setShorts] = useState<Short[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [count, recentIssues, recentShorts] = await Promise.all([
          getSubscriberCount(),
          getRecentIssues(6),
          getRecentShorts(3),
        ])
        setOperatorCount(count)
        setIssues(recentIssues)
        setShorts(recentShorts)
      } catch (err) {
        console.error('Failed to load homepage data:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 md:px-12 py-20 md:py-[80px] border-b grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center overflow-hidden" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(212,37,53,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(30,20,80,0.15) 0%, transparent 50%)'
        }} />

        <div>
          <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-[10px]" style={{color: 'var(--red)'}}>
            <span className="w-6 h-px" style={{background: 'var(--red)'}} />
            Muslim-Built. AI-Native.
          </div>
          <h1 className="font-serif font-black leading-[1.0] mb-6 text-white" style={{fontSize: 'clamp(36px, 8vw, 60px)', letterSpacing: '-0.02em'}}>
            Signal<br />
            <em className="italic not-italic" style={{color: 'var(--off-white)'}}>before</em><br />
            consensus.
          </h1>
          <p className="text-[16px] font-light leading-[1.7] max-w-[440px] mb-9" style={{color: 'var(--muted)'}}>
            The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <SubscribeForm variant="hero" />
            <Link href="/#signals" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase no-underline flex items-center gap-2 transition-colors hover:text-white" style={{color: 'var(--muted)'}}>
              Today&apos;s signal
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex gap-8 mt-10 pt-8" style={{borderTop: '1px solid var(--border)'}}>
            <div>
              <div className="font-mono text-[28px] font-bold leading-none mb-1 text-white">
                <span style={{color: 'var(--red)'}}>{operatorCount}</span>
              </div>
              <div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{color: 'var(--muted)'}}>Operators</div>
            </div>
            <div>
              <div className="font-mono text-[28px] font-bold leading-none mb-1 text-white">{String(issues.length).padStart(2, '0')}</div>
              <div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{color: 'var(--muted)'}}>Signals</div>
            </div>
            <div>
              <div className="font-mono text-[28px] font-bold leading-none mb-1 text-white">01</div>
              <div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{color: 'var(--muted)'}}>Brief</div>
            </div>
          </div>
        </div>

        <div className="hidden md:block relative border overflow-hidden transition-colors cursor-pointer group" style={{borderColor: 'var(--border-bright)'}}>
          <div className="h-[280px] relative overflow-hidden">
            <div className="w-full h-full transition-transform duration-600 group-hover:scale-103 relative" style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(212,37,53,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(50,30,100,0.4) 0%, transparent 40%), linear-gradient(135deg, #0A0818 0%, #1A1040 30%, #0F0820 60%, #080510 100%)'
            }}>
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(212,37,53,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,37,53,0.08) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            <span className="absolute top-5 left-5 z-[2] bg-[var(--red)] font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-white px-[10px] py-[5px]">
              Today&apos;s Lead
            </span>
          </div>
          <div className="p-7" style={{background: 'var(--bg-card)'}}>
            <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-[10px]" style={{color: 'var(--red)'}}>
              AI Governance · Signal
            </div>
            <h3 className="font-serif text-[22px] font-bold leading-[1.3] text-white mb-[10px]">
              Agent Governance Is the New Product Layer
            </h3>
            <p className="text-[13px] leading-[1.6] mb-5" style={{color: 'var(--muted)'}}>
              The teams that build governance infrastructure now will own the trust layer that determines which AI products survive the next 18 months.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>Jun 13 · Issue #007</span>
              <Link href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline flex items-center gap-[6px]" style={{color: 'var(--red)'}}>
                Read signal <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between px-6 md:px-12 pt-10 pb-6">
        <div className="flex items-center gap-[14px]">
          <div className="w-10 h-px" style={{background: 'var(--border-bright)'}} />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase" style={{color: 'var(--muted)'}}>Live Intelligence Wall</span>
        </div>
        <Link href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline flex items-center gap-[6px] hover:text-white transition-colors" style={{color: 'var(--muted)'}}>
          View all signals <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{
          border: '1px solid var(--border)',
          gap: '1px',
          background: 'var(--border)'
        }}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[340px] animate-pulse" style={{background: 'var(--bg-card)'}} />
            ))
          ) : issues.length > 0 ? (
            issues.slice(0, 6).map((issue) => (
              <IssueCard key={issue.id} issue={issue} variant="wall" />
            ))
          ) : (
            <>
              <StaticWallCard href="/archive" category="AI Systems" title="Memory, Agents, Architecture" issue="#012" tier="free" gradient="radial-gradient(circle at 50% 30%, rgba(30,60,200,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(100,30,200,0.2) 0%, transparent 40%), linear-gradient(160deg, #060A1F 0%, #0D1235 50%, #06080F 100%)" />
              <StaticWallCard href="/archive" category="Product Calls" title="What Operators Are Actually Shipping" issue="#009" tier="paid" gradient="radial-gradient(circle at 40% 50%, rgba(212,37,53,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(200,60,20,0.15) 0%, transparent 40%), linear-gradient(160deg, #150808 0%, #220D0D 50%, #0F0606 100%)" />
              <StaticWallCard href="/archive" category="Operator Stack" title="Tools the Serious Builders Use" issue="#011" tier="free" gradient="radial-gradient(circle at 60% 40%, rgba(20,120,80,0.2) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(10,80,60,0.15) 0%, transparent 40%), linear-gradient(160deg, #060F0A 0%, #0A1A10 50%, #050A07 100%)" />
              <StaticWallCard href="/archive" category="Field Notes" title="From the Ground in Muslim Tech" issue="#008" tier="free" gradient="radial-gradient(circle at 30% 60%, rgba(200,169,110,0.15) 0%, transparent 60%), linear-gradient(160deg, #130F06 0%, #1E1608 50%, #0A0905 100%)" />
              <StaticWallCard href="/archive" category="Governance" title="Who Controls the Control Layer" issue="#010" tier="paid" gradient="radial-gradient(circle at 50% 50%, rgba(212,37,53,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(80,10,30,0.2) 0%, transparent 40%), linear-gradient(160deg, #0F0608 0%, #1A080C 50%, #0A0507 100%)" />
              <StaticWallCard href="/archive" category="Market Signal" title="Halal Finance Meets AI Infrastructure" issue="#007" tier="paid" gradient="radial-gradient(circle at 70% 50%, rgba(50,120,200,0.2) 0%, transparent 60%), radial-gradient(circle at 30% 30%, rgba(100,160,220,0.1) 0%, transparent 40%), linear-gradient(160deg, #060C14 0%, #0A1520 50%, #06080F 100%)" />
            </>
          )}
        </div>
      </div>

      <div id="signals" className="flex items-center justify-between px-6 md:px-12 pt-6 pb-6">
        <div className="flex items-center gap-[14px]">
          <div className="w-10 h-px" style={{background: 'var(--border-bright)'}} />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase" style={{color: 'var(--muted)'}}>Recent Signals</span>
        </div>
        <Link href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline flex items-center gap-[6px] hover:text-white transition-colors" style={{color: 'var(--muted)'}}>
          Full archive <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="px-6 md:px-12 pb-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16" style={{borderBottom: '1px solid var(--border)'}}>
        <div>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-24 mb-4" style={{background: 'var(--bg-card)'}} />
            ))
          ) : issues.length > 0 ? (
            issues.slice(0, 3).map((issue) => (
              <IssueCard key={issue.id} issue={issue} variant="list" />
            ))
          ) : (
            <>
              <StaticSignalItem number="01" category="AI Systems" title="Why Every Serious Operator Is Building a Memory Layer Now" excerpt="The difference between a demo and a product isn't the model. It's whether the system remembers what happened last time." date="Jun 12, 2026" tag="Free" />
              <StaticSignalItem number="02" category="Field Notes" title="What the Alif Summit Said About Where Muslim Tech Is Going" excerpt="Three patterns from the room that don't show up in the coverage." date="Jun 11, 2026" tag="Premium" />
              <StaticSignalItem number="03" category="Operator Stack" title="The Real Self-Hosted Stack: n8n on Railway, Supabase, and Why Make.com Doesn't Scale" excerpt="What serious Muslim builders are actually running under the hood." date="Jun 10, 2026" tag="Free" />
            </>
          )}
        </div>

        <div>
          <div className="mb-6 p-6" style={{border: '1px solid var(--red-border)', background: 'var(--red-dim)'}}>
            <div className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase mb-3" style={{color: 'var(--red)'}}>Become an Operator</div>
            <div className="font-mono text-[40px] font-bold leading-none mb-2 text-white">#{String(operatorCount + 1).padStart(4, '0')}</div>
            <p className="text-[12px] leading-[1.5]" style={{color: 'var(--muted)'}}>Join {operatorCount} Muslim builders, founders, and operators getting signal before consensus.</p>
            <Link href="/#subscribe" className="block mt-4 bg-[var(--red)] text-white font-mono text-[9px] font-bold tracking-[0.12em] uppercase py-[11px] text-center no-underline">Claim Your Number</Link>
          </div>
          <div className="p-5 border mb-4" style={{borderColor: 'var(--border)'}}>
            <div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase pb-3 mb-4" style={{color: 'var(--muted)', borderBottom: '1px solid var(--border)'}}>Intelligence by Category</div>
            <CategoryRow name="AI Systems" count={12} />
            <CategoryRow name="Governance" count={8} />
            <CategoryRow name="Market Signal" count={7} />
            <CategoryRow name="Field Notes" count={6} />
            <CategoryRow name="Operator Stack" count={5} />
          </div>
        </div>
      </div>

      <section id="subscribe" className="relative px-6 md:px-12 py-20 text-center overflow-hidden" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(212,37,53,0.08) 0%, transparent 60%)'}} />
        <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{color: 'var(--red)'}}>Signal Before Consensus</div>
        <h2 className="font-serif font-black leading-[1.1] mb-4 text-white max-w-[600px] mx-auto" style={{fontSize: 'clamp(32px, 6vw, 48px)'}}>
          Built for the operators who don&apos;t wait for permission.
        </h2>
        <p className="text-[15px] leading-[1.6] max-w-[480px] mx-auto mb-9" style={{color: 'var(--muted)'}}>
          The Lantern Daily is the intelligence brief for Muslim founders, builders, and operators in AI and halal tech. Free to start. Serious when you&apos;re ready.
        </p>
        <SubscribeForm variant="section" buttonText="Get the Daily" />
        <div className="font-mono text-[9px] tracking-[0.1em] uppercase mt-4" style={{color: 'var(--dim)'}}>
          Free · No spam · Unsubscribe anytime · Operator number assigned on join
        </div>
      </section>
    </>
  )
}

function StaticWallCard({ href, category, title, issue, tier, gradient }: { href: string; category: string; title: string; issue: string; tier: 'free' | 'paid'; gradient: string }) {
  return (
    <Link href={href} className="block no-underline group relative overflow-hidden cursor-pointer" style={{borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)'}}>
      <div className="h-[200px] relative overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-104 relative" style={{background: gradient}}>
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
          <div className="absolute top-4 right-4 flex gap-1 z-[2]">
            <span className="w-[5px] h-[5px] rounded-full" style={{background: 'var(--red)', opacity: 0.8}} />
            <span className="w-[5px] h-[5px] rounded-full" style={{background: 'var(--red)', opacity: 0.4}} />
            <span className="w-[5px] h-[5px] rounded-full" style={{background: 'var(--red)', opacity: 0.2}} />
          </div>
        </div>
      </div>
      <div className="p-5" style={{background: 'var(--bg-card)', borderTop: '1px solid var(--border)'}}>
        <div className="group-hover:bg-[var(--bg-card-hover)] -m-5 p-5">
          <div className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2" style={{color: 'var(--red)'}}>
            <span style={{width: 12, height: 1, background: 'var(--red)'}} />{category}
          </div>
          <div className="font-serif text-[16px] font-bold leading-[1.3] mb-2 transition-colors group-hover:text-white" style={{color: 'var(--off-white)'}}>{title}</div>
          <div className="flex items-center justify-between mt-[14px]">
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>{issue}</span>
            <span className={`font-mono text-[8px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] border ${tier === 'paid' ? 'text-[var(--red)] border-[var(--red-border)]' : 'text-[var(--muted)] border-[var(--dim)]'}`}>{tier === 'paid' ? 'Premium' : 'Free'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function StaticSignalItem({ number, category, title, excerpt, date, tag }: { number: string; category: string; title: string; excerpt: string; date: string; tag: string }) {
  return (
    <Link href="/archive" className="flex gap-6 py-6 border-b no-underline transition-all duration-200 group" style={{borderBottom: '1px solid var(--border)'}}>
      <span className="font-mono text-[11px] font-bold min-w-[24px] pt-[3px]" style={{color: 'var(--dim)'}}>{number}</span>
      <div className="flex-1">
        <div className="font-mono text-[8px] font-bold tracking-[0.15em] uppercase mb-[6px]" style={{color: 'var(--red)'}}>{category}</div>
        <div className="font-serif text-[18px] font-semibold leading-[1.3] mb-2 transition-colors group-hover:text-white" style={{color: 'var(--off-white)'}}>{title}</div>
        <p className="text-[13px] leading-[1.6] mb-3" style={{color: 'var(--muted)'}}>{excerpt}</p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[8px] tracking-[0.1em] uppercase" style={{color: 'var(--dim)'}}>{date}</span>
          <span className="font-mono text-[8px] tracking-[0.1em] uppercase px-[7px] py-[2px] border" style={{color: 'var(--muted)', borderColor: 'var(--border-bright)'}}>{tag}</span>
        </div>
      </div>
    </Link>
  )
}

function CategoryRow({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center justify-between py-[10px]" style={{borderBottom: '1px solid var(--border)'}}>
      <span className="text-[12px]" style={{color: 'var(--off-white)'}}>{name}</span>
      <span className="font-mono text-[9px]" style={{color: 'var(--dim)'}}>{count} signals</span>
    </div>
  )
}