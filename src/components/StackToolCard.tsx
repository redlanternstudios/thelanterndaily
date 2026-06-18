'use client'

import Link from 'next/link'
import type { Tool } from '@/lib/types'

interface StackToolCardProps {
  tool: Tool
  variant?: 'grid' | 'featured' | 'premium'
}

export default function StackToolCard({ tool, variant = 'grid' }: StackToolCardProps) {
  const isAffiliate = !!tool.affiliateLink
  const linkRel = isAffiliate ? 'sponsored nofollow' : 'noopener noreferrer'
  const linkTarget = '_blank'

  const cardContent = (
    <div
      className={`group relative block border transition-all duration-300 ${
        variant === 'featured'
          ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50'
          : variant === 'premium'
          ? 'border-stone-700/50 bg-stone-900/60'
          : 'border-stone-800 bg-stone-900/80 hover:border-stone-600'
      } ${variant === 'grid' ? 'rounded-lg' : 'rounded-xl'} overflow-hidden`}
    >
      {/* Premium badge */}
      {variant === 'premium' && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 font-mono text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Premium
        </div>
      )}

      {/* Affiliate badge */}
      {isAffiliate && variant !== 'premium' && (
        <span className="absolute top-3 right-3 z-10 font-mono text-[7px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded bg-amber-400/90 text-stone-950">
          Affiliate link
        </span>
      )}

      {/* Featured variant image background */}
      {variant === 'featured' && tool.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${tool.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>
      )}

      <div className="p-5">
        {/* Header: icon + name + category */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-lg font-bold shrink-0 ${
              variant === 'featured' ? 'bg-amber-500/20 text-amber-400' : 'bg-stone-800 text-stone-400'
            }`}
          >
            {tool.icon || tool.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-serif font-bold leading-tight truncate ${
                variant === 'featured' ? 'text-xl text-amber-50' : 'text-[15px] text-white'
              } group-hover:text-amber-400 transition-colors`}
            >
              {tool.name}
            </h3>
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-stone-500">
              {tool.category}
            </span>
          </div>
          <span
            className={`font-mono text-[8px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded border shrink-0 ${
              tool.tier === 'paid'
                ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                : tool.tier === 'freemium'
                ? 'border-stone-600 text-stone-400'
                : 'border-stone-700 text-stone-500'
            }`}
          >
            {tool.tier === 'freemium' ? 'Free / Paid' : tool.tier}
          </span>
        </div>

        {/* Description */}
        <p className={`leading-relaxed line-clamp-2 ${variant === 'featured' ? 'text-sm text-stone-300' : 'text-xs text-stone-400'}`}>
          {tool.shortDescription || tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-800">
          <span className="font-mono text-[8px] text-stone-600">
            {isAffiliate ? 'Affiliate link' : 'Direct link'}
          </span>
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase flex items-center gap-1 text-stone-400 group-hover:text-amber-400 transition-colors">
            Visit <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>

      {/* Premium lock overlay */}
      {variant === 'premium' && (
        <div className="absolute inset-0 backdrop-blur-[3px] bg-stone-950/40 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2 text-amber-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <p className="text-[11px] font-mono text-amber-400/60">Premium tool</p>
          </div>
        </div>
      )}
    </div>
  )

  if (variant === 'premium') {
    return <div className="relative">{cardContent}</div>
  }

  return (
    <a href={tool.url} target={linkTarget} rel={linkRel} className="block no-underline">
      {cardContent}
    </a>
  )
}

