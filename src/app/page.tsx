import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SectionDivider from "@/components/SectionDivider";
import Hero from "@/components/home/Hero";
import SecondRow from "@/components/home/SecondRow";
import PullQuote from "@/components/home/PullQuote";
import SignalsAndStack from "@/components/home/SignalsAndStack";
import SubscribeCTA from "@/components/home/SubscribeCTA";
import { GRID_ARTICLES } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-12 sm:gap-16">
          <Hero />
          <SecondRow />

          <section>
            <SectionDivider label="Latest Dispatches" href="/archive" />
            <div className="mt-0.5 grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
              {GRID_ARTICLES.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <PullQuote />
          <SignalsAndStack />
          <SubscribeCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
