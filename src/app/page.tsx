import Nav from "@/components/Nav";
import TickerStrip from "@/components/TickerStrip";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import IssuesSection from "@/components/IssuesSection";
import SubscribeForm from "@/components/SubscribeForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <TickerStrip />

        {/* Main content area */}
        <div className="mx-auto max-w-[var(--max-w-content)] px-6 py-16 space-y-24">
          <FeaturesSection />
          <IssuesSection />
          <SubscribeForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
