import Link from "next/link"
import TickerStrip from "@/components/TickerStrip"

export default function AboutPage() {
  return (
    <>
      <TickerStrip />
      <div className="page" style={{ paddingTop: "88px" }}>
        {/* Hero */}
        <section
          className="px-4 sm:px-6 md:px-12 py-16 md:py-20"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-[10px] mb-5"
            style={{ color: "var(--red)" }}
          >
            <span
              className="inline-block w-6 h-[1px]"
              style={{ background: "var(--red)" }}
            />
            About
          </div>
          <h1
            className="font-serif text-[40px] sm:text-[56px] font-black leading-[1.0] tracking-[-0.02em] mb-6"
            style={{ color: "var(--white)" }}
          >
            The Lantern
            <br />
            <em style={{ fontStyle: "italic", color: "var(--off-white)" }}>
              Daily.
            </em>
          </h1>
          <p
            className="text-[16px] font-light leading-[1.7] max-w-[600px]"
            style={{ color: "var(--muted)" }}
          >
            A daily intelligence brief for serious Muslim operators and
            AI-native builders.
          </p>
        </section>

        {/* Mission */}
        <section
          className="px-4 sm:px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div
              className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--muted)" }}
            >
              Mission
            </div>
            <h2
              className="font-serif text-[28px] font-bold leading-[1.2] mb-4"
              style={{ color: "var(--white)" }}
            >
              Signal Before Consensus.
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              The Lantern Daily delivers signal-before-consensus intelligence to
              Muslim founders, builders, and operators shaping the future of
              AI, halal tech, and digital infrastructure. Every morning, one
              brief. No noise. No fluff. Just the signal that matters.
            </p>
          </div>
          <div>
            <div
              className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--muted)" }}
            >
              Why It Exists
            </div>
            <h2
              className="font-serif text-[28px] font-bold leading-[1.2] mb-4"
              style={{ color: "var(--white)" }}
            >
              The Muslim tech space is moving fast.
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              The Muslim tech space is moving fast. The Lantern exists to cut
              through the noise and deliver the signal that matters — AI
              infrastructure, halal fintech, governance, and operator culture.
              Built by operators, for operators.
            </p>
          </div>
        </section>

        {/* Team */}
        <section
          className="px-4 sm:px-6 md:px-12 py-16"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-6"
            style={{ color: "var(--muted)" }}
          >
            Team
          </div>
          <h2
            className="font-serif text-[28px] font-bold leading-[1.2] mb-6"
            style={{ color: "var(--white)" }}
          >
            Built by RedLantern Studios.
          </h2>
          <p
            className="text-[14px] leading-[1.8] max-w-[600px]"
            style={{ color: "var(--muted)" }}
          >
            We&apos;re a team of operators building at the intersection of
            Islam, AI, and infrastructure. The Lantern Daily is our signal to
            the community we serve — intelligence before consensus, delivered
            every morning.
          </p>
        </section>

        {/* Subscribe CTA */}
        <div
          className="py-16 px-4 text-center"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2
            className="font-serif text-[32px] font-bold mb-4"
            style={{ color: "var(--white)" }}
          >
            Join the operators.
          </h2>
          <p
            className="text-[14px] mb-6 max-w-[400px] mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Get signal before consensus. Free to start. Serious when you&apos;re
            ready.
          </p>
          <Link
            href="/?subscribe=true"
            className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-[28px] py-[13px] no-underline inline-block"
            style={{ background: "var(--red)", color: "var(--white)" }}
          >
            Subscribe — Free
          </Link>
        </div>
      </div>
    </>
  );
}