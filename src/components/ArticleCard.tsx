"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const thumbnailSrc = article.youtubeId
    ? `https://img.youtube.com/vi/${article.youtubeId}/maxresdefault.jpg`
    : article.image;

  const href = article.youtubeId
    ? `https://www.youtube.com/watch?v=${article.youtubeId}`
    : `/article/${article.id}`;

  const isExternal = !!article.youtubeId;

  const cardContent = (
    <>
      {/* Image wrapper — paddingBottom trick gives true 16:9 ratio without fixed px heights */}
      <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
        <Image
          src={thumbnailSrc}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        {/* Video overlay */}
        {article.video && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(7,8,13,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Play triangle */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                    borderLeft: "16px solid #07080D",
                    marginLeft: 4,
                  }}
                />
              </div>
            </div>
            {article.duration && (
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "#07080D",
                  color: "#E8E6E1",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 11,
                  padding: "3px 8px",
                }}
              >
                {article.duration}
              </div>
            )}
          </>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#D92532",
          }}
        >
          {article.category}
        </span>
        <h3
          style={{
            fontFamily: "Playfair Display, Georgia, serif",
            fontSize: featured ? 26 : 18,
            fontWeight: 800,
            color: "#E8E6E1",
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "#6B7280",
            lineHeight: 1.6,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 12,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "#6B7280",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>THE LANTERN DAILY</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{article.date}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{article.video ? article.duration : article.readTime}</span>
          {article.premium && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: "#C9A84C", fontWeight: 700 }}>PREMIUM</span>
            </>
          )}
        </div>
      </div>
    </>
  );

  const sharedStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: "#0F1117",
    border: "1px solid #1E2028",
    height: "100%",
    textDecoration: "none",
    transition: "border-color 150ms",
    cursor: "pointer",
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={sharedStyle}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2E3040")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E2028")}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      style={sharedStyle}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2E3040")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E2028")}
    >
      {cardContent}
    </Link>
  );
}
