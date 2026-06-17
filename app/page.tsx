import Image from "next/image";
import { LanternMasthead } from "@/components/LanternMasthead";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import {
  getApprovedContent,
  articleHref,
  formatDate,
  readTime,
  type LanternArticle,
} from "@/lib/lantern/queries";

// Supabase storage base for article images
const STORAGE_BASE =
  "https://endovljmaudnxdzdapmf.supabase.co/storage/v1/object/public/article-images";

function articleImage(a: LanternArticle): string {
  if (a.image_url) return a.image_url;
  // Fallback: deterministic placeholder by category
  const slug = (a.category ?? "tech").toLowerCase().replace(/\s+/g, "-");
  return `${STORAGE_BASE}/${slug}-default.jpg`;
}

// Map Supabase row → shape ArticleCard expects
function toCardShape(a: LanternArticle) {
  return {
    id: a.id,
    category: a.category ?? "Intelligence",
    title: a.title,
    excerpt: a.excerpt ?? "",
    author: a.author ?? "The Lantern Daily",
    date: formatDate(a.published_at),
    readTime: readTime(a.read_time_minutes),
    image: articleImage(a),
    video: a.content_type === "video",
    youtubeId: a.youtube_video_id ?? undefined,
    premium: a.is_premium,
    href: articleHref(a),
  };
}

export default async function HomePage() {
  // Single query — get all approved content, split by type client-side
  const content = await getApprovedContent(20);

  const articles = content.filter((c) => c.content_type === "article");
  const videos = content.filter((c) => c.content_type === "video");
  const market = content.filter((c) => c.content_type === "market");

  // Layout slots
  const lead = articles[0] ?? content[0];
  const videoCard = videos[0];
  const article2 = articles[1];
  const article3 = articles[2];
  const gridArticles = articles.slice(3, 7); // up to 4 in bottom grid — start after article2/article3

  if (!lead) {
    // Graceful empty state — DB connected but no content yet
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

          {/* Lead image — full bleed */}
          <div className="article-image" style={{ minHeight: "430px", position: "relative" }}>
            <Image
              src={leadCard.image}
              alt={leadCard.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </section>

        {/* ── VIDEO + 2 ARTICLES ─────────────────────────────────── */}
        {(videoCard || article2 || article3) && (
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
        )}

        {/* ── SECTION LABEL ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "48px 0 24px",
          }}
        >
          <div className="kicker" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
            Latest Intelligence
          </div>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* ── 4-COLUMN ARTICLE GRID ──────────────────────────────── */}
        {gridArticles.length > 0 && (
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
        )}

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
          {/* Market Signals — from DB if available, static fallback */}
          <div className="card">
            <div className="card-body">
              <div className="kicker" style={{ marginBottom: "24px" }}>
                Market Signals
              </div>
              {market.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {market.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <div className="kicker" style={{ fontSize: "10px", marginBottom: "4px" }}>
                        {m.category}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>{m.title}</div>
                      {m.excerpt && (
                        <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
                          {m.excerpt}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
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
                { cat: "Infra", tools: ["Supabase", "Vercel", "n8n", "GitHub"] },
                { cat: "Models", tools: ["Groq", "DeepSeek", "OpenAI", "Anthropic"] },
                { cat: "Frontend", tools: ["Next.js", "Tailwind", "v0.dev", "Figma"] },
                { cat: "Analytics", tools: ["PostHog", "Sentry", "Resend", "Beehiiv"] },
                { cat: "Payments", tools: ["Stripe"] },
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
                  <span className="kicker" style={{ fontSize: "9px", letterSpacing: "0.12em" }}>
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
