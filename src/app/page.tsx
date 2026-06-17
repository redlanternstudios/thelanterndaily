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
        <style>{`
          @media (max-width: 1024px) {
            main { padding: 0 20px; }
          }
          @media (max-width: 768px) {
            main { padding: 0 16px; }
          }
          @media (max-width: 480px) {
            main { padding: 0 12px; }
          }
        `}</style>

        {/* ── Hero ── */}
        <style>{`
          .hero-grid { display: grid; grid-template-columns: 55% 45%; min-height: 460px; gap: 2px; margin-bottom: 2px; }
          .hero-text { position: relative; padding: 48px 40px; border-left: 3px solid #D92532; background: #0F1117; display: flex; flex-direction: column; justify-content: center; gap: 16px; }
          .hero-text h1 { font-family: Playfair Display, Georgia, serif; font-size: 44px; font-weight: 800; color: #E8E6E1; line-height: 1.1; margin: 0; }
          .hero-text p { font-family: Inter, sans-serif; font-size: 17px; color: #6B7280; line-height: 1.6; margin: 0; max-width: 480px; }
          .hero-image { position: relative; overflow: hidden; }
          @media (max-width: 1024px) {
            .hero-grid { grid-template-columns: 1fr; }
            .hero-image { min-height: 320px; }
          }
          @media (max-width: 768px) {
            .hero-grid { gap: 16px; margin-bottom: 24px; }
            .hero-text { padding: 32px 24px; }
            .hero-text h1 { font-size: 32px; }
            .hero-text p { font-size: 15px; }
            .hero-image { min-height: 300px; }
          }
          @media (max-width: 480px) {
            .hero-grid { gap: 12px; margin-bottom: 16px; }
            .hero-text { padding: 24px 16px; border-left-width: 2px; }
            .hero-text h1 { font-size: 26px; }
            .hero-text p { font-size: 14px; }
            .hero-image { min-height: 240px; }
          }
        `}</style>
        <div className="hero-grid">
          {/* Left: text */}
          <div className="hero-text">
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
          <div className="hero-image">
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
        <style>{`
          .row-2 { display: grid; grid-template-columns: 1.1fr 0.85fr 0.85fr; gap: 2px; margin-bottom: 2px; }
          @media (max-width: 1024px) {
            .row-2 { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 768px) {
            .row-2 { grid-template-columns: 1fr; gap: 16px; margin-bottom: 24px; }
          }
        `}</style>
        <div className="row-2">
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
        <style>{`
          .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-bottom: 2px; }
          @media (max-width: 1200px) {
            .grid-4 { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 768px) {
            .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
          }
          @media (max-width: 480px) {
            .grid-4 { grid-template-columns: 1fr; gap: 12px; }
          }
        `}</style>
        <div className="grid-4">
          {[article4, article5, article6, article7].filter(Boolean).map((a) => (
            <ArticleCard key={a!.id} article={a!} />
          ))}
        </div>

        {/* ── Subscribe CTA ── */}
        <style>{`
          .subscribe-cta { background: #0F1117; border: 1px solid #1E2028; padding: 64px; text-align: center; margin: 40px 0; }
          .subscribe-cta h2 { font-family: Playfair Display, Georgia, serif; font-size: 40px; font-weight: 800; color: #E8E6E1; line-height: 1.15; margin: 0 auto 24px; max-width: 640px; }
          @media (max-width: 768px) {
            .subscribe-cta { padding: 48px 32px; margin: 32px 0; }
            .subscribe-cta h2 { font-size: 32px; }
          }
          @media (max-width: 480px) {
            .subscribe-cta { padding: 32px 16px; margin: 24px 0; }
            .subscribe-cta h2 { font-size: 24px; }
            .subscribe-cta p { font-size: 9px; }
          }
        `}</style>
        <div className="subscribe-cta">
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
