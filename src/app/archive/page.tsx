import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import { getPublishedPosts } from "@/lib/data/posts";
import { SOCIAL_PROOF, CATEGORIES, ALL_ARTICLES } from "@/lib/content";
import { normalizeCategory } from "@/lib/taxonomy";

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const dbPosts = await getPublishedPosts(50);

  // Map all historical dispatches with canonical categories
  const staticPosts: any[] = ALL_ARTICLES.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: normalizeCategory(a.category),
    image_url: a.image,
    hero_image_url: a.image,
    reading_time_minutes: parseInt(a.readTime) || 5,
    published_at: a.date,
    created_at: a.date,
    status: "published",
    halal_stance: a.halalReview?.verdict || "positive",
  }));

  const slugMap = new Map();
  dbPosts.forEach((p) => {
    slugMap.set(p.slug, {
      ...p,
      category: normalizeCategory(p.category),
    });
  });

  staticPosts.forEach((p) => {
    if (!slugMap.has(p.slug)) {
      slugMap.set(p.slug, p);
    }
  });

  const allPosts = Array.from(slugMap.values());

  const initialCategory = cat && cat !== "All" ? normalizeCategory(cat) : "All";

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <header className="max-w-2xl border-b border-[#1E2028] pb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D92532] font-bold">
            Archival Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight text-[#F7F2EE] mt-3">
            Every Dispatch, Verified in One Place.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            The full accumulated archive across all six canonical pillars of sovereign technology and Islamic finance.
          </p>
        </header>

        <div className="mt-8">
          <ArchiveGrid
            posts={allPosts}
            categories={CATEGORIES}
            initialCat={initialCategory}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
