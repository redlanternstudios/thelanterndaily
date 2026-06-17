import { LanternMasthead } from "@/components/LanternMasthead";
import { SubscribeForm } from "@/components/SubscribeForm";
import { getMarketSignals, type LanternMarketSignal } from "@/lib/lantern/queries";

export const revalidate = 300; // Refresh every 5 min — signals update daily but cache is cheap

export const metadata = {
  title: "Market Signals · Halal-Screened | The Lantern Daily",
  description:
    "Daily halal-screened market signals for equities and crypto. Musaffa-verified. Educational purposes only — not financial advice.",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function statusColor(status: string | null): string {
  if (status === "compliant") return "#16a34a";
  if (status === "questionable") return "#ca8a04";
  if (status === "non-compliant") return "#D92532";
  return "var(--dim)";
}

function statusLabel(status: string | null): string {
  if (status === "compliant") return "COMPLIANT";
  if (status === "questionable") return "QUESTIONABLE";
  if (status === "non-compliant") return "NON-COMPLIANT";
  return "UNSCREENED";
}

// ── Signal Card ────────────────────────────────────────────────────────────────

function SignalCard({ s }: { s: LanternMarketSignal }) {
  const up = (s.change_pct ?? 0) >= 0;
  const color = statusColor(s.halal_status);
  const label = statusLabel(s.halal_status);

  return (
    <div
      className="card"
      style={{ borderTop: "2px solid var(--border)" }}
    >
      <div className="card-body">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--off)",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              {s.ticker}
            </div>
            <div style={{ fontSize: "12px", color: "var(--dim)" }}>
              {s.name ?? s.ticker} · {s.asset_class.toUpperCase()}
            </div>
          </div>

          {/* Price + change */}
          <div style={{ textAlign: "right" }}>
            {s.price != null && (
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--off)",
                  marginBottom: "2px",
                }}
              >
                {s.asset_class === "crypto"
                  ? `$${Number(s.price).toLocaleString()}`
                  : `$${Number(s.price).toFixed(2)}`}
              </div>
            )}
            {s.change_pct != null && (
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: up ? "#16a34a" : "var(--red)",
                }}
              >
                {up ? "+" : ""}
                {Number(s.change_pct).toFixed(2)}%
              </div>
            )}
          </div>
        </div>

        {/* Halal status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "3px 8px",
            background: `${color}15`,
            borderRadius: "2px",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color,
              letterSpacing: "0.1em",
              fontWeight: 700,
            }}
          >
            {label}
          </span>
          {s.halal_source && (
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "var(--dim)",
              }}
            >
              · {s.halal_source.toUpperCase()}
            </span>
          )}
        </div>

        {/* Editorial signal note */}
        {s.signal_note && (
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              lineHeight: 1.65,
              marginBottom: "14px",
            }}
          >
            {s.signal_note}
          </p>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color: "var(--dim)",
              letterSpacing: "0.1em",
            }}
          >
            {s.signal ? s.signal.toUpperCase() : "WATCH"}
          </span>
          {s.source_url && (
            <a
              href={s.source_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "var(--red)",
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              Verify on Musaffa →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function MarketsPage() {
  const signals = await getMarketSignals(12);

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <header
          style={{
            padding: "48px 0 28px",
            borderBottom: "1px solid var(--border)",
            marginBottom: "32px",
          }}
        >
          <div
            className="kicker"
            style={{ fontSize: "10px", letterSpacing: "0.2em", marginBottom: "12px" }}
          >
            Daily · Halal-Screened · DeepSeek Editorial
          </div>
          <h1
            style={{
              fontSize: "48px",
              lineHeight: 1.05,
              fontFamily: "Georgia, serif",
              marginBottom: "16px",
            }}
          >
            Market <span style={{ color: "var(--red)" }}>Signals</span>
          </h1>
          <p
            className="excerpt"
            style={{ fontSize: "16px", maxWidth: "560px", marginBottom: "20px" }}
          >
            Halal-screened equities and crypto tracked daily by TradeSwarm. Musaffa-verified.
            DeepSeek-powered editorial analysis. Updated each market day.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color: "var(--dim)",
              letterSpacing: "0.1em",
            }}
          >
            <span>⚠ NOT FINANCIAL ADVICE</span>
            <span>·</span>
            <span>EDUCATIONAL PURPOSES ONLY</span>
            <span>·</span>
            <span>PRICES DELAYED</span>
            <span>·</span>
            <span>HALAL STATUS VIA MUSAFFA / ZOYA</span>
          </div>
        </header>

        {/* ── DISCLAIMER BANNER ────────────────────────────────────── */}
        <div
          style={{
            background: "rgba(201, 168, 76, 0.06)",
            border: "1px solid rgba(201, 168, 76, 0.2)",
            borderLeft: "3px solid #C9A84C",
            padding: "10px 16px",
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color: "#C9A84C",
              letterSpacing: "0.12em",
              paddingTop: "1px",
              whiteSpace: "nowrap",
            }}
          >
            ⚠ DISCLAIMER
          </span>
          <p
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Signals are informational only. Scholarly opinions on halal permissibility vary —
            verify with a qualified scholar before making any financial decision. Prices are
            delayed. TradeSwarm is a paper-trading engine and is not connected to any brokerage.
          </p>
        </div>

        {/* ── SIGNAL GRID ──────────────────────────────────────────── */}
        {signals.length > 0 ? (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2px",
              marginBottom: "48px",
            }}
          >
            {signals.map((s) => (
              <SignalCard key={s.id} s={s} />
            ))}
          </section>
        ) : (
          <div
            style={{
              padding: "80px 0",
              textAlign: "center",
              border: "1px solid var(--border)",
              marginBottom: "48px",
            }}
          >
            <div className="kicker" style={{ marginBottom: "12px" }}>
              Signals Incoming
            </div>
            <p style={{ fontSize: "14px", color: "var(--dim)", maxWidth: "360px", margin: "0 auto" }}>
              Market Watch is coming online. TradeSwarm integration launches daily
              halal-screened signals starting June 18, 2026.
            </p>
          </div>
        )}

        {/* ── TRADESWARM ATTRIBUTION ───────────────────────────────── */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--dim)",
            padding: "20px 24px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color: "var(--dim)",
              letterSpacing: "0.15em",
              marginBottom: "8px",
            }}
          >
            POWERED BY TRADESWARM · PAPER TRADING ONLY
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            TradeSwarm is a paper-trading research engine built by RedLantern Studios. It does not
            execute real trades and is not connected to any brokerage. All signals are generated
            for educational research purposes only.
          </p>
        </div>

        {/* ── SUBSCRIBE CTA ────────────────────────────────────────── */}
        <section
          id="subscribe"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "56px 64px",
            textAlign: "center",
            marginBottom: "2px",
          }}
        >
          <div className="kicker" style={{ marginBottom: "16px" }}>
            Get Signals in Your Inbox
          </div>
          <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>
            Weekly halal market intelligence — free.
          </h2>
          <p
            className="excerpt"
            style={{ maxWidth: "480px", margin: "0 auto 28px", fontSize: "15px" }}
          >
            Delivered each week. Musaffa-screened. Scholar notes where disagreement exists.
          </p>
          <SubscribeForm variant="hero" />
          <p
            style={{
              fontSize: "10px",
              color: "var(--dim)",
              marginTop: "14px",
              fontFamily: "Space Mono, monospace",
            }}
          >
            NOT FINANCIAL ADVICE · EDUCATIONAL PURPOSES ONLY
          </p>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="brand-title" style={{ fontSize: "22px", marginBottom: "12px" }}>
                <span>The </span>
                <span className="text-red">Lantern</span>
                <span> D</span>
                <span className="text-red">AI</span>
                <span>LY</span>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.6, maxWidth: "280px" }}>
                Muslim-built. AI-native. Signal over noise. Intelligence for the operators who build.
              </p>
            </div>
            <div className="footer-col">
              <h4>Coverage</h4>
              <a href="/stack">Operator Stack</a>
              <a href="/markets">Market Signals</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/archive">Archive</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="/about">About</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/disclosure">Affiliate Disclosure</a>
              <a href="/halal/standards">Halal Standards</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 By Red, LLC · thelanterndaily.com</span>
            <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
