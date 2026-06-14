import SubscribeForm from "@/components/SubscribeForm";
import { SOCIAL_PROOF } from "@/lib/content";

export default function SubscribeCTA() {
  return (
    <section
      id="subscribe"
      className="scroll-mt-24 border border-[var(--color-border)] bg-[var(--color-card)] px-7 py-12 sm:px-12 sm:py-16 text-center"
    >
      <span className="kicker">The Briefing</span>
      <h2 className="font-headline text-balance mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight text-[var(--color-text)]">
        Signal before consensus, every morning.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-text-dim)] leading-relaxed text-pretty">
        Join {SOCIAL_PROOF} who read The Lantern Daily for field notes, market
        signals, and the operator stack — written with intention for Muslim
        builders and everyone building alongside them.
      </p>
      <div className="mt-8">
        <SubscribeForm />
      </div>
    </section>
  );
}
