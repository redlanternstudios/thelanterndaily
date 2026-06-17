"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";
import { HalalBadge } from "@/components/HalalBadge";

function Byline({ article }: { article: Article }) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: 12,
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 11,
        color: "#6B7280",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span style={{ color: "#E8E6E1" }}>THE LANTERN DAILY</span>
      <span style={{ opacity: 0.4 }}>·</span>
      {article.originalDate ? (
        <>
          <span title="Date originally published">ORIG. {article.originalDate.toUpperCase()}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span title="Date posted by The Lantern Daily">POSTED {article.date.toUpperCase()}</span>
        </>
      ) : (
        <span>{article.date}</span>
      )}
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{article.video ? article.duration : article.readTime}</span>
      {article.premium && (
        <>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: "#C9A84C", fontWeight: 700 }}>PREMIUM</span>
        </>
      )}
    </div>
  );
}

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  const thumbnailSrc = article.youtubeId
    ? `https://img.youtube.com/vi/${article.youtubeId}/maxresdefault.jpg`
    : article.image;

  const sharedStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: "#0F1117",
    border: "1px solid #1E2028",
    height: "100%",
    textDecoration: "none",
    cursor: "pointer",
  };

  const cardBody = (
    <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
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
        {article.halalReview && (
          <HalalBadge verdict={article.halalReview.verdict} size="sm" />
        )}
      </div>
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
      <Byline article={article} />
    </div>
  );

  // Video card — plays inline on click
  if (article.video && article.youtubeId) {
    return (
      <div style={sharedStyle}>
        {/* Media area */}
        <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden", background: "#07080D" }}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${article.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <>
              <Image
                src={thumbnailSrc}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              {/* Dark overlay + play button */}
              <button
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${article.title}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  background: "rgba(7,8,13,0.45)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.92)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "18px solid #07080D",
                      marginLeft: 5,
                    }}
                  />
                </div>
              </button>
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
                    pointerEvents: "none",
                  }}
                >
                  {article.duration}
                </div>
              )}
            </>
          )}
        </div>
        {cardBody}
      </div>
    );
  }

  // Regular article card
  return (
    <Link
      href={`/article/${article.id}`}
      style={sharedStyle}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2E3040")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E2028")}
    >
      <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      {cardBody}
    </Link>
  );
}
