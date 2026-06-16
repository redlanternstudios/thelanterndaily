import Link from "next/link";
import { MARKET_SIGNALS, OPERATOR_STACK } from "@/lib/content";

export default function SignalsAndStack() {
  return (
    <section className="grid gap-0.5 lg:grid-cols-2 bg-[var(--color-border)]">
      {/* Market signals table */}
      <div className="bg-[var(--color-bg)] p-7 sm:p-9">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
          <h2 className="kicker text-[13px]">Market Signals</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
            Live · 14 Jun
          </span>
        </div>
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="label-mono py-3 font-normal">Indicator</th>
              <th className="label-mono py-3 font-normal text-right">Value</th>
              <th className="label-mono py-3 font-normal text-right">Change</th>
            </tr>
          </thead>
          <tbody>
            {MARKET_SIGNALS.map((s) => (
              <tr key={s.name} className="border-t border-[var(--color-border-soft)]">
                <td className="py-3.5 text-sm text-[var(--color-text)]">{s.name}</td>
                <td className="py-3.5 text-right font-mono text-sm text-[var(--color-text)]">
                  {s.value}
                </td>
                <td
                  className={`py-3.5 text-right font-mono text-sm ${
                    s.up ? "text-[var(--color-gold)]" : "text-[var(--color-red)]"
                  }`}
                >
                  {s.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Operator stack showcase */}
      <div className="bg-[var(--color-bg)] p-7 sm:p-9">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
          <h2 className="kicker text-[13px]">Operator Stack</h2>
          <Link
            href="/stack"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
          >
            Full stack →
          </Link>
        </div>
        <ul className="mt-2">
          {OPERATOR_STACK.map((cat) => (
            <li
              key={cat.label}
              className="flex items-center gap-5 border-t border-[var(--color-border-soft)] py-4"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-red)] w-28 shrink-0">
                {cat.label}
              </span>
              <span className="flex flex-wrap gap-2">
                {cat.tools.map((t) => (
                  <span
                    key={t.name}
                    className="border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-text-dim)]"
                  >
                    {t.name}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
