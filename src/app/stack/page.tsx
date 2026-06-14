<<<<<<< HEAD
import Image from "next/image";
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import SubscribeCTA from "@/components/home/SubscribeCTA";
import { OPERATOR_STACK, SOCIAL_PROOF } from "@/lib/content";

const INFO_ROW = [
  { stat: "5", label: "Layers mapped", sub: "Infra to governance" },
  { stat: "20+", label: "Tools profiled", sub: "Updated monthly" },
  { stat: SOCIAL_PROOF.split(" ")[0], label: "Operators reading", sub: "And growing" },
];

export default function StackPage() {
  return (
    <>
      <Masthead />
      <Ticker />
      <main>
        {/* Hero: text + image */}
        <section className="grid gap-0.5 lg:grid-cols-2 bg-[var(--color-border)]">
          <div className="bg-[var(--color-bg)] flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="kicker">The Operator Stack</span>
            <h1 className="font-headline text-balance mt-4 text-4xl sm:text-5xl leading-[1.08] text-[var(--color-text)]">
              The tools running the companies we cover.
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--color-text-dim)] leading-relaxed text-pretty">
              A living map of the infrastructure, models, data, apps, and
              governance layers that principled builders actually ship with —
              curated by The Lantern Daily.
            </p>
          </div>
          <div className="img-zoom relative min-h-[300px] lg:min-h-[460px] bg-[var(--color-card)]">
            <Image
              src="/images/stack-hero.png"
              alt="A systems architect studying infrastructure topology"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* 3-col info row */}
        <section className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 mt-0.5">
          <div className="grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-3">
            {INFO_ROW.map((item) => (
              <div key={item.label} className="bg-[var(--color-card)] p-7">
                <p className="font-headline text-5xl text-[var(--color-red)]">
                  {item.stat}
                </p>
                <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text)]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-dim)]">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 stack sections */}
        <section className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-0.5">
          {OPERATOR_STACK.map((cat) => (
            <div
              key={cat.label}
              className="grid gap-0.5 lg:grid-cols-[160px_1fr] bg-[var(--color-border)]"
            >
              {/* Vertical category label */}
              <div className="bg-[var(--color-card)] flex lg:flex-col items-start justify-between p-6">
                <span
                  className="font-headline text-3xl text-[var(--color-red)] lg:[writing-mode:vertical-rl] lg:rotate-180"
                  aria-hidden="true"
                >
                  {cat.label}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-dim)] max-w-[8rem] lg:mt-0 mt-auto self-end lg:self-start">
                  {cat.blurb}
                </span>
              </div>
              {/* 4 tool cards */}
              <div className="grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
                {cat.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="card-hover bg-[var(--color-bg)] p-6 flex flex-col"
                  >
                    <span className="label-mono text-[var(--color-blue)]">
                      {tool.tag}
                    </span>
                    <h3 className="font-headline text-xl mt-2 text-[var(--color-text)]">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-dim)] leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 pb-16">
          <SubscribeCTA />
        </div>
      </main>
      <Footer />
    </>
=======
import Link from "next/link";

export default function StackPage() {
  const stackItems = [
    { category: "Frontend", items: ["Next.js 15", "React 19", "Tailwind CSS v4", "Framer Motion"] },
    { category: "Backend", items: ["Next.js API Routes", "Supabase (PostgreSQL)", "Row Level Security"] },
    { category: "AI Pipeline", items: ["Claude (Anthropic)", "GPT-4o (OpenAI)", "DeepSeek"] },
    { category: "Infrastructure", items: ["Vercel (Hosting)", "Supabase (Database)", "GitHub (Source)", "Resend (Email)"] },
    { category: "Monitoring", items: ["Vercel Analytics", "Supabase Logs", "Custom Health Checks"] },
  ];

  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ padding: "40px 48px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Stack
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>
          The Stack
        </h1>
        <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "12px", maxWidth: "500px" }}>
          The tools, frameworks, and infrastructure that power The Lantern Daily. No hype. Just what ships.
        </p>
      </div>

      <div style={{ padding: "40px 48px 80px" }}>
        <div className="dashboard-grid">
          <div>
            {stackItems.map((group) => (
              <div key={group.category} style={{ marginBottom: "32px" }}>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "1px", background: "var(--red)" }} />
                  {group.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.items.map((item) => (
                    <span key={item} style={{
                      fontFamily: "var(--font-mono)", fontSize: "11px", padding: "8px 14px",
                      border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--off-white)",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ border: "1px solid var(--red-border)", background: "var(--red-dim)", padding: "24px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)", marginBottom: "12px" }}>
                Open Source
              </div>
              <p style={{ fontSize: "13px", color: "var(--off-white)", lineHeight: 1.5, marginBottom: "16px" }}>
                The Lantern Daily is built in the open. Fork it, learn from it, ship your own.
              </p>
              <Link
                href="https://github.com/RedLanternstudios/thelanterndaily"
                style={{
                  display: "block",
                  background: "var(--red)",
                  color: "var(--white)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "12px 0",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                View on GitHub →
              </Link>
            </div>

            <div style={{ border: "1px solid var(--border)", padding: "20px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>
                Built by
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "16px", color: "var(--white)", marginBottom: "4px" }}>
                RedLantern Studios
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)" }}>
                Muslim-Built · AI-Native
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
>>>>>>> origin/main
  );
}
