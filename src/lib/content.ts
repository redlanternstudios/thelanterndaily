export type Article = {
  slug: string;
  id: string;
  kicker: string;
  category: string;
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
    verdict: "positive" | "critical" | "blocked" | "nuanced" | "pending";
    editorialNote?: string;
    rulingSummary?: string;
    rulingDetail?: string;
    reviewedBy?: string;
    reviewedDate?: string;
    methodologyUrl?: string;
  };
};

// Image URLs — topic-matched per article
// In production, replace with Supabase-hosted uploads
const IMG = {
  // Hero: Muslim founders building AI — people at work, modern tech lab feel
  heroFounder: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop&q=80",

  // Video: live panel / operator teardown — people presenting on stage
  videoThumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=480&fit=crop&q=80",

  // Islamic Finance + On-Chain Settlement — abstract finance / gold / currency
  islamicFinance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=480&fit=crop&q=80",

  // Late-Night Build Log: Shipping Agents — developer at terminal late at night
  buildLog: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=480&fit=crop&q=80",

  // Architecture of Trust in Autonomous Systems — abstract server/network infrastructure
  autonomousTrust: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80",

  // Pair Programming With Models — two engineers at screen, collaborative coding
  pairProgramming: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80",

  // Patient Capital Thesis — investor meeting, boardroom, capital allocation
  patientCapital: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop&q=80",

  // Open Source as Strategy — open laptop, terminal, open code
  openSource: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop&q=80",

  // Zakat of Knowledge / Teaching — classroom, mentorship, knowledge transfer
  zakatKnowledge: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80",

  // Signals From the Gulf — Dubai skyline, Gulf capital, sovereign compute
  gulfSignals: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=80",

  // Governance Layer — compliance, audit, policy docs
  governanceLayer: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80",
};

export const SOCIAL_PROOF = "18,472+ builders, investors, and operators";

