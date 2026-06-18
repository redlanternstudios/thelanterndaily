import Image from "next/image";
import { LanternMasthead } from "@/components/LanternMasthead";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import {
  getApprovedContent,
  getMarketSignals,
  getStackEntries,
  getHalalPortfolio,
  articleHref,
  formatDate,
  readTime,
  type LanternArticle,
  type LanternMarketSignal,
  type LanternPortfolioPick,
} from "@/lib/lantern/queries";

export const revalidate = 300;

function articleImage(a: LanternArticle): string | null {
  return a.image_url ?? null;
}

function toCardShape(a: LanternArticle) {
  return {
    id: a.id,
    category: a.category ?? "Intelligence",
    title: a.title,
    excerpt: a.excerpt ?? "",
    author: a.author ?? "The Lantern Daily",
    date: formatDate(a.published_at),
    readTime: readTime(a.read_time_minutes),
    image: articleImage(a) ?? undefined,
    video: a.content_type === "video",
    youtubeId: a.youtube_video_id ?? undefined,
    premium: a.is_premium,
    href: articleHref(a),
  };
}

function halalColor(status: string | null): string {
  if (status === "compliant") return "var(--green, #16a34a)";
  if (status === "questionable") return "var(--gold, #ca8a04)";
  if (status === "non-compliant") return "var(--red)";
  return "var(--dim)";
}

function halalLabel(status: string | null): string {
  if (status === "compliant") return "COMPLIANT";
  if (status === "questionable") return "QUESTIONABLE";
  if (status === "non-compliant") return "NON-COMPLIANT";
  return "UNSCREENED";
}

