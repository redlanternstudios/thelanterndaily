import Image from "next/image";
import TopNav from "@/components/TopNav";
import CategoryNav from "@/components/CategoryNav";
import HeroSection from "@/components/HeroSection";
import ContentGrid from "@/components/ContentGrid";
import QuoteCallout from "@/components/QuoteCallout";
import MarketSignals from "@/components/MarketSignals";
import OperatorStack from "@/components/OperatorStack";
import EmailCTA from "@/components/EmailCTA";
import Footer from "@/components/Footer";
import { lanternArticles } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { background: #07080F; }
        body { background: #07080F; color: #9CA3AF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; }
        a { color: inherit; text-decoration: none; }
      `}</style>
      
      <TopNav />
      <CategoryNav />
      <HeroSection />
      <ContentGrid articles={lanternArticles} />
      <QuoteCallout />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", maxWidth: 1400, margin: "0 auto", padding: "56px 24px", background: "#09090B" }}>
        <MarketSignals />
        <OperatorStack />
      </div>
      <EmailCTA />
      <Footer />
    </>
  );
}
