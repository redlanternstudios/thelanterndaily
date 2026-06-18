'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { BuilderProfile } from '@/lib/types'

interface OperatorSpotlightCardProps {
  builder: BuilderProfile
  variant?: 'grid' | 'featured'
}

export default function OperatorSpotlightCard({ builder, variant = 'grid' }: OperatorSpotlightCardProps) {
  const isFeatured = variant === 'featured' || builder.featured

  return (
    <Link
      href={`/builders/${builder.slug}`}
      className={`group block no-underline border transition-all duration-300 ${
        isFeatured
          ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 rounded-xl'
          : 'border-stone-800 bg-stone-900/80 hover:border-stone-600 rounded-lg'
      }`}
    >
      <div className="p-5">
        {/* Header: avatar + name + title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-stone-800">
            {builder.avatar ? (
              <Image
                src={builder.avatar}
                alt={builder.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-sm font-bold text-stone-400">
                {builder.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-white leading-tight group-hover:text-amber-400 transition-colors truncate">
              {builder.name}
            </h3>
            <p className="text-xs text-stone-400 truncate">{builder.title}</p>
          </div>
          {builder.featured && (
            <span className="font-mono text-[7px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              Featured
            </span>
          )}
        </div>

        {/* Operator number */}
        <div className="font-mono text-[11px] font-bold text-stone-600">
          Operator #{builder.operatorNumber}
        </div>

        {/* Bio */}
        <p className="text-xs leading-relaxed text-stone-400 mt-2 mb-3 line-clamp-2">
          {builder.bio}
        </p>

        {/* Specialty tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {builder.specialty.slice(0, 4).map((s) => (
            <span
              key={s}
              className="font-mono text-[8px] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded border border-stone-700 text-stone-500"
            >
              {s}
            </span>
          ))}
          {builder.specialty.length > 4 && (
            <span className="font-mono text-[8px] text-stone-600">
              +{builder.specialty.length - 4}
            </span>
          )}
        </div>

        {/* Footer: links + CTA */}
        <div className="flex items-center gap-3 pt-3 border-t border-stone-800">
          {builder.links.twitter && (
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-stone-600 hover:text-stone-300 transition-colors">
              X
            </span>
          )}
          {builder.links.github && (
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-stone-600 hover:text-stone-300 transition-colors">
              GH
            </span>
          )}
          {builder.links.website && (
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-stone-600 hover:text-stone-300 transition-colors">
              Web
            </span>
          )}
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase flex items-center gap-1 ml-auto text-stone-400 group-hover:text-amber-400 transition-colors">
            Profile <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Sample data ──────────────────────────────────────────
export const sampleBuilders: BuilderProfile[] = [
  {
    id: 'b1', slug: 'rory-semeah', name: 'Rory Semeah', title: 'Founder · RedLantern Studios',
    operatorNumber: '0001', bio: 'Building the halal tech stack. Muslim operators need their own infrastructure layer — not borrowed tools from an industry that doesn\'t serve them.',
    location: 'Austin, TX', website: 'https://redlanternstudios.com',
    specialty: ['Next.js', 'Supabase', 'n8n', 'Claude', 'Tailwind'],
    stacks: [],
    links: { twitter: 'https://x.com/rsemeah', github: 'https://github.com/rsemeah' },
    featured: true,
  },
  {
    id: 'b2', slug: 'fatima-zahra', name: 'Fatima Zahra', title: 'CEO · Nur AI',
    operatorNumber: '0012', bio: 'Building AI agents for Islamic finance compliance. Halal fintech needs real-time screening, not batch reports.',
    location: 'Kuala Lumpur, Malaysia', website: 'https://nurai.dev',
    specialty: ['Python', 'AWS', 'LangChain', 'Postgres'],
    stacks: [],
    links: { twitter: 'https://x.com/fatimazahra', website: 'https://nurai.dev' },
  },
  {
    id: 'b3', slug: 'omar-hassan', name: 'Omar Hassan', title: 'CTO · Qibla Health',
    operatorNumber: '0047', bio: 'Digital health platform for Muslim communities. Telehealth with prayer time awareness and halal diet tracking.',
    location: 'Cairo, Egypt',
    specialty: ['React Native', 'Node.js', 'MongoDB', 'Docker'],
    stacks: [],
    links: { github: 'https://github.com/omarhassan' },
  },
  {
    id: 'b4', slug: 'layla-nasir', name: 'Layla Nasir', title: 'Founder · Hidayah Ventures',
    operatorNumber: '0088', bio: 'Venture studio backing Muslim founders. Portfolio includes edtech, fintech, and developer tooling.',
    location: 'London, UK', website: 'https://hidayah.vc',
    specialty: ['TypeScript', 'Supabase', 'Next.js', 'Stripe'],
    stacks: [],
    links: { twitter: 'https://x.com/laylanasir', website: 'https://hidayah.vc' },
    featured: true,
  },
  {
    id: 'b5', slug: 'ibrahim-ali', name: 'Ibrahim Ali', title: 'ML Engineer · Tazkrah AI',
    operatorNumber: '0123', bio: 'Open-source Islamic NLP models. Building the first Quranic embedding model fine-tuned on classical Arabic.',
    location: 'Medina, Saudi Arabia',
    specialty: ['PyTorch', 'FastAPI', 'Redis', 'Kubernetes'],
    stacks: [],
    links: { github: 'https://github.com/ibrahimali' },
  },
  {
    id: 'b6', slug: 'aisha-mohamed', name: 'Aisha Mohamed', title: 'Product Lead · DeenDigital',
    operatorNumber: '0156', bio: 'Product leader building halal social discovery. The Muslim internet should feel like home, not a battleground.',
    location: 'Dubai, UAE', website: 'https://deendigital.co',
    specialty: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
    stacks: [],
    links: { twitter: 'https://x.com/aishamohamed', website: 'https://deendigital.co' },
  },
]
