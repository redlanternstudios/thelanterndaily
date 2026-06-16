import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import SubscribeCTA from "@/components/home/SubscribeCTA";
import { SOCIAL_PROOF } from "@/lib/content";

const PRINCIPLES = [
  {
    title: "Signal over noise",
    body: "We publish what changes how you build, not what trends. Every dispatch earns its place in your inbox.",
  },
  {
    title: "Principle over hype",
    body: "Technology carries the values of its makers. We cover the people building with intention and accountability.",
  },
  {
    title: "Open by default",
    body: "Knowledge is a trust to be shared. We document in the open and credit the work of others generously.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-12 sm:py-16">
        <header className="max-w-3xl">
          <span className="kicker">About</span>
          <h1 className="font-headline text-balance mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[var(--color-text)]">
            A Muslim-founded newsletter for the builders of the agent economy.
          </h1>
          <p className="mt-6 text-xl text-[var(--color-text-dim)] leading-relaxed text-pretty">
            The Lantern Daily is an independent Muslim-founded publication for
            founders, builders, and operators who want signal before consensus. We cover
            AI, markets, and tech through an Islamic lens — and we are read by{" "}
            {SOCIAL_PROOF}.
          </p>
        </header>

        <section className="mt-14 grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-[var(--color-card)] p-7">
              <span className="font-headline text-3xl text-[var(--color-red)]">
                {p.title}
              </span>
              <p className="mt-4 text-[var(--color-text-dim)] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-16">
          <SubscribeCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
