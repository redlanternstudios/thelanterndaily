import Image from "next/image";
import { LanternMasthead } from "@/components/LanternMasthead";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import { lanternArticles } from "@/data/lanternArticles";

export default function HomePage() {
  const [lead, videoCard, article2, article3, article4, article5, article6] =
    lanternArticles;

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── HERO: TEXT PANEL LEFT + FULL BLEED IMAGE RIGHT ─────── */}
        <section
          className="desktop-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.15fr",
            gap: "2px",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          {/* Lead text panel */}
          <article
            className="card"
            style={{
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "2px solid var(--red)",
              minHeight: "430px",
            }}
          >
            <div>
              <div className="kicker" style={{ marginBottom: "20px" }}>
                {lead.category}
              </div>
              <h1
                style={{
                  fontSize: "42px",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                }}
              >
                {lead.title}
              </h1>
              <p className="excerpt" style={{ fontSize: "17px", marginBottom: "28px" }}>
                {lead.excerpt}
              </p>
            </div>
            <div>
              <div className="byline" style={{ marginBottom: "20px" }}>
                {lead.author} · {lead.date} · {lead.readTime}
              </div>
              <a href={`/article/${lead.id}`} className="join-button" style={{ display: "inline-block" }}>
                Read the story →
              </a>
            </div>
          </article>

          {/* Lead image — full bleed */}
          <div className="article-image" style={{ minHeight: "430px" }}>
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </section>

        {/* ── VIDEO + 2 ARTICLES ─────────────────────────────────── */}
        <section
          className="desktop-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.7fr 0.7fr",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          <ArticleCard article={videoCard} imageHeight="260px" />
          <ArticleCard article={article2} imageHeight="260px" />
          <ArticleCard article={article3} imageHeight="260px" />
        </section>

        {/* ── SECTION LABEL ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "48px 0 24px",
          }}
        >
          <div
            className="kicker"
            style={{ fontSize: "10px", letterSpacing: "0.2em" }}
          >
            Latest Intelligence
          </div>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "var(--border)",
            }}
          />
        </div>

        {/* ── 4-COLUMN ARTICLE GRID ──────────────────────────────── */}
        <section
          className="article-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          <ArticleCard article={article5} imageHeight="190px" />
          <ArticleCard article={article6} imageHeight="190px" />
          <ArticleCard article={article2} imageHeight="190px" />
          <ArticleCard article={article3} imageHeight="190px" />
        </section>

        {/* ── PULL QUOTE ─────────────────────────────────────────── */}
        <div className="quote-block">
          <p className="quote-text">
            &ldquo;The builders who will define the next decade aren&apos;t in Silicon
            Valley. They&apos;re in Karachi, Cairo, Amman, and Kuala Lumpur —
            and they&apos;re building on their own terms.&rdquo;
          </p>
          <div className="byline" style={{ marginTop: "24px" }}>
            The Lantern Daily Editorial · June 2026
          </div>
        </div>

        {/* ── MARKET SIGNALS + OPERATOR STACK ───────────────────── */}
        <section
          className="two-column"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          {/* Market Signals */}
          <div className="card">
            <div className="card-body">
              <div className="kicker" style={{ marginBottom: "24px" }}>
                Market Signals
              </div>
              <table className="market-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Signal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BTC/USD</td>
                    <td>$68,420</td>
                    <td className="val-up">+2.4%</td>
                    <td><span className="signal-bullish">↑ BULLISH</span></td>
                  </tr>
                  <tr>
                    <td>ETH/USD</td>
                    <td>$3,812</td>
                    <td className="val-up">+1.8%</td>
                    <td><span className="signal-bullish">↑ BULLISH</span></td>
                  </tr>
                  <tr>
                    <td>NVDA</td>
                    <td>$1,142</td>
                    <td className="val-down">-0.6%</td>
                    <td><span className="signal-neutral">→ NEUTRAL</span></td>
                  </tr>
                  <tr>
                    <td>MSFT</td>
                    <td>$428</td>
                    <td className="val-up">+0.9%</td>
                    <td><span className="signal-bullish">↑ BULLISH</span></td>
                  </tr>
                  <tr>
                    <td>AAPL</td>
                    <td>$212</td>
                    <td className="val-down">-1.1%</td>
                    <td><span className="signal-neutral">→ NEUTRAL</span></td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--dim)",
                  marginTop: "16px",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                Data delayed · Not financial advice · For informational purposes only
              </p>
            </div>
          </div>

          {/* Operator Stack Showcase */}
          <div className="card">
            <div className="card-body">
              <div className="kicker" style={{ marginBottom: "6px" }}>
                Operator Stack Showcase
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", lineHeight: 1.5 }}>
                Tools the operators we cover are actually running in production.
              </p>
              {[
                { cat: "Infra", tools: ["AWS", "Cloudflare", "Vercel", "GitHub"] },
                { cat: "Models", tools: ["OpenAI", "Anthropic", "Google", "Perplexity"] },
                { cat: "Data", tools: ["PostgreSQL", "Snowflake", "Hex", "Apify"] },
                { cat: "Apps", tools: ["Notion", "Linear", "Figma", "Slack"] },
                { cat: "Governance", tools: ["1Password", "Sentry", "Datadog", "Vanta"] },
              ].map((row) => (
                <div
                  key={row.cat}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                    gap: "12px",
                  }}
                >
                  <span
                    className="kicker"
                    style={{ fontSize: "9px", letterSpacing: "0.12em" }}
                  >
                    {row.cat}
                  </span>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {row.tools.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "12px",
                          color: "var(--off)",
                          fontFamily: "Space Mono, monospace",
                          fontWeight: 400,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <a
                href="/stack"
                className="btn outline"
                style={{ display: "inline-block", marginTop: "16px", fontSize: "11px" }}
              >
                Full Stack Guide →
              </a>
            </div>
          </div>
        </section>

        {/* ── SUBSCRIBE CTA ──────────────────────────────────────── */}
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "64px",
            textAlign: "center",
            margin: "2px 0",
          }}
        >
          <div className="kicker" style={{ marginBottom: "16px" }}>
            Muslim-Built · AI-Native · Signal Over Noise
          </div>
          <h2 style={{ marginBottom: "16px", fontSize: "40px" }}>
            Intelligence for the operators building what&apos;s next.
          </h2>
          <p className="excerpt" style={{ maxWidth: "520px", margin: "0 auto 32px" }}>
            Weekly signals from inside the AI-native Muslim tech ecosystem.
            Built for founders, engineers, and operators who build.
          </p>
          <SubscribeForm variant="hero" />
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
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
              <a href="/halal">Halal Standards</a>
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
