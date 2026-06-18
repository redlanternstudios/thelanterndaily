import Link from "next/link";
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const STANDARDS = [
  {
    title: "Our Sources",
    body: "The Lantern's editorial analysis is grounded in the primary sources of Islamic law: the Quran, the Sunnah of the Prophet Muhammad (peace be upon him), and established fiqh principles within the Maliki, Hanafi, Shafi'i, and Hanbali schools — particularly as they apply to mu'amalat (transactions, business, and social dealings). We do not issue fatwa. We analyze technology and markets through an Islamic lens using existing scholarly consensus where it exists, and naming the range of opinion where scholars differ.",
  },
  {
    title: "Editorial Analysis vs. Religious Rulings",
    body: "The Lantern is an editorial publication, not a religious authority. Our halal stance labels represent our editorial team's analysis, not binding religious rulings. Where established scholarly consensus exists on a matter — such as the prohibition of riba (interest) in financial instruments — we state it clearly. Where scholars disagree on emerging technologies (AI image generation, digital contracts, cryptocurrency), we name the disagreement and explain the reasoning on both sides. We strongly encourage readers to consult their local scholars for personal religious guidance.",
  },
  {
    title: "The Four Stances",
    body: (
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>
          <strong className="text-[var(--color-text)]">HALAL-ALIGNED</strong> — 
          The technology, company, or practice is clearly permissible and aligned with Islamic values. Examples: open source infrastructure that enables community benefit, privacy-respecting tools, accessibility technology.
        </li>
        <li>
          <strong className="text-[var(--color-text)]">CRITICAL</strong> — 
          The technology or practice operates in a permissible space but exhibits patterns that conflict with Islamic ethics (manipulative design, exploitative business models, excessive gharar/uncertainty). We criticize the behavior, not the domain.
        </li>
        <li>
          <strong className="text-[var(--color-text)]">BLOCKED</strong> — 
          The practice is clearly prohibited by established Islamic principles. Examples: riba-based financial instruments, businesses built on haram revenue streams, platforms facilitating clearly prohibited activity.
        </li>
        <li>
          <strong className="text-[var(--color-text)]">NUANCED</strong> — 
          The matter involves genuine scholarly disagreement or emerging technology where fiqh principles have not been fully applied. We present the reasoning on multiple sides and invite scholarly feedback.
        </li>
      </ul>
    ),
  },
  {
    title: "Naming Disagreement",
    body: "Where the scholars differ, we name it. We do not pretend to a consensus that does not exist. Our editorial analysis will cite which scholars or schools take which positions, and we will update our analysis as scholarly guidance evolves. We welcome corrections and alternative reasoning from qualified scholars.",
  },
  {
    title: "The Editor",
    body: "The Lantern Daily is published by RedLantern Studios™. The founding editor is Ro — named here not as a religious authority but as the editorial voice responsible for the analysis. No credentials beyond editorial voice are claimed. The editor can be reached for scholarly feedback and correction via the contact form.",
  },
  {
    title: "Feedback & Correction",
    body: "If you are a scholar of Islam or a knowledgeable student of knowledge and believe our analysis contains errors, please contact us. We commit to: (1) responding within seven days, (2) correcting the record publicly if an error is confirmed, and (3) updating the editorial note on the affected article with the correction and acknowledgment.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <>
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/about"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-red)] hover:opacity-80"
          >
            ← Back to About
          </Link>

          <h1 className="font-headline text-balance mt-6 text-4xl sm:text-5xl leading-[1.05] text-[var(--color-text)]">
            Editorial Standards
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-dim)] leading-relaxed">
            The Lantern Daily&apos;s Islamic reasoning framework — our approach to
            analyzing technology and markets through the lens of faith.
          </p>

          <div className="mt-12 space-y-12">
            {STANDARDS.map((section, i) => (
              <section key={i}>
                <h2 className="font-headline text-2xl text-[var(--color-text)]">
                  {section.title}
                </h2>
                <div className="mt-3 text-[var(--color-text-dim)] leading-relaxed text-base">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--color-border)] pt-8">
            <p className="text-sm text-[var(--color-text-dim)]">
              Last updated: June 16, 2026 · RedLantern Studios™
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
