import Link from "next/link";

export default function SectionDivider({
  label,
  href,
  cta = "View all",
}: {
  label: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--color-border)] pb-3">
      <h2 className="kicker text-[13px]">{label}</h2>
      {href && (
        <Link
          href={href}
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
        >
          {cta} →
        </Link>
      )}
    </div>
  );
}
