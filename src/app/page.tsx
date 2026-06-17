import Image from "next/image";
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SubscribeForm from "@/components/SubscribeForm";
import { BadgeLegendStrip } from "@/components/HalalBadge";
import { lanternArticles } from "@/lib/content";

export default function HomePage() {
  const [lead, videoCard, article2, article3, article4, article5, article6, article7] =
    lanternArticles;

  return (
    <>
      <Masthead />
      <Ticker />
      <BadgeLegendStrip />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Hero ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            minHeight: 460,
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          {/* Left: text */}
          <div
            style={{
              position: "relative",
              padding: "48px 40px",
              borderLeft: "3px solid #D92532",
              background: "#0F1117",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
            }}
          >
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
              {lead.category}
            </span>
            <h1
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: 44,
                fontWeight: 800,
                color: "#E8E6E1",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {lead.title}
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 17,
                color: "#6B7280",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 480,
              }}
            >
              {lead.excerpt}
            </p>
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 11,
                color: "#6B7280",
                display: "flex",
                gap: 6,
              }}
            >
              <span>THE LANTERN DAILY</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{lead.date}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{lead.readTime}</span>
            </div>
            <a
              href={`/article/${lead.id}`}
              style={{
                display: "inline-block",
                marginTop: 8,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#D92532",
                textDecoration: "none",
              }}
            >
              Read the story →
            </a>
          </div>

          {/* Right: image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              sizes="50vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Row 2: video + 2 articles ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.85fr 0.85fr",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          {videoCard && <ArticleCard article={videoCard} />}
          {article2 && <ArticleCard article={article2} />}
          {article3 && <ArticleCard article={article3} />}
        </div>

        {/* ── Section label ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            margin: "40px 0 24px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#D92532",
              whiteSpace: "nowrap",
            }}
          >
            Latest Intelligence
          </span>
          <div style={{ flex: 1, height: 1, background: "#1E2028" }} />
        </div>

        {/* ── 4-column grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          {[article4, article5, article6, article7].filter(Boolean).map((a) => (
            <ArticleCard key={a!.id} article={a!} />
          ))}
        </div>

        {/* ── Subscribe CTA ── */}
        <div
          id="subscribe"
          style={{
            background: "#0F1117",
            border: "1px solid #1E2028",
            padding: "64px",
            textAlign: "center",
            margin: "40px 0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D92532",
              marginBottom: 16,
            }}
          >
            Muslim-Built · AI-Native · Signal Over Noise
          </p>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: 40,
              fontWeight: 800,
              color: "#E8E6E1",
              lineHeight: 1.15,
              margin: "0 auto 24px",
              maxWidth: 640,
            }}
          >
            Intelligence for the operators building what&apos;s next.
          </h2>
          <SubscribeForm />
        </div>

      </main>
      <Footer />
    </>
  );
}
