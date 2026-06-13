import Link from "next/link";
import TickerStrip from "@/components/TickerStrip";
import IssueCard from "@/components/IssueCard";

interface IssuePageProps {
  params: Promise<{ slug: string }>;
}

const ISSUES: Record<string, {
  title: string;
  date: string;
  issueNumber: string;
  tier: "free" | "premium";
  category: string;
  body: string;
}> = {
  "agent-governance": {
    title: "Agent Governance Is the New Product Layer",
    date: "Jun 13, 2026",
    issueNumber: "Issue #007",
    tier: "premium",
    category: "AI Governance",
    body: `<p>The teams building AI products right now are making a mistake that will cost them. <strong>They're optimizing for capability when they should be optimizing for control.</strong></p>
<p>The next 18 months will determine which AI products earn lasting institutional trust. And the ones that do won't win on model quality — they'll win on governance infrastructure.</p>
<p>This is not a compliance story. It's a product strategy story.</p>
<p><strong>1. Audit trails are features, not compliance burdens.</strong> The best AI products will expose every decision the system made, why it made it, and what data it used.</p>
<p><strong>2. Control surfaces are user interfaces.</strong> The ability to override, constrain, and redirect an AI agent isn't a settings panel — it's the primary interaction model.</p>
<p><strong>3. Governance is the new moat.</strong> Once a product has earned institutional trust through transparent governance, switching costs become enormous.</p>
<p>The teams that build governance infrastructure now will own the trust layer.</p>`,
  },
  "memory-layer": {
    title: "Why Every Serious Operator Is Building a Memory Layer Now",
    date: "Jun 12, 2026",
    issueNumber: "Issue #006",
    tier: "free",
    category: "AI Systems",
    body: `<p>The difference between a demo and a product isn't the model. It's whether the system remembers what happened last time.</p>
<p>Every team building AI agents is discovering the same thing: the model is table stakes. The real differentiation comes from what the system remembers.</p>
<p>Three patterns emerged this week:</p>
<p>1. Episodic memory — remembering past interactions with specific users<br/>
2. Semantic memory — building knowledge graphs from accumulated data<br/>
3. Procedural memory — learning workflows from repeated patterns</p>
<p>The operators winning right now are the ones who treat memory as a first-class product concern.</p>`,
  },
  "alif-summit": {
    title: "What the Alif Summit Said About Where Muslim Tech Is Going",
    date: "Jun 11, 2026",
    issueNumber: "Issue #005",
    tier: "premium",
    category: "Field Notes",
    body: `<p>Three patterns from the room that tell you everything about the next 24 months.</p>
<p>1. Infrastructure over apps — every conversation circled back to who's building the rails.<br/>
2. Capital is following competence — investors are backing operators with track records.<br/>
3. The halal economy needs tooling — the most exciting startups are building the plumbing.</p>`,
  },
  "self-hosted-stack": {
    title: "The Real Self-Hosted Stack: n8n on Railway, Supabase",
    date: "Jun 10, 2026",
    issueNumber: "Issue #004",
    tier: "free",
    category: "Operator Stack",
    body: `<p>What serious Muslim builders are actually running under the hood and why the cloud tax is the first thing to cut.</p>
<p>n8n on Railway with Supabase gives you enterprise-grade automation for a fraction of the cost. Supabase for auth, storage, real-time DB; n8n for workflows; Railway for hosting.</p>
<p>Fully self-hosted. Scales linearly with usage. Shariah-compliant by default.</p>`,
  },
  "halal-finance-ai": {
    title: "Halal Finance Meets AI Infrastructure",
    date: "Jun 9, 2026",
    issueNumber: "Issue #003",
    tier: "premium",
    category: "Market Signal",
    body: `<p>The $341B Islamic finance market is getting its Rails 2.0 moment.</p>
<p>Several startups are building shariah-compliant payment rails. The infrastructure layer is where the real opportunity lives — not consumer apps.</p>`,
  },
  "governance-control": {
    title: "Who Controls the Control Layer",
    date: "Jun 8, 2026",
    issueNumber: "Issue #002",
    tier: "premium",
    category: "Governance",
    body: `<p>The teams that build governance infrastructure now will own the trust layer.</p>
<p>AI governance isn't a compliance problem — it's a product moat. Products that expose audit trails, control surfaces, and policy engines as features will win the enterprise deals.</p>`,
  },
  "first-signal": {
    title: "Welcome to The Lantern Daily",
    date: "Jun 7, 2026",
    issueNumber: "Issue #001",
    tier: "free",
    category: "Field Notes",
    body: `<p>Welcome. This is the first signal.</p>
<p>The Lantern Daily is the intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.</p>
<p>Every morning, you'll receive one brief covering the intersection of AI, halal tech, governance, and operator culture. Free to start. Premium when you're ready to go deeper.</p>
<p>Signal before consensus.</p>`,
  },
};

