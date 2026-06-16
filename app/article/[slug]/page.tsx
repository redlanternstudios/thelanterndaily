import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LanternMasthead } from "@/components/LanternMasthead";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import { PremiumGate } from "@/components/PremiumGate";
import { lanternArticles } from "@/data/lanternArticles";

// ── Static params — pre-render all 7 known articles at build time ──────────
export function generateStaticParams() {
  return lanternArticles.map((a) => ({ slug: a.id }));
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
    title: `${article.title} | The Lantern Daily`,
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
          </div>
        </header>

        {/* ── HERO IMAGE ─────────────────────────────────────────── */}
        <div
          className="article-image"
          style={{ height: "480px", margin: "0 auto 48px", maxWidth: "960px" }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
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
