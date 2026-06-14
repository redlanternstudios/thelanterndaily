<<<<<<< HEAD
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SectionDivider from "@/components/SectionDivider";
import Hero from "@/components/home/Hero";
import SecondRow from "@/components/home/SecondRow";
import PullQuote from "@/components/home/PullQuote";
import SignalsAndStack from "@/components/home/SignalsAndStack";
import SubscribeCTA from "@/components/home/SubscribeCTA";
import { GRID_ARTICLES } from "@/lib/content";
=======
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import IssueCard from '@/components/IssueCard'
import type { Issue, Short } from '@/lib/types'
import { getSubscriberCount, getRecentIssues, getRecentShorts } from '@/lib/supabase-queries'
>>>>>>> origin/main

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
<<<<<<< HEAD
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-12 sm:gap-16">
          <Hero />
          <SecondRow />

          <section>
            <SectionDivider label="Latest Dispatches" href="/archive" />
            <div className="mt-0.5 grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
              {GRID_ARTICLES.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <PullQuote />
          <SignalsAndStack />
          <SubscribeCTA />
=======
      {/* HERO */}
      <section className="relative px-6 md:px-12 py-20 md:py-[80px] border-b grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center overflow-hidden" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at 60% 50%, rgba(212,37,53,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(30,20,80,0.15) 0%, transparent 50%)'}} />
        <div>
          <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-[10px]" style={{color:'var(--red)'}}><span className="w-6 h-px" style={{background:'var(--red)'}} />Muslim-Built. AI-Native.</div>
          <h1 className="font-serif font-black leading-[1.0] mb-6 text-white" style={{fontSize:'clamp(36px,8vw,60px)',letterSpacing:'-0.02em'}}>Signal<br /><em className="italic not-italic" style={{color:'var(--off-white)'}}>before</em><br />consensus.</h1>
          <p className="text-[16px] font-light leading-[1.7] max-w-[440px] mb-9" style={{color:'var(--muted)'}}>The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <SubscribeForm variant="hero" />
            <Link href="/#signals" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase no-underline flex items-center gap-2 transition-colors hover:text-white" style={{color:'var(--muted)'}}>Today&apos;s signal<span aria-hidden="true">→</span></Link>
          </div>
          <div className="flex gap-8 mt-10 pt-8" style={{borderTop:'1px solid var(--border)'}}>
            <div><div className="font-mono text-[28px] font-bold leading-none mb-1 text-white"><span style={{color:'var(--red)'}}>{operatorCount}</span></div><div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{color:'var(--muted)'}}>Operators</div></div>
            <div><div className="font-mono text-[28px] font-bold leading-none mb-1 text-white">{String(issues.length).padStart(2,'0')}</div><div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{color:'var(--muted)'}}>Signals</div></div>
            <div><div className="font-mono text-[28px] font-bold leading-none mb-1 text-white">01</div><div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{color:'var(--muted)'}}>Brief</div></div>
          </div>
>>>>>>> origin/main
        </div>
        <div className="hidden md:block relative border overflow-hidden transition-colors cursor-pointer group" style={{borderColor:'var(--border-bright)'}}>
          <div className="h-[280px] relative overflow-hidden"><div className="w-full h-full transition-transform duration-600 group-hover:scale-103 relative" style={{background:'radial-gradient(circle at 30% 40%, rgba(212,37,53,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(50,30,100,0.4) 0%, transparent 40%), linear-gradient(135deg, #0A0818 0%, #1A1040 30%, #0F0820 60%, #080510 100%)'}}><div className="absolute inset-0" style={{backgroundImage:'linear-gradient(rgba(212,37,53,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,37,53,0.08) 1px, transparent 1px)',backgroundSize:'30px 30px'}} /></div><span className="absolute top-5 left-5 z-[2] bg-[var(--red)] font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-white px-[10px] py-[5px]">Today&apos;s Lead</span></div>
          <div className="p-7" style={{background:'var(--bg-card)'}}>
            <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-[10px]" style={{color:'var(--red)'}}>AI Governance · Signal</div>
            <h3 className="font-serif text-[22px] font-bold leading-[1.3] text-white mb-[10px]">Agent Governance Is the New Product Layer</h3>
            <p className="text-[13px] leading-[1.6] mb-5" style={{color:'var(--muted)'}}>The teams that build governance infrastructure now will own the trust layer that determines which AI products survive the next 18 months.</p>
            <div className="flex items-center justify-between"><span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{color:'var(--dim)'}}>Jun 13 · Issue #007</span><Link href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline flex items-center gap-[6px]" style={{color:'var(--red)'}}>Read signal <span aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
      {/* INTELLIGENCE WALL - truncated for brevity - full content on GitHub */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-10 pb-6"><div className="flex items-center gap-[14px]"><div className="w-10 h-px" style={{background:'var(--border-bright)'}} /><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase" style={{color:'var(--muted)'}}>Live Intelligence Wall</span></div><Link href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline flex items-center gap-[6px] hover:text-white transition-colors" style={{color:'var(--muted)'}}>View all signals <span aria-hidden="true">→</span></Link></div>
    </>
  )
}