const RELATED = [
  { slug: "memory-agents-architecture", title: "Memory, Agents, Architecture", excerpt: "", date: "", tier: "free" as const, issueNumber: "Signal #012", category: "AI Systems", imageClass: "img-ai-systems" },
  { slug: "what-operators-shipping", title: "What Operators Are Actually Shipping", excerpt: "", date: "", tier: "premium" as const, issueNumber: "Signal #009", category: "Product Calls", imageClass: "img-product-calls" },
];

export default async function IssuePage({ params }: IssuePageProps) {
  const { slug } = await params;
  const issue = ISSUES[slug];

  if (!issue) {
    return (
      <>
        <TickerStrip />
        <div className="page" style={{ paddingTop: "140px" }}>
          <div className="text-center px-4 py-20">
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--red)" }}>404</div>
            <h1 className="font-serif text-[36px] font-bold mb-4" style={{ color: "var(--white)" }}>Signal not found</h1>
            <p className="text-[14px] mb-6" style={{ color: "var(--muted)" }}>This signal doesn&apos;t exist or has been moved.</p>
            <Link href="/archive" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase no-underline inline-block" style={{ color: "var(--red)" }}>Browse archive →</Link>
          </div>
        </div>
      </>
    );
  }

  const isPremium = issue.tier === "premium";

  return (
    <>
      <TickerStrip />
      <div className="page" style={{ paddingTop: "88px" }}>
        <section className="px-4 sm:px-6 md:px-12 py-16 md:py-20" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-4 mb-5">
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-[10px]" style={{ color: "var(--red)" }}>
              <span className="inline-block w-6 h-[1px]" style={{ background: "var(--red)" }} />
              {issue.category}
            </div>
            <span className={`font-mono text-[8px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] border ${isPremium ? "text-[var(--red)] border-[var(--red-border)]" : "text-[var(--muted)] border-[var(--dim)]"}`}>
              {isPremium ? "Premium" : "Free"}
            </span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[52px] font-black leading-[1.0] tracking-[-0.02em] mb-4" style={{ color: "var(--white)" }}>{issue.title}</h1>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: "var(--dim)" }}>{issue.date}</span>
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: "var(--dim)" }}>{issue.issueNumber}</span>
          </div>
        </section>

        <section className="max-w-[720px] mx-auto px-4 sm:px-6 py-12" style={{ borderBottom: "1px solid var(--border)" }}>
          {isPremium ? (
            <>
              <div className="text-[15px] leading-[1.8] premium-preview" style={{ color: "var(--muted)" }}>
                <div dangerouslySetInnerHTML={{ __html: issue.body.split(" ").slice(0, 60).join(" ") + "…" }} />
              </div>
              <div className="relative mt-8 pt-12 border-t text-center" style={{ borderColor: "var(--red-border)" }}>
                <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--gold)" }}>Premium Signal</div>
                <h3 className="font-serif text-[28px] font-bold mb-3" style={{ color: "var(--white)" }}>Unlock the Full Brief</h3>
                <p className="text-[14px] mb-6 max-w-[400px] mx-auto" style={{ color: "var(--muted)" }}>This signal is reserved for premium operators. Upgrade for the full intelligence archive, weekly brief, and early access.</p>
                <Link href="/?subscribe=true" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-[28px] py-[13px] no-underline inline-block" style={{ background: "var(--red)", color: "var(--white)" }}>Upgrade — $15/mo</Link>
              </div>
            </>
          ) : (
            <div className="text-[15px] leading-[1.8]" style={{ color: "var(--muted)" }}>
              <div dangerouslySetInnerHTML={{ __html: issue.body }} />
            </div>
          )}
        </section>

        <section className="px-4 sm:px-6 md:px-12 py-16">
          <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-6" style={{ color: "var(--muted)" }}>Related Signals</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px]" style={{ background: "var(--border)" }}>
            {RELATED.map((item) => (
              <IssueCard key={item.slug} slug={item.slug} title={item.title} excerpt={item.excerpt} date={item.date} tier={item.tier} issueNumber={item.issueNumber} category={item.category} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase no-underline flex items-center gap-[6px]" style={{ color: "var(--muted)" }}>← Back to archive</Link>
          </div>
        </section>
      </div>
    </>
  );
}
