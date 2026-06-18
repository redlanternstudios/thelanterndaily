import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import { getPublishedPosts } from "@/lib/data/posts";
import { SOCIAL_PROOF, CATEGORIES } from "@/lib/content";

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const allPosts = await getPublishedPosts(50);

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
