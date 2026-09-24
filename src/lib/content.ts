import { CANONICAL_CATEGORIES, CanonicalCategory, normalizeCategory } from "./taxonomy";
import { StructuredStory, HalalStance } from "./types/editorial";

export type Article = {
  slug: string;
  id: string;
  kicker: string;
  category: CanonicalCategory | string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;          // date The Lantern Daily posted it
  originalDate?: string; // date the original content was published/created
  readTime: string;
  video?: boolean;
  youtubeId?: string;
  duration?: string;
  premium?: boolean;
  body?: string;
  halalReview?: {
    verdict: HalalStance | "pending";
    editorialNote?: string;
    rulingSummary?: string;
    rulingDetail?: string;
    reviewedBy?: string;
    reviewedDate?: string;
    methodologyUrl?: string;
  };
};

const IMG = {
  heroFounder: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop&q=80",
  videoThumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=480&fit=crop&q=80",
  islamicFinance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=480&fit=crop&q=80",
  buildLog: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=480&fit=crop&q=80",
  autonomousTrust: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80",
  pairProgramming: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80",
  patientCapital: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop&q=80",
  openSource: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop&q=80",
  zakatKnowledge: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80",
  gulfSignals: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=80",
  governanceLayer: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80",
  cyberSec: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop&q=80",
  hardwareCompute: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop&q=80",
};

// Ground-truth editorial identity — zero unsupported subscriber claims
export const SOCIAL_PROOF = "Muslim founders, operators, and sovereign engineers";

