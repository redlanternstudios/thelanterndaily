export default function PullQuote() {
  return (
    <section className="border-l-2 border-[var(--color-red)] bg-[var(--color-card)] px-7 py-10 sm:px-12 sm:py-14">
      <blockquote className="font-headline italic text-balance text-2xl sm:text-3xl lg:text-[34px] leading-[1.3] text-[var(--color-text)] max-w-4xl">
        “We are not building to disrupt for its own sake. We are building because
        the tools we needed did not exist, and because someone has to do the work
        with intention.”
      </blockquote>
      <figcaption className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-dim)]">
        <span className="text-[var(--color-red)]">—</span> Amina Diallo, founder &amp;
        operator, on the ethic behind the build
      </figcaption>
    </section>
  );
}