export const NAV_LINKS = [
  { label: "Today", href: "/" },
  { label: "AI", href: "/archive?cat=AI" },
  { label: "Markets", href: "/archive?cat=Markets" },
  { label: "Tech", href: "/archive?cat=Tech" },
  { label: "Stack", href: "/stack" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

export const TICKER_ITEMS = [
  "AI INFRASTRUCTURE",
  "HALAL FINTECH",
  "OPEN SOURCE AGENTS",
  "OPERATOR STACK",
  "MUSLIM-BUILT TECH",
  "FIELD NOTES",
  "MARKET SIGNALS",
  "FOUNDER INTELLIGENCE",
];

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
  category: "AI Infrastructure",
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

export const VIDEO_ARTICLE: Article = {
  slug: "inside-the-operator-stack-live",
  id: "inside-the-operator-stack-live",
  kicker: "Video / Briefing",
  title: "Inside the Operator Stack: A Live Teardown",
  excerpt:
    "We sit down with three builders to dissect the tools running their companies — and what they cut last quarter.",
  image: IMG.videoThumb,
  author: "The Lantern Daily",
  date: "June 13, 2026",

  originalDate: "June 10, 2026",
  readTime: "24 min watch",
  category: "Stack",
  video: true,
  youtubeId: "dQw4w9WgXcQ",
  duration: "12:04",
};

export const SECONDARY_ARTICLES: Article[] = [
  {
    slug: "islamic-finance-meets-onchain-settlement",
  id: "islamic-finance-meets-onchain-settlement",
    kicker: "Markets",
    title: "Islamic Finance Meets On-Chain Settlement",
    excerpt:
      "Sharia-compliant rails are quietly going programmable. Here is what changed this month.",
    image: IMG.islamicFinance,
    author: "The Lantern Daily",
    date: "June 12, 2026",
    readTime: "7 min read",
    category: "Markets",
  },
  {
    slug: "the-late-night-build-log",
  id: "the-late-night-build-log",
    kicker: "Tech",
    title: "The Late-Night Build Log: Shipping Agents in Production",
    excerpt:
      "What breaks when autonomous agents touch real revenue — and the guardrails that hold.",
    image: IMG.buildLog,
    author: "The Lantern Daily",
    date: "June 11, 2026",
    readTime: "9 min read",
    category: "Tech",
  },
];

export const GRID_ARTICLES: Article[] = [
  {
    slug: "architecture-of-trust",
  id: "architecture-of-trust",
    kicker: "AI",
    title: "The Architecture of Trust in Autonomous Systems",
    excerpt: "How leading teams design for accountability before scale.",
    image: IMG.autonomousTrust,
    author: "The Lantern Daily",
    date: "June 10, 2026",
    readTime: "6 min read",
    category: "AI",
  },
  {
    slug: "pair-programming-with-models",
  id: "pair-programming-with-models",
    kicker: "Tech",
    title: "Pair Programming With Models, Not Around Them",
    excerpt: "Two engineers on rebuilding their workflow from the terminal up.",
    image: IMG.pairProgramming,
    author: "The Lantern Daily",
    date: "June 9, 2026",
    readTime: "8 min read",
    category: "Tech",
  },
  {
    slug: "the-patient-capital-thesis",
  id: "the-patient-capital-thesis",
    kicker: "Markets",
    title: "The Patient Capital Thesis for AI-Native Founders",
    excerpt: "An investor on why conviction beats momentum in this cycle.",
    image: IMG.patientCapital,
    author: "The Lantern Daily",
    date: "June 8, 2026",
    readTime: "10 min read",
    category: "Markets",
  },
  {
    slug: "open-source-as-strategy",
  id: "open-source-as-strategy",
    kicker: "Open Source",
    title: "Open Source as Strategy, Not Charity",
    excerpt: "Why a Detroit team gave away its agent runtime — and won.",
    image: IMG.openSource,
    author: "The Lantern Daily",
    date: "June 7, 2026",
    readTime: "5 min read",
    category: "Tech",
  },
];

export const ALL_ARTICLES: Article[] = [
  HERO_ARTICLE,
  VIDEO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...GRID_ARTICLES,
  {
    slug: "the-zakat-of-knowledge",
  id: "the-zakat-of-knowledge",
    kicker: "Field Notes",
    title: "The Zakat of Knowledge: Teaching the Next Cohort",
    excerpt: "Operators are reinvesting expertise into open cohorts. A field report.",
    image: IMG.zakatKnowledge,
    author: "The Lantern Daily",
    date: "June 6, 2026",
    readTime: "7 min read",
    category: "AI",
  },
  {
    slug: "signals-from-the-gulf",
  id: "signals-from-the-gulf",
    kicker: "Markets",
    title: "Signals From the Gulf: Capital Meets Compute",
    excerpt: "Sovereign compute is reshaping where models get trained.",
    image: IMG.gulfSignals,
    author: "The Lantern Daily",
    date: "June 5, 2026",
    readTime: "9 min read",
    category: "Markets",
  },
  {
    slug: "the-governance-layer",
  id: "the-governance-layer",
    kicker: "Governance",
    title: "The Governance Layer Nobody Wants to Build",
    excerpt: "Why the boring controls decide who survives the next audit.",
    image: IMG.governanceLayer,
    author: "The Lantern Daily",
    date: "June 4, 2026",
    readTime: "6 min read",
    category: "Tech",
  },
];

export const CATEGORIES = ["All", "AI", "Markets", "Tech", "Open Source", "Governance"];

// Ordered list for homepage destructuring: lead, videoCard, article2…article6
export const lanternArticles: Article[] = [
  HERO_ARTICLE,
  VIDEO_ARTICLE,
  ...SECONDARY_ARTICLES,
  ...GRID_ARTICLES,
];

export type MarketSignal = {
  name: string;
  value: string;
  change: string;
  up: boolean;
};

export const MARKET_SIGNALS: MarketSignal[] = [
  { name: "AI Infra Index", value: "1,284.6", change: "+3.4%", up: true },
  { name: "Open Model Adoption", value: "62.1%", change: "+1.2%", up: true },
  { name: "Sharia-Compliant Tech ETF", value: "$148.20", change: "-0.8%", up: false },
  { name: "Agent API Spend (MoM)", value: "$2.1B", change: "+11.9%", up: true },
  { name: "Compute Cost / 1M tok", value: "$0.42", change: "-6.3%", up: false },
  { name: "Founder Sentiment", value: "71 / 100", change: "+4 pts", up: true },
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
