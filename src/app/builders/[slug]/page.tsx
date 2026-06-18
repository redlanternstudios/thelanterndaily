import Link from 'next/link'
import { notFound } from 'next/navigation'
import StackToolCard, { sampleTools } from '@/components/StackToolCard'
import OperatorSpotlightCard from '@/components/OperatorSpotlightCard'
import type { BuilderProfile, Tool } from '@/lib/types'

// ── Hardcoded builder data map ─────────────────────────
const builderData: BuilderProfile[] = [
  {
    id: 'b1', slug: 'rory-semeah', name: 'Rory Semeah', title: 'Founder · RedLantern Studios',
    operatorNumber: '0001',
    bio: 'Building the halal tech stack. Muslim operators need their own infrastructure layer — not borrowed tools from an industry that doesn\'t serve them. Rory founded RedLantern Studios to build tools that serve the Muslim builder community first. Previously built AI products at scale and founded multiple developer-tool startups.',
    location: 'Austin, TX', website: 'https://redlanternstudios.com',
    specialty: ['Next.js', 'Supabase', 'n8n', 'Claude', 'Tailwind', 'AI Agents'],
    stacks: [
      { id: 's1', name: 'AI Agent Stack', slug: 'ai-agent', description: 'Full-stack AI agent infrastructure with halal compliance.', tools: [], category: 'AI', featured: true },
    ],
    links: { twitter: 'https://x.com/rsemeah', github: 'https://github.com/rsemeah', website: 'https://redlanternstudios.com' },
    featured: true,
  },
  {
    id: 'b2', slug: 'fatima-zahra', name: 'Fatima Zahra', title: 'CEO · Nur AI',
    operatorNumber: '0012',
    bio: 'Building AI agents for Islamic finance compliance. Halal fintech needs real-time screening, not batch reports. Fatima brings 12 years of fintech experience and a deep understanding of Shariah compliance requirements.',
    location: 'Kuala Lumpur, Malaysia', website: 'https://nurai.dev',
    specialty: ['Python', 'AWS', 'LangChain', 'Postgres', 'MLOps'],
    stacks: [],
    links: { twitter: 'https://x.com/fatimazahra', website: 'https://nurai.dev' },
  },
  {
    id: 'b3', slug: 'omar-hassan', name: 'Omar Hassan', title: 'CTO · Qibla Health',
    operatorNumber: '0047',
    bio: 'Digital health platform for Muslim communities. Telehealth with prayer time awareness and halal diet tracking. Omar previously led engineering at a YC-backed health startup.',
    location: 'Cairo, Egypt',
    specialty: ['React Native', 'Node.js', 'MongoDB', 'Docker', 'Healthcare'],
    stacks: [],
    links: { github: 'https://github.com/omarhassan' },
  },
  {
    id: 'b4', slug: 'layla-nasir', name: 'Layla Nasir', title: 'Founder · Hidayah Ventures',
    operatorNumber: '0088',
    bio: 'Venture studio backing Muslim founders. Portfolio includes edtech, fintech, and developer tooling. Layla is a former VC turned operator who believes the next wave of billion-dollar tech companies will come from the Muslim world.',
    location: 'London, UK', website: 'https://hidayah.vc',
    specialty: ['TypeScript', 'Supabase', 'Next.js', 'Stripe', 'Venture'],
    stacks: [],
    links: { twitter: 'https://x.com/laylanasir', website: 'https://hidayah.vc' },
    featured: true,
  },
  {
    id: 'b5', slug: 'ibrahim-ali', name: 'Ibrahim Ali', title: 'ML Engineer · Tazkrah AI',
    operatorNumber: '0123',
    bio: 'Open-source Islamic NLP models. Building the first Quranic embedding model fine-tuned on classical Arabic. Ibrahim holds a PhD in NLP and is committed to making Islamic scholarship AI-accessible.',
    location: 'Medina, Saudi Arabia',
    specialty: ['PyTorch', 'FastAPI', 'Redis', 'Kubernetes', 'NLP'],
    stacks: [],
    links: { github: 'https://github.com/ibrahimali' },
  },
  {
    id: 'b6', slug: 'aisha-mohamed', name: 'Aisha Mohamed', title: 'Product Lead · DeenDigital',
    operatorNumber: '0156',
    bio: 'Product leader building halal social discovery. The Muslim internet should feel like home, not a battleground. Aisha previously led product at two social platforms reaching 10M+ users.',
    location: 'Dubai, UAE', website: 'https://deendigital.co',
    specialty: ['Next.js', 'Sanity', 'Tailwind', 'Vercel', 'Product'],
    stacks: [],
    links: { twitter: 'https://x.com/aishamohamed', website: 'https://deendigital.co' },
  },
]

const builderMap = new Map(builderData.map(b => [b.slug, b]))

export function generateStaticParams() {
  return builderData.map((builder) => ({
    slug: builder.slug,
  }))
}

// ── Helper: get featured tools for a builder ───────────
function getBuilderTools(builder: BuilderProfile): Tool[] {
  const specialtyLower = builder.specialty.map(s => s.toLowerCase())
  return sampleTools.filter(t =>
    specialtyLower.some(s => t.category.toLowerCase().includes(s) || t.name.toLowerCase().includes(s))
  ).slice(0, 4)
}

export default function BuilderDetailPage({ params }: { params: { slug: string } }) {
  const builder = builderMap.get(params.slug)

  if (!builder) {
    notFound()
  }

  const relatedTools = getBuilderTools(builder)

  return (
    <main>
      {/* ─── BACK LINK ───────────────────────────── */}
      <div className="px-6 md:px-12 pt-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/builders"
            className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-500 hover:text-amber-400 transition-colors"
          >
            <span aria-hidden="true">←</span> Back to Operators
          </Link>
        </div>
      </div>

      {/* ─── PROFILE HEADER ───────────────────────── */}
      <section className="px-6 md:px-12 py-10 border-b border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-stone-800 flex items-center justify-center font-serif text-4xl md:text-5xl font-bold text-amber-400 shrink-0 border-2 border-amber-500/20">
              {builder.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  {builder.name}
                </h1>
                {builder.featured && (
                  <span className="font-mono text-[8px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Featured Operator
                  </span>
                )}
              </div>
              <p className="text-base text-stone-400 mb-1">{builder.title}</p>
              <p className="font-mono text-sm font-bold text-stone-600 mb-4">
                Operator #{builder.operatorNumber}
              </p>

              {builder.location && (
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {builder.location}
                </div>
              )}

              {/* Bio */}
              <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
                {builder.bio}
              </p>

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {builder.links.website && (
                  <a
                    href={builder.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                    Website
                  </a>
                )}
                {builder.links.twitter && (
                  <a
                    href={builder.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X
                  </a>
                )}
                {builder.links.github && (
                  <a
                    href={builder.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {builder.links.linkedin && (
                  <a
                    href={builder.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECIALTY TAGS ───────────────────────── */}
      <section className="px-6 md:px-12 py-8 border-b border-stone-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-4">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {builder.specialty.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1.5 rounded border border-stone-700 text-stone-300 bg-stone-900/50"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED STACKS ──────────────────────── */}
      {relatedTools.length > 0 && (
        <section className="px-6 md:px-12 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-6">
              Tools in {builder.name.split(' ')[0]}&apos;s Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedTools.map((tool) => (
                <StackToolCard key={tool.id} tool={tool} variant="grid" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
