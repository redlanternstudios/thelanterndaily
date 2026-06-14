export type Article = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
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
  "ISLAMIC FINANCE",
  "OPEN SOURCE AGENTS",
  "OPERATOR STACK",
  "MUSLIM-BUILT TECH",
  "FIELD NOTES",
  "MARKET SIGNALS",
];

export const HERO_ARTICLE: Article = {
  slug: "the-quiet-rise-of-muslim-built-ai-infrastructure",
  kicker: "Field Notes",
  title: "The Quiet Rise of Muslim-Built AI Infrastructure",
  excerpt:
    "From Karachi to Cairo to Detroit, a new generation of founders is building the rails for the agent economy — and doing it on their own terms. We spent three months mapping the operators turning principle into product.",
  image: "/images/hero-founder.png",
  author: "Layla Rahman",
  date: "June 14, 2026",
  readTime: "11 min read",
  category: "AI",
};

export const VIDEO_ARTICLE: Article = {
  slug: "inside-the-operator-stack-live",
  kicker: "Video / Briefing",
  title: "Inside the Operator Stack: A Live Teardown",
  excerpt:
    "We sit down with three builders to dissect the tools running their companies — and what they cut last quarter.",
  image: "/images/video-thumb.png",
  author: "Yusuf Adeyemi",
  date: "June 13, 2026",
  readTime: "24 min watch",
  category: "Stack",
};

export const SECONDARY_ARTICLES: Article[] = [
  {
    slug: "islamic-finance-meets-onchain-settlement",
    kicker: "Markets",
    title: "Islamic Finance Meets On-Chain Settlement",
    excerpt:
      "Sharia-compliant rails are quietly going programmable. Here is what changed this month.",
    image: "/images/article-1.png",
    author: "Amina Diallo",
    date: "June 12, 2026",
    readTime: "7 min read",
    category: "Markets",
  },
  {
    slug: "the-late-night-build-log",
    kicker: "Tech",
    title: "The Late-Night Build Log: Shipping Agents in Production",
    excerpt:
      "What breaks when autonomous agents touch real revenue — and the guardrails that hold.",
    image: "/images/article-2.png",
    author: "Omar Haddad",
    date: "June 11, 2026",
    readTime: "9 min read",
    category: "Tech",
  },
];

export const GRID_ARTICLES: Article[] = [
  {
    slug: "architecture-of-trust",
    kicker: "AI",
    title: "The Architecture of Trust in Autonomous Systems",
    excerpt: "How leading teams design for accountability before scale.",
    image: "/images/grid-1.png",
    author: "Bilal Khan",
    date: "June 10, 2026",
    readTime: "6 min read",
    category: "AI",
  },
  {
    slug: "pair-programming-with-models",
    kicker: "Tech",
    title: "Pair Programming With Models, Not Around Them",
    excerpt: "Two engineers on rebuilding their workflow from the terminal up.",
    image: "/images/grid-2.png",
    author: "Sana Iqbal",
    date: "June 9, 2026",
    readTime: "8 min read",
    category: "Tech",
  },
  {
    slug: "the-patient-capital-thesis",
    kicker: "Markets",
    title: "The Patient Capital Thesis for AI-Native Founders",
    excerpt: "An investor on why conviction beats momentum in this cycle.",
    image: "/images/grid-3.png",
    author: "Fatima Al-Mansour",
    date: "June 8, 2026",
    readTime: "10 min read",
    category: "Markets",
  },
  {
    slug: "open-source-as-strategy",
    kicker: "Open Source",
    title: "Open Source as Strategy, Not Charity",
    excerpt: "Why a Detroit team gave away its agent runtime — and won.",
    image: "/images/grid-4.png",
    author: "Idris Mohammed",
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
    kicker: "Field Notes",
    title: "The Zakat of Knowledge: Teaching the Next Cohort",
    excerpt: "Operators are reinvesting expertise into open cohorts. A field report.",
    image: "/images/grid-2.png",
    author: "Khadija Noor",
    date: "June 6, 2026",
    readTime: "7 min read",
    category: "AI",
  },
  {
    slug: "signals-from-the-gulf",
    kicker: "Markets",
    title: "Signals From the Gulf: Capital Meets Compute",
    excerpt: "Sovereign compute is reshaping where models get trained.",
    image: "/images/grid-3.png",
    author: "Tariq Saleh",
    date: "June 5, 2026",
    readTime: "9 min read",
    category: "Markets",
  },
  {
    slug: "the-governance-layer",
    kicker: "Governance",
    title: "The Governance Layer Nobody Wants to Build",
    excerpt: "Why the boring controls decide who survives the next audit.",
    image: "/images/grid-1.png",
    author: "Mariam Cisse",
    date: "June 4, 2026",
    readTime: "6 min read",
    category: "Tech",
  },
];

export const CATEGORIES = ["All", "AI", "Markets", "Tech", "Open Source", "Governance"];

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
      { name: "Vercel", desc: "Frontend cloud & edge runtime", tag: "Deploy" },
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
      { name: "Llama", desc: "Open-weight foundation models", tag: "Open" },
      { name: "Claude", desc: "Reasoning & long context", tag: "Frontier" },
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