// ── Sample data ──────────────────────────────────────────
export const sampleTools: Tool[] = [
  {
    id: 't1', name: 'Supabase', slug: 'supabase',
    description: 'Open-source Firebase alternative. Postgres, auth, RLS, and real-time subscriptions built in.',
    shortDescription: 'Open-source Firebase alternative with Postgres, auth, and real-time.',
    category: 'Backend', tier: 'freemium', url: 'https://supabase.com',
    icon: '⚡', featured: true, popular: true,
  },
  {
    id: 't2', name: 'n8n', slug: 'n8n',
    description: 'Fair-code workflow automation. Self-host or cloud — the serious builder\'s Make.com alternative.',
    shortDescription: 'Fair-code workflow automation for serious builders.',
    category: 'Automation', tier: 'freemium', url: 'https://n8n.io',
    icon: '🔗', affiliateLink: { url: 'https://n8n.io', label: 'Try n8n' }, featured: true,
  },
  {
    id: 't3', name: 'Vercel', slug: 'vercel',
    description: 'Frontend deployment and serverless platform. Next.js-native, global edge network.',
    shortDescription: 'Frontend deployment platform with global edge network.',
    category: 'Infrastructure', tier: 'freemium', url: 'https://vercel.com',
    icon: '▲', featured: true,
  },
  {
    id: 't4', name: 'Railway', slug: 'railway',
    description: 'Full-stack deployment platform. Docker-native with SQL, Redis, and cron built in.',
    shortDescription: 'Docker-native full-stack deployment with SQL and Redis.',
    category: 'Infrastructure', tier: 'paid', url: 'https://railway.app',
    icon: '🚂', affiliateLink: { url: 'https://railway.app', label: 'Deploy on Railway' },
  },
  {
    id: 't5', name: 'Resend', slug: 'resend',
    description: 'Email API for developers. Reliable delivery without the complexity of legacy providers.',
    shortDescription: 'Developer-friendly email API with reliable delivery.',
    category: 'Communications', tier: 'freemium', url: 'https://resend.com',
    icon: '✉️',
  },
  {
    id: 't6', name: 'Tailwind CSS', slug: 'tailwind',
    description: 'Utility-first CSS framework. Ship beautiful UIs fast without leaving your HTML.',
    shortDescription: 'Utility-first CSS framework for rapid UI development.',
    category: 'Frontend', tier: 'free', url: 'https://tailwindcss.com',
    icon: '🌊',
  },
  {
    id: 't7', name: 'Claude (Anthropic)', slug: 'claude',
    description: 'Frontier AI model. Preferred for code generation, analysis, and long-context reasoning.',
    shortDescription: 'Frontier AI model for code and long-context reasoning.',
    category: 'AI', tier: 'paid', url: 'https://anthropic.com/claude',
    icon: '🧠', featured: true, popular: true,
  },
  {
    id: 't8', name: 'DeepSeek', slug: 'deepseek',
    description: 'Open-weight frontier model that matches closed labs at a fraction of the cost.',
    shortDescription: 'Open-weight frontier AI model at fraction of the cost.',
    category: 'AI', tier: 'free', url: 'https://deepseek.com',
    icon: '🔍', featured: true,
  },
  {
    id: 't9', name: 'Stripe', slug: 'stripe',
    description: 'Payment infrastructure for the internet. Accept payments, manage subscriptions, and more.',
    shortDescription: 'Payment infrastructure for internet businesses.',
    category: 'Payments', tier: 'paid', url: 'https://stripe.com',
    icon: '💳', affiliateLink: { url: 'https://stripe.com', label: 'Set up Stripe' },
  },
  {
    id: 't10', name: 'Next.js', slug: 'nextjs',
    description: 'The React framework for production. Full-stack framework with SSR, SSG, and App Router.',
    shortDescription: 'React framework with SSR, SSG, and App Router.',
    category: 'Frontend', tier: 'free', url: 'https://nextjs.org',
    icon: '▲', featured: true, popular: true,
  },
  {
    id: 't11', name: 'Sanity', slug: 'sanity',
    description: 'Headless CMS with structured content. Real-time collaboration for content teams.',
    shortDescription: 'Headless CMS with structured content and real-time collaboration.',
    category: 'CMS', tier: 'freemium', url: 'https://sanity.io',
    icon: '📝',
  },
  {
    id: 't12', name: 'Qardus AI', slug: 'qardus-ai',
    description: 'AI-powered Islamic finance compliance screening. Real-time halal certification for fintech products.',
    shortDescription: 'AI compliance screening for Islamic finance.',
    category: 'Fintech', tier: 'paid', url: '#',
    icon: '🕌',
  },
]

export const premiumTools: Tool[] = [
  {
    id: 'p1', name: 'Nur Agent Suite', slug: 'nur-agent',
    description: 'Enterprise agent orchestration platform with built-in halal data compliance layers.',
    shortDescription: 'Enterprise AI agent orchestration with halal compliance.',
    category: 'AI', tier: 'paid', url: '#',
    icon: '✨', premium: true,
  },
  {
    id: 'p2', name: 'Hidayah Analytics', slug: 'hidayah-analytics',
    description: 'Privacy-first analytics platform for Muslim-owned businesses. No tracking, all insights.',
    shortDescription: 'Privacy-first analytics for Muslim-owned businesses.',
    category: 'Analytics', tier: 'paid', url: '#',
    icon: '📊', premium: true,
  },
  {
    id: 'p3', name: 'Tazkrah Embeddings', slug: 'tazkrah-embeddings',
    description: 'Quranic embedding model API. Fine-tuned on classical Arabic for Islamic NLP applications.',
    shortDescription: 'Quranic embedding model API for Islamic NLP.',
    category: 'AI', tier: 'paid', url: '#',
    icon: '📖', premium: true,
  },
]
