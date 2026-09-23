import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import { getPublishedPosts } from "@/lib/data/posts";
import { SOCIAL_PROOF, CATEGORIES, ALL_ARTICLES } from "@/lib/content";

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const dbPosts = await getPublishedPosts(50);

  // Map all historical dispatches so the archive is an accumulation of all content
  const staticPosts: any[] = ALL_ARTICLES.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    image_url: a.image,
    hero_image_url: a.image,
    reading_time_minutes: parseInt(a.readTime) || 5,
    published_at: a.date,
    created_at: a.date,
    status: "published",
    halal_stance: a.halalReview?.verdict || "positive",
  }));

  const slugMap = new Map();
  dbPosts.forEach((p) => slugMap.set(p.slug, p));
  staticPosts.forEach((p) => {
    if (!slugMap.has(p.slug)) {
      slugMap.set(p.slug, p);
    }
  });

  const allPosts = Array.from(slugMap.values());

  return (
    <>
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <span className="kicker">Archive</span>
          <h1 className="font-headline text-balance mt-4 text-4xl sm:text-5xl leading-tight text-[var(--color-text)]">
            Every dispatch, in one place.
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-dim)] leading-relaxed text-pretty">
            Field notes, market signals, and operator playbooks — read by{" "}
            {SOCIAL_PROOF}.
          </p>
        </header>

        <div className="mt-10">
          <ArchiveGrid posts={allPosts} categories={CATEGORIES} initialCat={cat ?? "All"} />
        </div>
      </main>
      <Footer />
    </>
  );
}
