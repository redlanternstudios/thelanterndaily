"use client";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/content";

interface ContentGridProps {
  articles: Article[];
}

export default function ContentGrid({ articles }: ContentGridProps) {
  const [videoCard, ...restCards] = articles.slice(1, 8);

  return (
    <div style={{
      maxWidth: 1400,
      margin: "0 auto",
      padding: "48px 24px",
      background: "#09090B",
    }}>
      {/* Row 1: Video + 2 Articles */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.5fr 1.5fr",
        gap: 16,
        marginBottom: 32,
      }}>
        {/* Video Card */}
        {videoCard && (
          <div style={{
            background: "#111113",
            border: "1px solid #1F1F23",
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden", background: "#000" }}>
              <Image
                src={videoCard.image}
                alt={videoCard.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.2)",
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  background: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}>
                  ▶
                </div>
              </div>
              {videoCard.duration && (
                <div style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.7)",
                  color: "#F4F4F5",
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                }}>
                  {videoCard.duration}
                </div>
              )}
            </div>
            <div style={{ padding: 16 }}>
              <span style={{
                background: "#D92532",
                color: "#F4F4F5",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: 8,
              }}>
                VIDEO
              </span>
              <h3 style={{
                fontFamily: "Georgia, serif",
                fontSize: 22,
                color: "#F4F4F5",
                lineHeight: 1.3,
                margin: "8px 0",
              }}>
                {videoCard.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: "#71717A",
                lineHeight: 1.5,
                margin: "8px 0",
              }}>
                {videoCard.excerpt}
              </p>
              <div style={{
                fontSize: 11,
                color: "#71717A",
                marginTop: 8,
              }}>
                by {videoCard.author} · {videoCard.readTime}
              </div>
            </div>
          </div>
        )}

        {/* Article Cards */}
        {restCards.slice(0, 2).map((article, idx) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            style={{
              background: "#111113",
              border: "1px solid #1F1F23",
              borderRadius: 8,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D92532")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1F1F23")}
          >
            <div style={{ position: "relative", paddingBottom: "66.67%", overflow: "hidden" }}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
              <span style={{
                color: "#D92532",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                {article.category}
              </span>
              <h3 style={{
                fontFamily: "Georgia, serif",
                fontSize: 18,
                color: "#F4F4F5",
                lineHeight: 1.3,
                margin: "0 0 8px 0",
                flex: 1,
              }}>
                {article.title}
              </h3>
              <p style={{
                fontSize: 13,
                color: "#71717A",
                lineHeight: 1.5,
                margin: "0 0 8px 0",
              }}>
                {article.excerpt}
              </p>
              <div style={{
                fontSize: 11,
                color: "#71717A",
              }}>
                by {article.author} · {article.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Row 2: 4 Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
      }}>
        {restCards.slice(2, 6).map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            style={{
              background: "#111113",
              border: "1px solid #1F1F23",
              borderRadius: 8,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D92532")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1F1F23")}
          >
            <div style={{ position: "relative", paddingBottom: "66.67%", overflow: "hidden" }}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
              <span style={{
                color: "#D92532",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                {article.category}
              </span>
              <h3 style={{
                fontFamily: "Georgia, serif",
                fontSize: 16,
                color: "#F4F4F5",
                lineHeight: 1.3,
                margin: "0 0 8px 0",
                flex: 1,
              }}>
                {article.title}
              </h3>
              <p style={{
                fontSize: 13,
                color: "#71717A",
                lineHeight: 1.5,
                margin: "0 0 8px 0",
              }}>
                {article.excerpt}
              </p>
              <div style={{
                fontSize: 11,
                color: "#71717A",
              }}>
                by {article.author} · {article.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
