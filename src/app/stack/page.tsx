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
                    className="card-hover bg-[var(--color-bg)] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="label-mono text-[var(--color-gold)]">
                          {tool.tag}
                        </span>
                        {tool.downloadUrl && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded border border-[#4ADE80]/20">
                            Download Available
                          </span>
                        )}
                      </div>
                      <h3 className="font-headline text-xl mt-2 text-[var(--color-text)]">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-text-dim)] leading-relaxed">
                        {tool.desc}
                      </p>

                      {tool.howToUse && (
                        <div className="mt-4 rounded-lg border border-[#2A2D35] bg-[#0E1017] p-3 text-xs">
                          <div className="mb-1 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#B8922A]">
                            <span>✦</span>
                            <span>How to Use</span>
                          </div>
                          <p className="leading-relaxed text-[#9CA3AF]">
                            {tool.howToUse}
                          </p>
                        </div>
                      )}
                    </div>

                    {tool.downloadUrl && (
                      <div className="mt-5 pt-3 border-t border-[#1F2430]">
                        <a
                          href={tool.downloadUrl}
                          download
                          className="inline-flex w-full items-center justify-center gap-2 rounded border border-[#B8922A]/40 bg-[#B8922A]/15 px-3 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#F7F2EE] transition-all hover:bg-[#B8922A] hover:text-black"
                          title={`Download ${tool.downloadName || tool.name}`}
                        >
                          <span>Download Runbook</span>
                          <span className="text-sm">↓</span>
                        </a>
                      </div>
                    )}
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
  );
}
