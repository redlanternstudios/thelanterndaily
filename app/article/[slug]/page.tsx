import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LanternMasthead } from "@/components/LanternMasthead";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import { PremiumGate } from "@/components/PremiumGate";
import { HalalBadge, TrustNote } from "@/components/HalalBadge";
import { lanternArticles } from "@/data/lanternArticles";
import type { HalalBadgeType } from "@/data/lanternTypes";

// ── Static params — pre-render all 7 known articles at build time ──────────
export function generateStaticParams() {
  return lanternArticles.map((a) => ({ slug: a.id }));
}

// ── Helpers for badge mapping ──────────────────────────────────────────────
function getBadgeType(category: string): HalalBadgeType | undefined {
  if (category === "Halal Fintech") return "halal_finance_screened";
  if (category === "Islamic Finance") return "scholar_reviewed";
  // All other categories default to editorial_only for general content
  return "editorial_only";
}

function getScholarNote(category: string): string | null {
  if (category === "Islamic Finance" || category === "Halal Fintech") {
    return "Islamic financial principles reviewed against DJIM-equivalent screening criteria. This content discusses riba prohibition and asset-backing requirements in the context of DeFi protocols.";
  }
  return null;
}

// ── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = lanternArticles.find((a) => a.id === slug);
  if (!article) return { title: "Not Found | The Lantern Daily" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: ["The Lantern Daily"],
      images: article.image ? [{ url: article.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = lanternArticles.find((a) => a.id === slug);

  if (!article) notFound();

  const badgeType = getBadgeType(article.category);
  const scholarNote = getScholarNote(article.category);

  // Related: up to 3 articles from same category, or fallback to latest
  const related = lanternArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const fallbackRelated = lanternArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const relatedArticles = related.length > 0 ? related : fallbackRelated;

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── ARTICLE HEADER ─────────────────────────────────────── */}
        <header style={{ maxWidth: "800px", margin: "48px auto 0" }}>
          <div className="kicker" style={{ marginBottom: "16px" }}>
            {article.category}
          </div>
          <h1 style={{ marginBottom: "24px", fontSize: "52px", lineHeight: 1.1 }}>
            {article.title}
          </h1>
          <p className="excerpt" style={{ fontSize: "20px", marginBottom: "24px" }}>
            {article.excerpt}
          </p>
          <div
            className="byline"
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              paddingBottom: "24px",
              borderBottom: "1px solid var(--border)",
              flexWrap: "wrap",
            }}
          >
            <span>{article.author}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span>{article.date}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span>{article.readTime}</span>
            {article.premium && (
              <>
                <span style={{ color: "var(--dim)" }}>·</span>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "Space Mono, monospace",
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                  }}
                >
                  PREMIUM
                </span>
              </>
            )}
            {/* Trust badge in header */}
            {badgeType && (
              <>
                <span style={{ color: "var(--dim)" }}>·</span>
                <HalalBadge type={badgeType} size="sm" showTooltip />
              </>
            )}
          </div>

          {/* Scholar review note (if applicable) */}
          {scholarNote && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                background: "rgba(184, 146, 42, 0.08)",
                border: "1px solid rgba(184, 146, 42, 0.25)",
                borderLeft: "3px solid #B8922A",
                fontSize: "13px",
                color: "#B8922A",
                lineHeight: 1.6,
                fontFamily: '"Space Mono", monospace',
              }}
            >
              📚 Scholar&apos;s Note: {scholarNote}
            </div>
          )}
        </header>

        {/* ── HERO IMAGE ─────────────────────────────────────────── */}
        <div
          className="article-image"
          style={{ height: "480px", margin: "0 auto 48px", maxWidth: "960px", position: "relative" }}
        >
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--dim)",
                fontSize: "12px",
                fontFamily: "Space Mono, monospace",
                letterSpacing: "0.15em",
              }}
            >
              {article.category}
            </div>
          )}
        </div>

        {/* ── TWO-COLUMN: BODY + SIDEBAR ─────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "64px",
            maxWidth: "1140px",
            margin: "0 auto 64px",
          }}
        >
          {/* Article Body */}
          <article>
            {article.premium ? (
              <PremiumGate previewHtml={article.body ?? ""} />
            ) : article.body ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            ) : (
              <p className="excerpt" style={{ fontSize: "19px", lineHeight: 1.8 }}>
                {article.excerpt}
              </p>
            )}

            {/* Trust note at bottom of body */}
            {badgeType && <TrustNote type={badgeType} />}
          </article>

          {/* Sidebar */}
          <aside>
            <div style={{ position: "sticky", top: "96px" }}>
              {/* Newsletter CTA */}
              <div className="card" style={{ marginBottom: "24px" }}>
                <div className="card-body">
                  <div className="kicker" style={{ marginBottom: "12px" }}>
                    Get The Signal
                  </div>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                    Weekly intelligence for AI-native operators. Free.
                  </p>
                  <SubscribeForm variant="sidebar" placeholder="operator@email.com" />
                </div>
              </div>

              {/* Trust pipeline summary */}
              <div
                className="card"
                style={{ marginBottom: "24px", borderLeft: "3px solid #2D7A4F" }}
              >
                <div className="card-body">
                  <div className="kicker" style={{ marginBottom: "10px", fontSize: "9px" }}>
                    Trust Pipeline
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "12px" }}>
                    This content passed all six gates of The Lantern Daily trust architecture.
                  </p>
                  <a
                    href="/halal/standards"
                    style={{
                      fontSize: "11px",
                      color: "#2D7A4F",
                      fontFamily: '"Space Mono", monospace',
                      letterSpacing: "0.06em",
                    }}
                  >
                    View Standards →
                  </a>
                </div>
              </div>

              {/* Related */}
              {relatedArticles.length > 0 && (
                <>
                  <div className="kicker" style={{ marginBottom: "16px" }}>
                    Related Intelligence
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {relatedArticles.map((a) => (
                      <ArticleCard key={a.id} article={a} imageHeight="140px" />
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>

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