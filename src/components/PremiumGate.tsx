import { ReactNode } from "react";

interface PremiumGateProps {
  children: ReactNode;
  previewWords?: number;
}

export default function PremiumGate({ children }: PremiumGateProps) {
  return (
    <div className="relative">
      <div style={{ maxHeight: 400, overflow: "hidden" }}>{children}</div>
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          background: "linear-gradient(transparent, #07080D 55%)",
          padding: "80px 0 40px",
          textAlign: "center",
        }}
      >
        <div
          className="mx-auto max-w-sm px-6 py-7"
          style={{
            border: "1px solid var(--color-gold)",
            background: "rgba(201, 168, 76, 0.06)",
          }}
        >
          <p className="label-gold mb-3">Premium Intelligence</p>
          <h3
            className="font-headline text-[var(--color-text)] mb-2"
            style={{ fontSize: 20, fontWeight: 700 }}
          >
            Unlock Full Intelligence
          </h3>
          <p className="text-xs text-[var(--color-text-dim)] leading-relaxed mb-5">
            Premium operators get the full Weekly Brief, all signals, and the complete intelligence archive.
          </p>

          <div className="flex items-end justify-center gap-6 mb-5 font-mono">
            <div className="text-center">
              <div className="text-[var(--color-text)] font-bold text-lg">$9.99</div>
              <div className="text-[var(--color-text-dim)] text-[10px] uppercase tracking-widest mt-0.5">/ mo</div>
            </div>
            <div className="text-center">
              <div className="text-[var(--color-gold)] font-bold text-lg">$99.99</div>
              <div className="text-[var(--color-text-dim)] text-[10px] uppercase tracking-widest mt-0.5">/ yr</div>
            </div>
            <div className="text-center">
              <div className="text-[var(--color-text-dim)] font-bold text-lg">$199.99</div>
              <div className="text-[var(--color-text-dim)] text-[10px] uppercase tracking-widest mt-0.5">lifetime</div>
            </div>
          </div>

          <button
            className="w-full font-mono text-[11px] font-bold uppercase tracking-[0.14em] py-3 transition-opacity hover:opacity-90"
            style={{
              background: "var(--color-gold)",
              color: "#07080D",
              border: "none",
              cursor: "pointer",
            }}
          >
            Unlock Full Intelligence
          </button>
        </div>
      </div>
    </div>
  );
}
