export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
    halal_badge?: import('./lanternTypes').HalalBadgeType;
  image: string;
  video?: boolean;
  duration?: string;
  body?: string; // HTML string — used in full article view
  premium?: boolean;
}

export const lanternArticles: Article[] = [
  {
    id: "ai-infrastructure-collapse",
    category: "AI Infrastructure",
    title: "The Infrastructure Collapse Nobody Is Talking About",
    excerpt:
      "Three major AI providers quietly throttled capacity this quarter. What it means for builders running production agents at scale.",
    author: "The Lantern Daily",
    date: "Jun 14, 2026",
    readTime: "6 min read",
    image: "/images/lantern/ai-infrastructure.jpg",
    body: `
      <p>The AI infrastructure story of Q2 2026 isn't the one everyone is telling. It's not about the next model release or who raised a Series B. It's about capacity — specifically, the quiet throttling three major providers implemented in April and May, and the downstream consequences for every team running production agents.</p>

      <h2>What Actually Happened</h2>
      <p>Between April 12 and May 8, response times on the highest-volume tiers increased by an average of 340ms per call across three major providers. None of this was communicated proactively. Operators who caught it did so through their own observability stacks. Those without that infrastructure found out from their customers first.</p>

      <blockquote>Capacity constraints don't announce themselves. They arrive as degraded latency, then subtle rate limits, then the kind of reliability gaps that only show up in production.</blockquote>

      <p>We spoke with 14 operators running production agent stacks across healthcare, legal, fintech, and e-commerce. The pattern was consistent: for teams running parallel agents, 340ms compounded into meaningful SLA breaches.</p>

      <h2>What You Should Be Monitoring</h2>
      <p>Three metrics consistently surfaced the problem before user-visible degradation: p95 latency per model call, token throughput variance over 15-minute windows, and rate of retry-triggered completions. If any of these move 20% in a four-hour window, you have a signal worth investigating immediately.</p>

      <p>The operators who came through cleanest had one thing in common: they'd wired PostHog event timing and Sentry performance traces directly to their model call layers. Not as an afterthought — as a prerequisite before shipping anything to production users.</p>

      <h2>The Routing Hedge</h2>
      <p>Three of the fourteen operators had implemented provider fallback routing before the throttling event. All three reported zero user-visible impact. The other eleven ranged from "minor degradation" to "full team incident." The tooling to implement this correctly — routing by latency percentile with automatic failover — is available today. The question is whether your team treats it as infrastructure or as optional optimization.</p>

      <p>It's infrastructure.</p>
    `,
  },
  {
    id: "video-signal-reliability",
    category: "Field Notes",
    title: "Agent Reliability: A Video Breakdown",
    excerpt:
      "Watch: We ran 200 agent tasks across five providers and recorded the failure modes. The results are not what you'd expect.",
    author: "The Lantern Daily",
    date: "Jun 13, 2026",
    readTime: "12 min watch",
    image: "/images/lantern/video-signal.jpg",
    video: true,
    duration: "12:04",
    body: `
      <p>We ran 200 automated agent tasks across five major AI providers over a three-week window. We recorded every failure, categorized every mode, and documented what actually went wrong vs. what the provider dashboards reported.</p>

      <p>The findings, broken down in the video above, don't align with how reliability is typically discussed in the space. The providers with the most polished status pages had some of the worst actual failure distributions. The providers with the least marketing noise had the most consistent tail behavior.</p>

      <h2>Key Finding: Failure Mode Distribution Matters More Than Uptime %</h2>
      <p>A 99.9% uptime number tells you almost nothing if the 0.1% is randomly distributed across your highest-stakes operations. The question isn't how often a provider fails — it's whether failures are predictable enough to build reliable retry and fallback logic around them.</p>

      <p>Three of the five providers we tested had highly clustered failure windows (failures tend to happen together, in short bursts). Two had randomly distributed failures. The clustered pattern is actually easier to handle in production. The random distribution is harder — your timeout and retry logic needs to be more sophisticated to catch it.</p>

      <h2>Watch the Full Breakdown</h2>
      <p>The video covers our methodology, the full failure taxonomy we built, provider-by-provider results, and the three infrastructure changes we'd recommend making before running any agent in production that a user depends on.</p>
    `,
  },
  {
    id: "agent-reliability-benchmarks",
    category: "AI Infrastructure",
    title: "The Real Agent Reliability Numbers Across Five Providers",
    excerpt:
      "We tested 200 automated workflows. Here's what actually broke, what held, and which providers are lying in their uptime dashboards.",
    author: "The Lantern Daily",
    date: "Jun 13, 2026",
    readTime: "8 min read",
    image: "/images/lantern/agent-reliability.jpg",
    body: `
      <p>Uptime dashboards are marketing. The only number that matters for your production agent stack is: what percentage of my tasks complete successfully end-to-end, under real load, over a sustained period?</p>

      <p>We ran 200 tasks across five providers. Here's what we found.</p>

      <h2>The Numbers</h2>
      <p>Provider A: 94.2% end-to-end completion. Provider B: 91.8%. Provider C: 96.1%. Provider D: 88.4%. Provider E: 95.7%. All five had status pages claiming 99.9% uptime during the same period. The gap between "uptime" and "your tasks completing" ranges from 3.8 to 11.5 percentage points. That gap is where your users live.</p>

      <blockquote>The provider with the best status page had the second-worst end-to-end completion rate. Never confuse a provider's infrastructure reliability with your workflow reliability.</blockquote>

      <h2>What Was Breaking</h2>
      <p>Timeout handling was the dominant failure class at 43% of failures. Context window overflow was second at 28%. Rate limit mismatches (the provider's limit vs. what was documented) were third at 19%. Everything else combined was 10%. The first two are solvable with engineering. The third requires either provider negotiation or routing logic that monitors your real-time rate headroom.</p>

      <h2>Our Recommendations</h2>
      <p>Run a 30-task pilot on any new provider before production. Log every failure. Build your retry logic based on actual failure distribution from that pilot — not from the provider's documentation. And always run at least two providers in parallel, even at low volume, so you have real performance data when you need to switch.</p>
    `,
  },
  {
    id: "product-ai-playbook",
    category: "Product",
    title: "The AI Product Playbook Muslim Founders Aren't Using",
    excerpt:
      "Authenticity, trust, and community aren't soft advantages — they're durable moats. Here's how to build them into your product architecture from day one.",
    author: "The Lantern Daily",
    date: "Jun 12, 2026",
    readTime: "7 min read",
    image: "/images/lantern/product-ai.jpg",
    body: `
      <p>The AI product conversation is dominated by frameworks built for a specific type of founder, building for a specific type of user, in a specific geography. If you're building for Muslim communities — or building as a Muslim founder with your own community as your first users — the conventional playbook has serious gaps.</p>

      <h2>Trust Is Not a Feature. It's Architecture.</h2>
      <p>Most AI product teams treat trust as something you earn through reliability metrics and good design. That's true but incomplete. For communities where trust is extended through networks of relationship and reputation — not through brand logos and Silicon Valley press — you need to think about trust as something you architect into the product from the first commit.</p>

      <p>What that looks like in practice: who endorses your product, and how that endorsement is surfaced. How data flows and what control users have over it. Whether your AI is transparent about what it does and doesn't know. Whether there are human review layers where the stakes are high.</p>

      <blockquote>Authenticity isn't a marketing strategy. It's a design constraint. Build for it or you'll lose users the moment a better-aligned competitor appears.</blockquote>

      <h2>Community Before Scale</h2>
      <p>The standard playbook says: build the product, then build the community. For Muslim-built products targeting Muslim communities, invert this. The community is your distribution, your feedback channel, your trust infrastructure, and your growth engine. A product that launches with 200 deeply engaged users from your community is worth more than one that launches to 2,000 indifferent ones from a paid acquisition campaign.</p>

      <h2>What the Moat Actually Looks Like</h2>
      <p>Durable moats in this space aren't technical. They're relational. The data your product holds about its users, the community relationships that got built through using it, the trust that accumulated through reliability over time — these compound. They don't copy. Build for compounding, not for short-term growth metrics.</p>
    `,
  },
  {
    id: "islamic-finance-defi",
    category: "Halal Fintech",
    title: "Islamic Finance Principles Are DeFi's Missing Design Layer",
    excerpt:
      "Riba prohibition, risk-sharing, and asset-backing aren't constraints — they're architectural principles that solve problems DeFi has been chasing for five years.",
    author: "The Lantern Daily",
    date: "Jun 11, 2026",
    readTime: "9 min read",
    image: "/images/lantern/islamic-finance.jpg",
    premium: true,
    body: `
      <p>The problems DeFi has been trying to solve for five years — speculation without value, systemic fragility, misaligned incentive structures — are not new problems. Islamic finance has a 1,400-year-old framework for thinking about exactly these failure modes. The question is whether DeFi builders are paying attention.</p>

      <h2>Riba Is Not Just "No Interest"</h2>
      <p>The surface-level explanation of riba prohibition is "no interest-bearing instruments." The deeper principle is: value should not be created from the mere passage of time or from financial position alone. Value should be created through actual economic activity — through risk-taking, through the exchange of real goods and services, through productive use of capital. This is not a religious constraint on economic activity. It's an architectural principle that forces real economic value into every financial transaction.</p>

      <blockquote>What DeFi protocols call "yield" is often just riba dressed in smart contract logic. Islamic finance offers a cleaner alternative: profit from genuine economic activity, shared proportionally based on actual risk taken.</blockquote>

      <h2>Mudarabah and the Trust Problem</h2>
      <p>The mudarabah structure — where one party provides capital and another provides expertise, with profit split by agreement and loss borne by the capital provider — maps almost perfectly onto the relationship between protocol treasuries and protocol developers. The alignment problem that DAO governance has been struggling with for years has a classical solution in Islamic partnership law.</p>

      <h2>Asset-Backing as Systemic Stability</h2>
      <p>Every Islamic financial instrument must be backed by a real underlying asset. This is the rule that would have prevented the 2008 financial crisis. It's also the rule that DeFi keeps rediscovering after every collapse cycle — that leverage built on leverage built on leverage eventually finds its ground state in zero. The constraint isn't a limitation. It's a load-bearing wall.</p>

      <p>The builders who understand this — and who design protocols that work with these principles rather than around them — are positioning for the next wave of institutional adoption from a market that has been waiting for this infrastructure for decades.</p>
    `,
  },
  {
    id: "operator-stack-june",
    category: "Operator Stack",
    title: "What Operators Actually Shipped in June",
    excerpt:
      "A look at the real stack decisions — what got cut, what got promoted to production, and what nobody is publicly admitting was a mistake.",
    author: "The Lantern Daily",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    image: "/images/lantern/operator-stack.jpg",
    body: `
      <p>Every month we survey operators in our network about what they actually shipped vs. what they planned to ship. June's results were unusually honest — possibly because several teams had a rough Q2 and weren't in the mood to polish the story.</p>

      <h2>What Got Cut</h2>
      <p>The most common cut this month: real-time dashboards. Six operators who had planned real-time analytics surfaces pushed them to Q3, citing the same reason: the data infrastructure underneath wasn't trustworthy enough to surface live. They'd rather ship nothing than ship something that lies with confidence.</p>

      <p>This is actually a healthy signal. The "fake completeness" problem — shipping features that look done but aren't wired correctly underneath — is one of the most common ways AI teams lose user trust early.</p>

      <blockquote>Nothing destroys trust faster than a dashboard that shows confidently wrong numbers. Operators who delayed knew this. The ones who shipped anyway are in harder conversations now.</blockquote>

      <h2>What Got Promoted to Production</h2>
      <p>Evaluation frameworks were the standout theme. Teams that had been running AI features without systematic quality measurement built evals into their deployment pipelines this month. Not all of them — but enough that we're calling it a trend. The era of "ship and hope" for AI features is ending for serious operators.</p>

      <h2>What Nobody Is Admitting</h2>
      <p>Three separate operators told us, off the record, that they rolled back AI features that had been live for 60+ days because they couldn't trust the outputs at scale. Public postmortems: zero. This is normal — rollbacks aren't failures, they're corrections. But the silence around them means the community isn't learning from these decisions as fast as it should.</p>
    `,
  },
  {
    id: "field-notes-accelerator",
    category: "Field Notes",
    title: "Field Notes: Inside the First Muslim-Focused AI Accelerator Cohort",
    excerpt:
      "Eight founders. Six months. One shared thesis: that Muslim-built software deserves Muslim-led capital and Muslim-designed infrastructure.",
    author: "The Lantern Daily",
    date: "Jun 9, 2026",
    readTime: "10 min read",
    image: "/images/lantern/field-notes.jpg",
    body: `
      <p>The first cohort of the Alif accelerator wrapped its intensive program this month. Eight founders. Eight products. Six months of building inside a program that was itself a thesis statement: that Muslim-built software doesn't have to conform to the assumptions baked into the standard Silicon Valley playbook.</p>

      <h2>The Thesis</h2>
      <p>Most accelerators optimize for the same outcome: get to a number that unlocks a Series A from a recognizable firm. The Alif thesis was different. The goal was to build products that could sustain themselves through genuine community value — that didn't require VC timing to become real businesses, even if they eventually chose to raise capital.</p>

      <p>What this meant in practice: every founder was pushed to find paying users before building features. Every product decision was tested against: "does this make life meaningfully better for the people you say you're building for?"</p>

      <blockquote>The question "would a Muslim family trust this with their data?" turns out to be a higher bar than most standard security reviews. It forced founders to think about trust architecture in ways that most accelerators never surface.</blockquote>

      <h2>What They Built</h2>
      <p>The eight products span Islamic finance tools, educational platforms, community infrastructure, and halal supply chain tracking. What's notable isn't the category diversity — it's the design consistency. Every product, built independently by different founders, arrived at similar conclusions about trust, community ownership, and transparency. The shared cultural context produced convergent design principles without any coordination.</p>

      <h2>What Comes Next</h2>
      <p>Four of the eight founders are heading to Demo Day with live paying users. Two are in pilot with institutional partners. One closed a seed round during the program. One is extending another six months to get product-market fit right before raising. All eight are still building. That's the most accurate measure of whether the program worked.</p>
    `,
  },
];
