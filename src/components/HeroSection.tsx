import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div style={{ background: "#07080F", borderBottom: "1px solid #1A1F2E" }}>
      <style>{`
        .hero-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 55% 45%;
          min-height: 480px;
          gap: 0;
          align-items: stretch;
        }
        .hero-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 48px 48px 0;
          gap: 16px;
        }
        .hero-image {
          position: relative;
          overflow: hidden;
          background: #0D0F1C;
          min-height: 320px;
        }
        .hero-h1 {
          font-family: Georgia, serif;
          font-size: 52px;
          font-weight: 700;
          color: #F7F2EE;
          line-height: 1.1;
          margin: 0;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 0;
          }
          .hero-image {
            order: -1;
            min-height: 240px;
          }
          .hero-text {
            padding: 28px 20px;
          }
          .hero-h1 {
            font-size: 32px;
          }
        }
      `}</style>

      <div className="hero-grid">
        {/* Left: Text */}
        <div className="hero-text">
          <span style={{
            color: "#D42535",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            AI INFRASTRUCTURE
          </span>

          <h1 className="hero-h1">
            AI Infrastructure Is Becoming the New Commodity Trade
          </h1>

          <p style={{
            fontSize: 18,
            color: "#9CA3AF",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "90%",
          }}>
            Inference demand is exploding, cloud spend is repricing, and the next picks-and-shovels layer will decide the next cycle of winners.
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 12,
            color: "#6B7280",
            marginTop: 4,
          }}>
            <span>by RedLantern Studios™</span>
            <span>·</span>
            <span>May 16, 2025</span>
            <span>·</span>
            <span>6 min read</span>
          </div>

          <Link href="/article/ai-infrastructure" style={{
            color: "#D42535",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: 16,
            width: "fit-content",
            textDecoration: "none",
          }}>
            READ THE STORY →
          </Link>
        </div>

        {/* Right: Image */}
        <div className="hero-image">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=700&fit=crop&q=80"
            alt="AI Infrastructure — circuit board and compute hardware"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