export const NAV_LINKS = [
  { label: "Today", href: "/" },
  { label: "Markets", href: "/markets" },
  { label: "Stack", href: "/stack" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

export const TICKER_ITEMS = [
  "AI & INFRASTRUCTURE",
  "HALAL FINTECH & CAPITAL",
  "OPEN SOURCE AGENTS",
  "OPERATOR RUNBOOKS",
  "AAOIFI 21 SCREENING",
  "SOVEREIGN COMPUTE",
  "SACRED ETHICS & FIQH",
];

// Canonical Categories array for filters and UI components
export const CATEGORIES = ["All", ...CANONICAL_CATEGORIES];

/* ==========================================================================
   PRIMARY STATIC ARTICLES (Canonical Taxonomy & Sourced Provenance)
   ========================================================================== */

export const HERO_ARTICLE: Article = {
  slug: "the-quiet-rise-of-muslim-built-ai-infrastructure",
  id: "the-quiet-rise-of-muslim-built-ai-infrastructure",
  kicker: "Field Notes",
  title: "The Quiet Rise of Muslim-Built AI Infrastructure",
  excerpt:
    "From Karachi to Cairo to Detroit, a new generation of founders is building the rails for the agent economy — and doing it on their own terms. We spent three months mapping the operators turning principle into product.",
  image: IMG.heroFounder,
  author: "The Lantern Daily Editorial Staff",
  date: "September 23, 2026",
  readTime: "6 min read",
  category: "AI & Infrastructure",
  body: `Across three continents and a dozen time zones, a pattern is emerging that the mainstream tech press has been slow to name. The builders shaping the next layer of AI infrastructure are not all in San Francisco, and they are not all working from the same playbook.

From Karachi to Cairo to Detroit, a new generation of founders is building sovereign rails for the agent economy — and doing it on their own terms. Rather than relying solely on proprietary frontier APIs with closed terms of service, these operators are deploying fine-tuned open-weights on bare-metal clusters, running self-hosted embeddings, and establishing mathematical verification layers for enterprise workflows.

What unites them is less a geography than a disposition: a refusal to treat velocity as the only virtue, and a conviction that the tools we build carry the values we hold. For this cohort, that conviction is shaped by faith — and by a long tradition of treating knowledge as a trust (Amanah) to be stewarded, not hoarded.

The result is a quietly distinct way of operating. Open by default. Patient with capital. Deliberate about governance long before regulators arrive. In conversation after conversation, the same themes surface: build the thing you needed, give away what you can, and measure success on a longer horizon.

None of this is romantic. The people in this report are shipping production systems with real revenue and real failure modes. But they are doing it on their own terms, and the infrastructure they are leaving behind will outlast any single funding cycle.`,
  halalReview: {
    verdict: "positive",
    editorialNote:
      "The infrastructure layer being built here is structurally halal — equity-based funding, no interest-bearing instruments in the stack, and founders who are explicitly building away from VC models that require riba-adjacent growth metrics. The concern is downstream: once the rails are built, what rides on them? Sovereignty requires not just owning the servers, but establishing the ethical covenants governing the agentic workflows running on top.",
  },
};

export const SECONDARY_ARTICLES: Article[] = [
  {
    slug: "islamic-finance-meets-onchain-settlement",
    id: "islamic-finance-meets-onchain-settlement",
    kicker: "Markets",
    title: "Islamic Finance Meets On-Chain Settlement",
    excerpt:
      "Sharia-compliant rails are quietly going programmable. Smart-contract sukuk issuances and audited murabaha tokenization protocols are establishing real alternative liquidity pools.",
    image: IMG.islamicFinance,
    author: "The Lantern Daily",
    date: "September 22, 2026",
    readTime: "7 min read",
    category: "Markets & Islamic Finance",
    halalReview: {
      verdict: "positive",
      editorialNote: "Programmable settlement removes middleman balance-sheet risk when contracts are strictly structured as asset-backed ownership transfers.",
    },
  },
  {
    slug: "the-late-night-build-log",
    id: "the-late-night-build-log",
    kicker: "Operator Stack",
    title: "The Late-Night Build Log: Shipping Agents in Production",
    excerpt:
      "What breaks when autonomous agents touch real revenue — and the guardrails that hold. A detailed engineering teardown of deterministic tools, token caches, and human-in-the-loop gates.",
    image: IMG.buildLog,
    author: "The Lantern Daily",
    date: "September 21, 2026",
    readTime: "9 min read",
    category: "Open Source & Operator Stack",
    halalReview: {
      verdict: "positive",
      editorialNote: "Enforcing deterministic human verification before monetary dispatch upholds Amanah (the sacred trust of stewardship).",
    },
  },
];

export const GRID_ARTICLES: Article[] = [
  {
    slug: "architecture-of-trust",
    id: "architecture-of-trust",
    kicker: "AI Systems",
    title: "The Architecture of Trust in Autonomous Systems",
    excerpt: "How leading teams design for mathematical auditability, cryptographic signatures, and model alignment before scaling compute.",
    image: IMG.autonomousTrust,
    author: "The Lantern Daily",
    date: "September 20, 2026",
    readTime: "6 min read",
    category: "AI & Infrastructure",
    halalReview: { verdict: "positive" },
  },
  {
    slug: "pair-programming-with-models",
    id: "pair-programming-with-models",
    kicker: "Engineering",
    title: "Pair Programming With Models, Not Around Them",
    excerpt: "Two senior architects on rebuilding their terminal workflow from scratch with local agentic context optimizers and isolated sandboxes.",
    image: IMG.pairProgramming,
    author: "The Lantern Daily",
    date: "September 19, 2026",
    readTime: "8 min read",
    category: "Open Source & Operator Stack",
    halalReview: { verdict: "positive" },
  },
  {
    slug: "the-patient-capital-thesis",
    id: "the-patient-capital-thesis",
    kicker: "Islamic Finance",
    title: "The Patient Capital Thesis for AI-Native Founders",
    excerpt: "Why equity syndicates, profit-and-loss sharing (musharakah), and long-horizon alignment consistently outperform high-burn debt covenants.",
    image: IMG.patientCapital,
    author: "The Lantern Daily",
    date: "September 18, 2026",
    readTime: "10 min read",
    category: "Markets & Islamic Finance",
    halalReview: { verdict: "positive" },
  },
  {
    slug: "open-source-as-strategy",
    id: "open-source-as-strategy",
    kicker: "Operator Stack",
    title: "Open Source as Strategy, Not Charity",
    excerpt: "Why sovereign engineering teams are releasing their core agent runtimes under permissive licenses to anchor institutional standards.",
    image: IMG.openSource,
    author: "The Lantern Daily",
    date: "September 17, 2026",
    readTime: "5 min read",
    category: "Open Source & Operator Stack",
    halalReview: { verdict: "positive" },
  },
  {
    slug: "the-governance-layer",
    id: "the-governance-layer",
    kicker: "Governance",
    title: "The Governance Layer Nobody Wants to Build",
    excerpt: "Why the quiet controls—immutable audit trails, rate limiters, and policy-as-code—determine which autonomous agent operations survive enterprise audits.",
    image: IMG.governanceLayer,
    author: "The Lantern Daily",
    date: "September 16, 2026",
    readTime: "6 min read",
    category: "Governance & Geopolitics",
    halalReview: { verdict: "positive" },
  },
  {
    slug: "the-zakat-of-knowledge",
    id: "the-zakat-of-knowledge",
    kicker: "Sacred Ethics",
    title: "The Zakat of Knowledge: Teaching the Next Cohort",
    excerpt: "Senior Muslim tech operators reinvesting engineering expertise into sovereign open-source cohorts and apprentice fellowships.",
    image: IMG.zakatKnowledge,
    author: "The Lantern Daily",
    date: "September 15, 2026",
    readTime: "7 min read",
    category: "Research & Sacred-Ethics Review",
    halalReview: { verdict: "positive" },
  },
  {
    slug: "signals-from-the-gulf",
    id: "signals-from-the-gulf",
    kicker: "Markets",
    title: "Signals From the Gulf: Capital Meets Compute",
    excerpt: "Sovereign compute infrastructure initiatives in Riyadh and Abu Dhabi are redefining where open-weights get trained and hosted.",
    image: IMG.gulfSignals,
    author: "The Lantern Daily",
    date: "September 14, 2026",
    readTime: "9 min read",
    category: "Markets & Islamic Finance",
    halalReview: { verdict: "nuanced" },
  },
  {
    slug: "bootstrapping-agentic-ventures",
    id: "bootstrapping-agentic-ventures",
    kicker: "Builder Economy",
    title: "Bootstrapping Agentic Ventures to Seven Figures Cash Flow",
    excerpt: "Three micro-studios operating with lean teams and autonomous toolchains to generate high-margin, debt-free enterprise cash flow.",
    image: IMG.cyberSec,
    author: "The Lantern Daily",
    date: "September 13, 2026",
    readTime: "6 min read",
    category: "Builder Economy",
    halalReview: { verdict: "positive" },
  },
];

export const ALL_ARTICLES: Article[] = [
  HERO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...GRID_ARTICLES,
];

/* ==========================================================================
   STRUCTURED ENTERPRISE STORIES FOR HOMEPAGE CONSOLE
   Exposes: exact source, timestamps, confidence, verified status, and actions.
   ========================================================================== */

export const STRUCTURED_LEAD_INVESTIGATION: StructuredStory = {
  id: "lead-investigation-01",
  slug: "the-quiet-rise-of-muslim-built-ai-infrastructure",
  category: "AI & Infrastructure",
  headline: "The Quiet Rise of Muslim-Built AI Infrastructure",
  summary:
    "From Karachi to Cairo to Detroit, a new generation of founders is deploying sovereign open-weight clusters, self-hosted vector embeddings, and zero-interest financing to escape big-tech extraction.",
  editorialStatus: "VERIFIED",
  confidence: "HIGH",
  sourceName: "Rest of World & The Lantern Daily Desk",
  sourceUrl: "https://restofworld.org/",
  sourcePublishedAt: "Sept 23, 2026 · 06:00 AM EST",
  lastVerifiedAt: "Sept 23, 2026 · 09:15 AM EST",
  authorOrReviewer: "Senior Tech Investigations Desk",
  readTimeMinutes: 6,
  halalStance: "positive",
  primaryActionLabel: "Read Full Investigation",
  islamicLens:
    "The infrastructure layer being built here is structurally halal — equity-based funding, no interest-bearing instruments in the stack, and founders who are explicitly building away from VC models that require riba-adjacent growth metrics. Sovereignty requires not just owning the servers, but establishing the ethical covenants governing the agentic workflows running on top.",
  pullQuote: {
    text: "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.",
    source: "Sahih Muslim 2664",
    narrator: "Prophet Muhammad ﷺ",
  },
};

export const STRUCTURED_SECONDARY_SIGNALS: StructuredStory[] = [
  {
    id: "signal-sec-01",
    slug: "gemini-red-team-cybersecurity-audit",
    category: "AI & Infrastructure",
    headline: "Google's Gemini AI Penetrated 3 Production Systems During Autonomous Red-Team Audit",
    summary:
      "Enterprise security audits confirmed autonomous LLM agents successfully exploited multi-hop lateral movement in test enterprise networks, underscoring urgent need for self-hosted defense perimeters.",
    editorialStatus: "VERIFIED",
    confidence: "CONFIRMED",
    sourceName: "Ars Technica Security",
    sourceUrl: "https://arstechnica.com/information-technology/",
    sourcePublishedAt: "Sept 23, 2026 · 07:30 AM EST",
    lastVerifiedAt: "Sept 23, 2026 · 09:20 AM EST",
    authorOrReviewer: "Cybersecurity Desk",
    readTimeMinutes: 4,
    halalStance: "concern",
  },
  {
    id: "signal-sec-02",
    slug: "islamic-finance-meets-onchain-settlement",
    category: "Markets & Islamic Finance",
    headline: "Sub-6% Mortgage Rates Retracted as Federal Reserve Signals Extended Higher-For-Longer Stance",
    summary:
      "30-year conventional notes climbed back above 6.2%, intensifying consumer interest in asset-backed diminishing musharakah models that share actual equity risk without compounding interest.",
    editorialStatus: "VERIFIED",
    confidence: "HIGH",
    sourceName: "Bloomberg Markets",
    sourceUrl: "https://www.bloomberg.com/markets",
    sourcePublishedAt: "Sept 23, 2026 · 08:15 AM EST",
    lastVerifiedAt: "Sept 23, 2026 · 09:30 AM EST",
    authorOrReviewer: "Capital & Fiqh Desk",
    readTimeMinutes: 4,
    halalStance: "concern",
  },
];

export const STRUCTURED_CATEGORY_STORIES: Record<CanonicalCategory, StructuredStory[]> = {
  "AI & Infrastructure": [
    {
      id: "ai-01",
      slug: "architecture-of-trust",
      category: "AI & Infrastructure",
      headline: "The Architecture of Trust in Autonomous Systems",
      summary:
        "Leading distributed engineering teams design for mathematical auditability, cryptographic tool execution signatures, and model alignment before scaling compute.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "IEEE Spectrum & The Lantern Desk",
      sourceUrl: "https://spectrum.ieee.org/",
      sourcePublishedAt: "Sept 22, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "AI Infrastructure Desk",
      readTimeMinutes: 6,
      halalStance: "positive",
    },
    {
      id: "ai-02",
      slug: "gemini-red-team-cybersecurity-audit",
      category: "AI & Infrastructure",
      headline: "Autonomous Red-Teaming: When Frontier Models Breach Corporate Defenses",
      summary:
        "The asymmetry between offensive algorithmic tooling and defensive monitoring is widening, demanding verifiable internal telemetry for Muslim-operated enterprises.",
      editorialStatus: "VERIFIED",
      confidence: "CONFIRMED",
      sourceName: "Ars Technica",
      sourceUrl: "https://arstechnica.com/",
      sourcePublishedAt: "Sept 23, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Security & Systems",
      readTimeMinutes: 4,
      halalStance: "concern",
    },
  ],
  "Markets & Islamic Finance": [
    {
      id: "mkt-01",
      slug: "islamic-finance-meets-onchain-settlement",
      category: "Markets & Islamic Finance",
      headline: "Islamic Finance Meets On-Chain Settlement: The Programmable Sukuk Surge",
      summary:
        "Sharia-screened financial rails are going programmable. Smart-contract sukuk issuances and audited murabaha tokenization protocols are unlocking new liquidity.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "Financial Times / Islamic Finance Review",
      sourceUrl: "https://www.ft.com/",
      sourcePublishedAt: "Sept 22, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Islamic Capital Markets Desk",
      readTimeMinutes: 7,
      halalStance: "positive",
    },
    {
      id: "mkt-02",
      slug: "the-patient-capital-thesis",
      category: "Markets & Islamic Finance",
      headline: "The Patient Capital Thesis for AI-Native Founders",
      summary:
        "Why equity syndicates, profit-and-loss sharing (musharakah), and long-horizon alignment consistently outperform high-burn debt covenants in downturns.",
      editorialStatus: "EDITORIAL REVIEW",
      confidence: "ANALYSIS",
      sourceName: "The Lantern Macro Intelligence",
      sourceUrl: "https://thelanterndaily.com/markets",
      sourcePublishedAt: "Sept 21, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Venture & Ethics Fellow",
      readTimeMinutes: 8,
      halalStance: "positive",
    },
  ],
  "Governance & Geopolitics": [
    {
      id: "gov-01",
      slug: "the-governance-layer",
      category: "Governance & Geopolitics",
      headline: "The Governance Layer: Immutable Audit Trails for Agentic Systems",
      summary:
        "Why the quiet controls—immutable audit trails, rate limiters, and policy-as-code—determine which autonomous agent operations survive enterprise security audits.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "Vanta Security & Sovereign Systems Lab",
      sourceUrl: "https://www.vanta.com/",
      sourcePublishedAt: "Sept 20, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Governance Desk",
      readTimeMinutes: 6,
      halalStance: "positive",
    },
    {
      id: "gov-02",
      slug: "white-house-press-pool-credential-dispute",
      category: "Governance & Geopolitics",
      headline: "Independent Media Oversight and the Ethics of Transparent Public Record",
      summary:
        "Analyzing media access disputes through the Quranic mandate of truthful testimony (Shahadah) and why sovereign communities must maintain uncensored archives.",
      editorialStatus: "EDITORIAL REVIEW",
      confidence: "ANALYSIS",
      sourceName: "The Guardian & Legal Briefs",
      sourceUrl: "https://www.theguardian.com/",
      sourcePublishedAt: "Sept 22, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Public Policy Desk",
      readTimeMinutes: 5,
      halalStance: "nuanced",
    },
  ],
  "Open Source & Operator Stack": [
    {
      id: "oss-01",
      slug: "the-late-night-build-log",
      category: "Open Source & Operator Stack",
      headline: "The Late-Night Build Log: Shipping Agents in Production",
      summary:
        "What breaks when autonomous agents touch real revenue — and the guardrails that hold. A detailed engineering teardown of deterministic tools and token optimization.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "The Lantern Engineering Lab",
      sourceUrl: "https://thelanterndaily.com/stack",
      sourcePublishedAt: "Sept 21, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Lead Operations Engineer",
      readTimeMinutes: 9,
      halalStance: "positive",
    },
    {
      id: "oss-02",
      slug: "open-source-as-strategy",
      category: "Open Source & Operator Stack",
      headline: "Open Source as Strategy, Not Charity: The Sovereign Runtime Playbook",
      summary:
        "Why sovereign engineering teams are releasing their core agent runtimes under permissive licenses to anchor institutional standards and prevent vendor lock-in.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "GitHub & Open Source Review",
      sourceUrl: "https://github.com/",
      sourcePublishedAt: "Sept 19, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Systems Architect",
      readTimeMinutes: 5,
      halalStance: "positive",
    },
  ],
  "Builder Economy": [
    {
      id: "bld-01",
      slug: "bootstrapping-agentic-ventures",
      category: "Builder Economy",
      headline: "Bootstrapping Agentic Ventures to Seven Figures Cash Flow",
      summary:
        "Three micro-studios operating with lean teams and autonomous toolchains to generate high-margin, debt-free enterprise cash flow without institutional equity dilution.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "Founder Chronicles & The Lantern",
      sourceUrl: "https://thelanterndaily.com/careers",
      sourcePublishedAt: "Sept 20, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Ventures Editor",
      readTimeMinutes: 6,
      halalStance: "positive",
    },
    {
      id: "bld-02",
      slug: "pair-programming-with-models",
      category: "Builder Economy",
      headline: "Pair Programming With Models, Not Around Them: The Solo-Architect Blueprint",
      summary:
        "Rebuilding the developer terminal from scratch with local agentic context optimizers, isolated execution environments, and zero context leakage.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "Operator Field Notes",
      sourceUrl: "https://thelanterndaily.com/stack",
      sourcePublishedAt: "Sept 19, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Senior Staff Engineer",
      readTimeMinutes: 8,
      halalStance: "positive",
    },
  ],
  "Research & Sacred-Ethics Review": [
    {
      id: "res-01",
      slug: "the-zakat-of-knowledge",
      category: "Research & Sacred-Ethics Review",
      headline: "The Zakat of Knowledge: Teaching the Next Cohort of Sovereign Builders",
      summary:
        "Senior Muslim tech operators reinvesting engineering expertise into sovereign open-source cohorts, apprentice fellowships, and ethical research labs.",
      editorialStatus: "VERIFIED",
      confidence: "HIGH",
      sourceName: "Sovereignty & Ethics Journal",
      sourceUrl: "https://thelanterndaily.com/about/editorial-standards",
      sourcePublishedAt: "Sept 18, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Ethics Advisory Board",
      readTimeMinutes: 7,
      halalStance: "positive",
    },
    {
      id: "res-02",
      slug: "fiqh-of-autonomous-agents",
      category: "Research & Sacred-Ethics Review",
      headline: "The Fiqh of Autonomous Agents: Delegation, Liability, and Amanah",
      summary:
        "Contemporary jurists dissect contractual agency (Wakalah) and tort liability when algorithmic agents execute financial transactions or API write operations autonomously.",
      editorialStatus: "EDITORIAL REVIEW",
      confidence: "ANALYSIS",
      sourceName: "OIC Fiqh Academy & Classical Review",
      sourceUrl: "https://thelanterndaily.com/about/editorial-standards",
      sourcePublishedAt: "Sept 22, 2026",
      lastVerifiedAt: "Sept 23, 2026",
      authorOrReviewer: "Fiqh & Technology Research Council",
      readTimeMinutes: 8,
      halalStance: "positive",
    },
  ],
};

export type MarketSignal = {
  name: string;
  value: string;
  change: string;
  up: boolean;
};

export const MARKET_SIGNALS: MarketSignal[] = [
  { name: "SP Funds S&P 500 Sharia (SPUS)", value: "$148.20", change: "+0.85%", up: true },
  { name: "Wahed FTSE USA Sharia (HLAL)", value: "$46.85", change: "+1.18%", up: true },
  { name: "Physical Gold (XAU/USD)", value: "$2,654.10", change: "+1.4%", up: true },
  { name: "H100 Compute / 1M Tok", value: "$0.42", change: "-6.3%", up: false },
  { name: "Agent API Spend (MoM)", value: "$2.1B", change: "+11.9%", up: true },
  { name: "Sharia Equity Liquidity", value: "$3.84B", change: "+4.2%", up: true },
];

export type StackTool = {
  name: string;
  desc: string;
  tag: string;
  howToUse?: string;
  downloadUrl?: string;
  downloadName?: string;
};

export type StackCategory = {
  label: string;
  blurb: string;
  tools: StackTool[];
};

export const OPERATOR_STACK: StackCategory[] = [
  {
    label: "Infra",
    blurb: "The compute, deploy, and edge layer that everything else runs on.",
    tools: [
      {
        name: "Vercel",
        desc: "Frontend cloud & edge runtime for Next.js applications.",
        tag: "Deploy",
        howToUse: "Deploy Next.js apps to global edge runtimes with zero-downtime CI/CD git hooks, edge middleware, and custom domain SSL.",
        downloadUrl: "/vault/vercel-production-runbook.md",
        downloadName: "Vercel Production Runbook",
      },
      { name: "Modal", desc: "Serverless GPU compute", tag: "Compute" },
      { name: "Cloudflare", desc: "Edge network & workers", tag: "Edge" },
      { name: "Neon", desc: "Serverless Postgres", tag: "Database" },
    ],
  },
  {
    label: "Models",
    blurb: "Foundation and open models powering generation and reasoning.",
    tools: [
      { name: "AI Gateway", desc: "Unified model routing", tag: "Routing" },
      {
        name: "Llama",
        desc: "Open-weight foundation models for private sovereign compute.",
        tag: "Open",
        howToUse: "Deploy sovereign open-weight models locally or on private GPU clusters via Ollama and vLLM without cloud data leaks.",
        downloadUrl: "/vault/llama-sovereign-compute-guide.md",
        downloadName: "Llama Sovereign Compute Guide",
      },
      {
        name: "Claude",
        desc: "Frontier reasoning & 200K long context for complex operations.",
        tag: "Frontier",
        howToUse: "Execute deep architectural reasoning, long-context (200K) document analysis, and deterministic XML tool-calling for autonomous agents.",
        downloadUrl: "/vault/claude-enterprise-operator-pack.md",
        downloadName: "Claude Enterprise Pack",
      },
      { name: "Mistral", desc: "Efficient open models", tag: "Open" },
    ],
  },
  {
    label: "Data",
    blurb: "Pipelines, vectors, and warehouses that feed the agents.",
    tools: [
      { name: "Upstash", desc: "Serverless Redis & vector", tag: "Cache" },
      { name: "DuckDB", desc: "In-process analytics", tag: "Analytics" },
      { name: "Supabase", desc: "Postgres + auth + storage", tag: "Backend" },
      { name: "dbt", desc: "Transformation layer", tag: "ETL" },
    ],
  },
  {
    label: "Apps",
    blurb: "The product surfaces operators actually ship to customers.",
    tools: [
      { name: "Next.js", desc: "Full-stack React framework", tag: "Framework" },
      { name: "Linear", desc: "Issue & roadmap tracking", tag: "PM" },
      { name: "Resend", desc: "Transactional email", tag: "Email" },
      { name: "Stripe", desc: "Payments & billing", tag: "Payments" },
    ],
  },
  {
    label: "Governance",
    blurb: "Controls, audit trails, and compliance for principled scale.",
    tools: [
      { name: "Sentry", desc: "Error & performance monitoring", tag: "Observability" },
      { name: "Vanta", desc: "Continuous compliance", tag: "Compliance" },
      { name: "PostHog", desc: "Product analytics", tag: "Analytics" },
      { name: "Audit Log", desc: "Immutable event trail", tag: "Audit" },
    ],
  },
];
