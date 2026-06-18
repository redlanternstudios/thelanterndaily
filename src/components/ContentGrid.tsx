"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/content";

interface ContentGridProps {
  articles: Article[];
}

function VideoCard({ article }: { article: Article }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{
      background: "#0D0F1C",
      border: "1px solid #1A1F2E",
      borderRadius: 8,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Thumbnail / Embed */}
      <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
        {playing && article.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${article.youtubeId}?autoplay=1`}
            title={article.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        ) : (
          <>
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            {/* Dark overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
            }} />
            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div style={{
                width: 64,
                height: 64,
                background: "#D42535",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 24px rgba(212,37,53,0.4)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 32px rgba(212,37,53,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(212,37,53,0.4)";
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
            {/* Duration badge */}
            {article.duration && (
              <div style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                background: "rgba(0,0,0,0.75)",
                color: "#F7F2EE",
                padding: "3px 8px",
                borderRadius: 3,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}>
                {article.duration}
              </div>
            )}
          </>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{
          background: "#D42535",
          color: "#fff",
          padding: "3px 8px",
          borderRadius: 3,
          fontSize: 9,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          display: "inline-block",
          width: "fit-content",
        }}>
          VIDEO
        </span>
        <h3 style={{
          fontFamily: "Georgia, serif",
          fontSize: 22,
          color: "#F7F2EE",
          lineHeight: 1.3,
          margin: 0,
        }}>
          {article.title}
        </h3>
        <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
          {article.excerpt}
        </p>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: "auto", paddingTop: 8 }}>
          by {article.author} · {article.readTime}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, titleSize = 18 }: { article: Article; titleSize?: number }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      style={{
        background: "#0D0F1C",
        border: "1px solid #1A1F2E",
        borderRadius: 8,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D42535")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1A1F2E")}
    >
      <div style={{ position: "relative", paddingBottom: "62%", overflow: "hidden" }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: "cover", transition: "transform 0.3s" }}
        />
      </div>
      <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{
          color: "#D42535",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          {article.category}
        </span>
        <h3 style={{
          fontFamily: "Georgia, serif",
          fontSize: titleSize,
          color: "#F7F2EE",
          lineHeight: 1.3,
          margin: 0,
          flex: 1,
        }}>
          {article.title}
        </h3>
        <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.55, margin: 0 }}>
          {article.excerpt}
        </p>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>
          by {article.author} · {article.readTime}
        </div>
      </div>
    </Link>
  );
}

export default function ContentGrid({ articles }: ContentGridProps) {
  const [videoCard, ...rest] = articles.slice(1);
  const row1Articles = rest.slice(0, 2);
  const row2Articles = rest.slice(2, 6);

  return (
    <>
      {/* Responsive styles injected once */}
      <style>{`
        .grid-row1 {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1.5fr;
          gap: 20px;
        }
        .grid-row2 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .grid-row1 {
            grid-template-columns: 1fr 1fr;
          }
          .grid-row1 > *:first-child {
            grid-column: 1 / -1;
          }
          .grid-row2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .grid-row1 {
            grid-template-columns: 1fr;
          }
          .grid-row2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "48px 24px",
        background: "#07080F",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>

        {/* Section label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingBottom: 16,
          borderBottom: "1px solid #1A1F2E",
        }}>
          <span style={{
            color: "#D42535",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Latest
          </span>
          <div style={{ flex: 1, height: 1, background: "#1A1F2E" }} />
        </div>

        {/* Row 1: Video (wide) + 2 article cards */}
        <div className="grid-row1">
          {videoCard && <VideoCard article={videoCard} />}
          {row1Articles.map((a) => (
            <ArticleCard key={a.id} article={a} titleSize={18} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1A1F2E" }} />

        {/* Row 2: 4-column grid */}
        <div className="grid-row2">
          {row2Articles.map((a) => (
            <ArticleCard key={a.id} article={a} titleSize={15} />
          ))}
        </div>

      </div>
    </>
  );
}
