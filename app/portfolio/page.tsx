import { LanternMasthead } from "@/components/LanternMasthead";
import { SubscribeForm } from "@/components/SubscribeForm";
import { getHalalPortfolio, type LanternPortfolioPick } from "@/lib/lantern/queries";
import { BudgetCalculator } from "./BudgetCalculator";
import { PortfolioTable } from "./PortfolioTable";

export const revalidate = 3600; // Refresh hourly — portfolio picks change infrequently

export const metadata = {
  title: "Halal Portfolio Picks · Q3 2026 | The Lantern Daily",
  description:
    "A quarterly editorial watchlist of Musaffa-screened assets tracked by operators in the Lantern community. Educational purposes only — not financial advice.",
};

export default async function PortfolioPage() {
  const picks = await getHalalPortfolio("Q3 2026");

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <header
          style={{
            padding: "64px 0 32px",
            borderBottom: "1px solid var(--border)",
            marginBottom: "48px",
          }}
        >
          <div
            className="kicker"
            style={{ fontSize: "10px", letterSpacing: "0.2em", marginBottom: "16px" }}
          >
            Q3 2026 · Halal-Screened · Editorial Watch
          </div>
          <h1
            style={{
              fontSize: "56px",
              lineHeight: 1.05,
              fontFamily: "Georgia, serif",
              marginBottom: "20px",
            }}
          >
            Halal Portfolio <br />
            <span style={{ color: "var(--red)" }}>Picks</span>
          </h1>
          <p
            className="excerpt"
            style={{ fontSize: "18px", maxWidth: "600px", marginBottom: "24px" }}
          >
            A quarterly editorial watchlist of Musaffa-screened assets tracked by operators
            in the Lantern community. Not investment advice — a starting point for your own
            due diligence.
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
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
            <span>MUSAFFA-SCREENED</span>
            <span>·</span>
            <span>VERIFY INDEPENDENTLY</span>
          </div>
        </header>

        {picks.length === 0 ? (
          <div style={{ padding: "64px 0", textAlign: "center" }}>
            <div className="kicker" style={{ marginBottom: "12px" }}>
              Coming Soon
            </div>
            <p style={{ fontSize: "14px", color: "var(--dim)" }}>
              Portfolio picks are being finalized for Q3 2026.
            </p>
          </div>
        ) : (
          <>
            {/* ── PORTFOLIO TABLE ──────────────────────────────────── */}
            <section style={{ marginBottom: "48px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "16px",
                }}
              >
                <div
                  className="kicker"
                  style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                >
                  Full Watchlist · Click a row to expand rationale
                </div>
                <span
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "9px",
                    color: "var(--dim)",
                  }}
                >
                  {picks.length} TICKERS · Q3 2026
                </span>
              </div>
              <PortfolioTable picks={picks} />
            </section>

            {/* ── BUDGET CALCULATOR ────────────────────────────────── */}
            <section style={{ marginBottom: "48px" }}>
              <div
                className="kicker"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  marginBottom: "16px",
                }}
              >
                Budget Calculator · Illustrative Only
              </div>
              <BudgetCalculator picks={picks} />
            </section>
          </>
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
            SIGNALS INFORMED BY TRADESWARM · PAPER TRADING ONLY
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Market signals informing this watchlist are sourced from TradeSwarm, a paper-trading
            engine built by the RedLantern Studios team. TradeSwarm does not execute real trades
            and is not connected to any brokerage. All prices are delayed and informational only.
          </p>
        </div>

        {/* ── WAITLIST CTA ─────────────────────────────────────────── */}
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
            Get the Full Breakdown in Your Inbox
          </div>
          <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>
            Weekly halal market intelligence — free.
          </h2>
          <p
            className="excerpt"
            style={{
              maxWidth: "480px",
              margin: "0 auto 28px",
              fontSize: "15px",
            }}
          >
            Signals, rationale updates, and scholar notes delivered each week to operators
            who build.
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
              <div
                className="brand-title"
                style={{ fontSize: "22px", marginBottom: "12px" }}
              >
                <span>The </span>
                <span className="text-red">Lantern</span>
                <span> D</span>
                <span className="text-red">AI</span>
                <span>LY</span>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.6, maxWidth: "280px" }}>
                Muslim-built. AI-native. Signal over noise. Intelligence for the operators
                who build.
              </p>
            </div>
            <div className="footer-col">
              <h4>Coverage</h4>
              <a href="/stack">Operator Stack</a>
              <a href="/archive">Archive</a>
              <a href="/portfolio">Portfolio</a>
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
