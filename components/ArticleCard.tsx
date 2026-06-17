import Image from "next/image";
import { Article } from "@/data/lanternArticles";
import { HalalBadge } from "@/components/HalalBadge";
import type { HalalBadgeType } from "@/data/lanternTypes";

interface ArticleCardProps {
  article: Article;
  imageHeight?: string;
  featured?: boolean;
}

export function ArticleCard({
  article,
  imageHeight = "220px",
  featured = false,
}: ArticleCardProps) {
  // Map old category to halal_badge — defaults to editorial_only for articles
  // without explicit badge metadata
  const badgeType: HalalBadgeType | undefined = article.halal_badge || (
    article.category === "Halal Fintech" ? "halal_finance_screened" :
    article.category === "Islamic Finance" ? "scholar_reviewed" :
    undefined
  );

  const href = article.href ?? `/article/${article.id}`;
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      style={{ display: "block" }}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className={`card${featured ? " featured-card" : ""}`} style={{ height: "100%" }}>
        {/* Image */}
        <div
          className={`article-image${article.video ? " video-thumb" : ""}`}
          style={{ height: imageHeight, position: "relative" }}
        >
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 50vw"
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
              }}
            >
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "var(--dim)",
                }}
              >
                {article.category?.toUpperCase() ?? "THE LANTERN"}
              </span>
            </div>
          )}
          {article.video && (
            <>
              <div className="play-button">▶</div>
              {article.duration && (
                <div className="duration">{article.duration}</div>
              )}
            </>
          )}
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="kicker" style={{ marginBottom: "10px" }}>
            {article.category}
          </div>
          <h3
            style={{
              marginBottom: "12px",
              fontSize: featured ? "24px" : "18px",
              fontWeight: 800,
            }}
          >
            {article.title}
          </h3>
          {/* Halal badge */}
          {badgeType && (
            <div style={{ marginBottom: "12px" }}>
              <HalalBadge type={badgeType} size="sm" />
            </div>
          )}
          <p
            className="excerpt"
            style={{
              fontSize: featured ? "16px" : "14px",
              marginBottom: "16px",
            }}
          >
            {article.excerpt}
          </p>
          <div
            className="byline"
            style={{ display: "flex", gap: "16px", alignItems: "center" }}
          >
            <span>{article.author}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span>{article.date}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </a>
  );
}