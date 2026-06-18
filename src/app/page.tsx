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
import { getPublishedPosts } from "@/lib/data/posts";

export default async function HomePage() {
  const posts = await getPublishedPosts(12);
  const [lead, videoCard, ...remaining] = posts;
  const gridArticles = remaining.slice(0, 4);

  return (
    <>
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-12 sm:gap-16">
          {lead && <Hero post={lead} />}
          {videoCard && <SecondRow videoPost={videoCard} sidePosts={remaining} />}

          <section>
            <SectionDivider label="Latest Dispatches" href="/archive" />
            <div className="mt-0.5 grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
              {gridArticles.length > 0 ? (
                gridArticles.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))
              ) : (
                <p className="col-span-4 py-8 text-center text-sm text-[var(--color-text-dim)]">
                  No dispatches yet. Check back soon.
                </p>
              )}
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
