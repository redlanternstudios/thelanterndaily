import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div style={{
      background: "#09090B",
      borderBottom: "1px solid #1F1F23",
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "55% 45%",
        minHeight: 480,
        gap: 0,
        alignItems: "stretch",
      }}>
        {/* Left: Text */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 40px 40px 0",
          gap: 16,
        }}>
          <span style={{
            color: "#D92532",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            AI INFRASTRUCTURE
          </span>
          
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            fontWeight: 700,
            color: "#F4F4F5",
            lineHeight: 1.1,
            margin: 0,
          }}>
            AI Infrastructure Is Becoming the New Commodity Trade
          </h1>

          <p style={{
            fontSize: 18,
            color: "#71717A",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "90%",
          }}>
            Inference demand is exploding, cloud spend is repricing, and the next picks-and-shovels layer will decide the next cycle of winners.
          </p>

          <div style={{
            display: "flex",
            gap: 12,
            fontSize: 12,
            color: "#71717A",
            marginTop: 8,
          }}>
            <span>by RedLantern Studios™</span>
            <span>·</span>
            <span>May 16, 2025</span>
            <span>·</span>
            <span>6 min read</span>
          </div>

          <Link href="/article/ai-infrastructure" style={{
            color: "#D92532",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 24,
            width: "fit-content",
          }}>
            READ THE STORY →
          </Link>
        </div>

        {/* Right: Image */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          background: "#111113",
        }}>
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=480&fit=crop"
            alt="AI Infrastructure"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