function SectionLabel({ label, href }: { label: string; href?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        margin: "48px 0 24px",
      }}
    >
      <div className="kicker" style={{ fontSize: "10px", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>
        {label}
      </div>
      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      {href && (
        <a
          href={href}
          style={{
            fontSize: "10px",
            color: "var(--dim)",
            textDecoration: "none",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          VIEW ALL →
        </a>
      )}
    </div>
  );
}

function MarketRow({ s }: { s: LanternMarketSignal }) {
  const up = (s.change_pct ?? 0) >= 0;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Ticker */}
      <div>
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--off)",
            marginBottom: "2px",
          }}
        >
          {s.ticker}
        </div>
        <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "Space Mono, monospace" }}>
          {s.asset_class.toUpperCase()}
        </div>
      </div>

      {/* Note */}
      <div>
        <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
          {s.signal_note ?? s.name ?? ""}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: halalColor(s.halal_status),
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.06em",
            marginTop: "3px",
          }}
        >
          {halalLabel(s.halal_status)}
          {s.halal_source ? ` · ${s.halal_source.toUpperCase()}` : ""}
        </div>
      </div>

      {/* Price + change */}
      <div style={{ textAlign: "right" }}>
        {s.price != null && (
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "12px",
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
              fontSize: "11px",
              fontWeight: 700,
              color: up ? "var(--green, #16a34a)" : "var(--red)",
            }}
          >
            {up ? "+" : ""}
            {Number(s.change_pct).toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [content, marketSignals, stackEntries, portfolioPicks] = await Promise.all([
    getApprovedContent(20),
    getMarketSignals(6),
    getStackEntries(6),
    getHalalPortfolio("Q3 2026"),
  ]);

  const articles = content.filter((c) => c.content_type === "article");
  const videos = content.filter((c) => c.content_type === "video");

  const lead = articles[0] ?? content[0];
  const videoCard = videos[0];
  const article2 = articles[1];
  const article3 = articles[2];
  const gridArticles = articles.slice(3, 7);

  if (!lead) {
    return (
      <>
        <LanternMasthead />
        <div className="page-shell" style={{ padding: "120px 48px", textAlign: "center" }}>
          <div className="kicker" style={{ marginBottom: "16px" }}>Coming Soon</div>
          <h1 style={{ fontSize: "42px", fontFamily: "Georgia, serif" }}>
            The Lantern Daily is warming up.
          </h1>
          <p className="excerpt" style={{ maxWidth: "440px", margin: "24px auto 40px" }}>
            Subscribe to be the first to know when we go live.
          </p>
          <SubscribeForm variant="hero" />
        </div>
      </>
    );
  }

  const leadCard = toCardShape(lead);

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">

        {/* ── TODAY'S LEAD ────────────────────────────────────────── */}
        <SectionLabel label="Today's Lead" />

        <section
          className="desktop-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.15fr",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
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
                {leadCard.category}
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
                {leadCard.title}
              </h1>
              <p className="excerpt" style={{ fontSize: "17px", marginBottom: "28px" }}>
                {leadCard.excerpt}
              </p>
            </div>
            <div>
              <div className="byline" style={{ marginBottom: "20px" }}>
                {leadCard.author} · {leadCard.date} · {leadCard.readTime}
              </div>
              <a
                href={leadCard.href}
                className="join-button"
                style={{ display: "inline-block" }}
                target={leadCard.href.startsWith("http") ? "_blank" : undefined}
                rel={leadCard.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                Read the story →
              </a>
            </div>
          </article>

          {leadCard.image ? (
            <div className="article-image" style={{ minHeight: "430px", position: "relative" }}>
              <Image
                src={leadCard.image}
                alt={leadCard.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          ) : (
            <div
              className="article-image"
              style={{
                minHeight: "430px",
                background: "var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "var(--dim)",
                }}
              >
                THE LANTERN DAILY
              </span>
            </div>
          )}
        </section>

        {/* ── FIELD NOTES ─────────────────────────────────────────── */}
        {(videoCard || article2 || article3) && (
          <>
            <SectionLabel label="Field Notes" href="/archive" />
            <section
              className="desktop-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.7fr 0.7fr",
                gap: "2px",
                marginBottom: "2px",
              }}
            >
              {videoCard && <ArticleCard article={toCardShape(videoCard)} imageHeight="260px" />}
              {article2 && <ArticleCard article={toCardShape(article2)} imageHeight="260px" />}
              {article3 && <ArticleCard article={toCardShape(article3)} imageHeight="260px" />}
            </section>
          </>
        )}

        {/* ── MARKET WATCH (full-width) ────────────────────────────── */}
        <SectionLabel label="Market Watch · Halal-Screened" href="/archive?category=Markets" />

        <section className="card" style={{ marginBottom: "2px" }}>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <div className="kicker">Daily Signals</div>
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "var(--dim)",
                  letterSpacing: "0.08em",
                }}
              >
                HALAL-SCREENED · NOT FINANCIAL ADVICE
              </span>
            </div>

            {marketSignals.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "0 32px",
                }}
              >
                {marketSignals.map((s) => (
                  <MarketRow key={s.id} s={s} />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: "14px", color: "var(--dim)", lineHeight: 1.6, padding: "32px 0" }}>
                Market Watch is coming online. TradeSwarm integration in progress —
                daily halal-screened signals launching soon.
              </p>
            )}

            <p
              style={{
                fontSize: "10px",
                color: "var(--dim)",
                marginTop: "12px",
                fontFamily: "Space Mono, monospace",
                lineHeight: 1.5,
              }}
            >
              Halal screening via Musaffa / Zoya. Prices delayed. Scholarly disagreement noted where applicable.
              Educational purposes only. Not financial advice.
            </p>
          </div>
        </section>

        {/* ── HALAL PORTFOLIO PICKS ────────────────────────────────── */}
        <SectionLabel label="Halal Portfolio Picks · Q3 2026 Watch" href="/portfolio" />

        {/* Disclaimer banner */}
        <div
          style={{
            background: "rgba(201, 168, 76, 0.06)",
            border: "1px solid rgba(201, 168, 76, 0.2)",
            borderLeft: "3px solid #C9A84C",
            padding: "10px 16px",
            marginBottom: "2px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.12em", paddingTop: "1px", whiteSpace: "nowrap" }}>
            ⚠ DISCLAIMER
          </span>
          <p style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
            This is an editorial watchlist for educational purposes only. Not financial advice. All tickers are Musaffa-screened
            but scholarly opinions on permissibility vary. Verify halal status independently before any financial decision.
          </p>
        </div>

        {portfolioPicks.length > 0 ? (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2px",
              marginBottom: "2px",
            }}
          >
            {portfolioPicks.map((pick) => {
              const statusColor =
                pick.halal_status === "compliant" ? "#16a34a"
                : pick.halal_status === "questionable" ? "#ca8a04"
                : "var(--red)";
              const statusLabel =
                pick.halal_status === "compliant" ? "COMPLIANT"
                : pick.halal_status === "questionable" ? "QUESTIONABLE"
                : "REVIEW";

              return (
                <div
                  key={pick.id}
                  className="card"
                  style={{ borderTop: "2px solid var(--red)" }}
                >
                  <div className="card-body">
                    {/* Header row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <div
                          style={{
                            fontFamily: "Space Mono, monospace",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "var(--off)",
                            lineHeight: 1,
                          }}
                        >
                          {pick.ticker}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--dim)", marginTop: "3px" }}>
                          {pick.company_name}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "Space Mono, monospace",
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "var(--red)",
                            lineHeight: 1,
                          }}
                        >
                          {pick.allocation_pct}%
                        </div>
                        <div style={{ fontSize: "9px", color: "var(--dim)", fontFamily: "Space Mono, monospace", letterSpacing: "0.06em", marginTop: "3px" }}>
                          ALLOCATION
                        </div>
                      </div>
                    </div>

                    {/* Halal status */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "3px 8px",
                        background: `${statusColor}15`,
                        borderRadius: "2px",
                        marginBottom: "12px",
                      }}
                    >
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: statusColor, letterSpacing: "0.1em", fontWeight: 700 }}>
                        {statusLabel}
                      </span>
                      {pick.halal_source && (
                        <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "var(--dim)", letterSpacing: "0.06em" }}>
                          · {pick.halal_source.toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Editorial rationale */}
                    {pick.editorial_rationale && (
                      <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.65, marginBottom: "12px" }}>
                        {pick.editorial_rationale.length > 160
                          ? pick.editorial_rationale.slice(0, 160) + "…"
                          : pick.editorial_rationale}
                      </p>
                    )}

                    {/* Scholar note (if any) */}
                    {pick.scholar_note && (
                      <div style={{ fontSize: "11px", color: "#B8922A", lineHeight: 1.5, borderTop: "1px solid var(--border)", paddingTop: "10px", marginBottom: "12px" }}>
                        📚 {pick.scholar_note}
                      </div>
                    )}

                    {/* Footer: asset class + verify link */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "var(--dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {pick.asset_class}
                      </span>
                      {pick.source_url && (
                        <a
                          href={pick.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "var(--red)", letterSpacing: "0.06em", textDecoration: "none" }}
                        >
                          Verify on Musaffa →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}

        <div style={{ marginBottom: "2px", padding: "12px 0" }}>
          <a
            href="/portfolio"
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "var(--dim)",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            VIEW FULL PORTFOLIO BREAKDOWN + BUDGET CALCULATOR →
          </a>
        </div>

        {/* ── FROM THE STACK ───────────────────────────────────────── */}
        <SectionLabel label="From the Stack" href="/stack" />

        <section className="card" style={{ marginBottom: "2px" }}>
          <div className="card-body">
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", lineHeight: 1.5 }}>
              Tools the operators we cover are running in production — curated, not sponsored.
            </p>

            {stackEntries.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "0 32px",
                }}
              >
                {stackEntries.slice(0, 6).map((tool) => (
                  <a
                    key={tool.tool_name}
                    href={tool.tool_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--border)",
                        gap: "12px",
                      }}
                    >
                      <span className="kicker" style={{ fontSize: "9px", letterSpacing: "0.12em" }}>
                        {tool.category}
                      </span>
                      <div>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "var(--off)",
                            fontFamily: "Space Mono, monospace",
                            fontWeight: 600,
                          }}
                        >
                          {tool.tool_name}
                        </span>
                        {tool.one_line_desc && (
                          <span style={{ fontSize: "12px", color: "var(--dim)", marginLeft: "8px" }}>
                            — {tool.one_line_desc}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "0 32px",
                }}
              >
                {[
                  { cat: "Infra",     tools: "Supabase · Vercel · n8n · GitHub" },
                  { cat: "Models",    tools: "DeepSeek · Anthropic · OpenAI" },
                  { cat: "Frontend",  tools: "Next.js · Tailwind · v0.dev" },
                  { cat: "Analytics", tools: "PostHog · Sentry" },
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
                    <span className="kicker" style={{ fontSize: "9px" }}>{row.cat}</span>
                    <span style={{ fontSize: "12px", color: "var(--dim)", fontFamily: "Space Mono, monospace" }}>
                      {row.tools}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <a
              href="/stack"
              className="btn outline"
              style={{ display: "inline-block", marginTop: "16px", fontSize: "11px" }}
            >
              Full Stack Guide →
            </a>
          </div>
        </section>

        {/* ── LATEST INTELLIGENCE ─────────────────────────────────── */}
        {gridArticles.length > 0 && (
          <>
            <SectionLabel label="Latest Intelligence" href="/archive" />
            <section
              className="article-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2px",
                marginBottom: "2px",
              }}
            >
              {gridArticles.map((a) => (
                <ArticleCard key={a.id} article={toCardShape(a)} imageHeight="190px" />
              ))}
            </section>
          </>
        )}

        {/* ── PULL QUOTE ──────────────────────────────────────────── */}
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

        {/* ── SUBSCRIBE CTA ───────────────────────────────────────── */}
        <section
          id="subscribe"
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
