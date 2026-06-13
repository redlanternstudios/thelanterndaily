import Nav from "@/components/Nav";
import TickerStrip from "@/components/TickerStrip";
import HeroSection from "@/components/HeroSection";
import IntelligenceWall from "@/components/IntelligenceWall";
import SignalsSection from "@/components/SignalsSection";
import SubscribeForm from "@/components/SubscribeForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <TickerStrip />
      <main className="page" style={{ paddingTop: "88px" }}>
        <HeroSection />
        <IntelligenceWall />
        <SignalsSection />
        <SubscribeForm />
      </main>
      <Footer />
    </>
  );
}
