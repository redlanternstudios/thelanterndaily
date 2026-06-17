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

  return (
    <a href={`/article/${article.id}`} style={{ display: "block" }}>
      <div className={`card${featured ? " featured-card" : ""}`} style={{ height: "100%" }}>
        {/* Image */}
        <div
          className={`article-image${article.video ? " video-thumb" : ""}`}
          style={{ height: imageHeight }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
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