import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SubscribeForm from "@/components/SubscribeForm";
import HalalBadge from "@/components/HalalBadge";
import LanternSeal from "@/components/lantern/LanternSeal";
import { ALL_ARTICLES, SOCIAL_PROOF } from "@/lib/content";
import { normalizeCategory, CATEGORY_DEFINITIONS } from "@/lib/taxonomy";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const FALLBACK_BODY = [
  "Across three continents and a dozen time zones, a pattern is emerging that the mainstream tech press has been slow to name. The builders shaping the next layer of AI infrastructure are not all in San Francisco, and they are not all working from the same playbook.",
  "What unites them is less a geography than a disposition: a refusal to treat speed as the only virtue, and a conviction that the tools we build carry the values we hold. For this cohort, that conviction is shaped by faith — and by a long tradition of treating knowledge as a trust to be stewarded, not hoarded.",
  "The result is a quietly distinct way of operating. Open by default. Patient with capital. Deliberate about governance long before regulators arrive. In conversation after conversation, the same themes surface: build the thing you needed, give away what you can, and measure success on a longer horizon.",
  "None of this is romantic. The people in this report are shipping production systems with real revenue and real failure modes. But they are doing it on their own terms, and the infrastructure they are leaving behind will outlast any single funding cycle.",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticArticle = ALL_ARTICLES.find((a) => a.slug === slug);
  
  return {
    title: staticArticle ? `${staticArticle.title} — The Lantern Daily` : "Article — The Lantern Daily",
    description: staticArticle?.excerpt || "Executive briefings at the intersection of AI infrastructure, sovereign systems, and Islamic principles.",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let dbPost: any = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    dbPost = data;
  } catch (e) {
    console.error("Supabase post lookup error (falling back to static):", e);
  }

  // Fallback to static content
  const staticArticle = ALL_ARTICLES.find((a) => a.slug === slug);

  const post: (Post & { halal_stance?: string | null; editorial_note?: string | null; body_markdown?: string | null }) | null = dbPost ?? null;
  const article = staticArticle;

  // If neither exists, 404
  if (!post && !article) notFound();

  const title = post?.title ?? article?.title ?? "";
  const excerpt = post?.excerpt ?? post?.summary ?? article?.excerpt ?? "";
  const image = post?.hero_image_url ?? article?.image ?? "/placeholder.svg";
  const kicker = article?.kicker ?? post?.category ?? "ai-systems";
  const author = article?.author ?? "The Lantern Editorial Staff";
  const date = article?.date ?? (post?.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Today");
  const readTime = article?.readTime ?? (post?.reading_time_minutes ? `${post.reading_time_minutes} min read` : "4 min read");

  const halalStance = post?.halal_stance ?? article?.halalReview?.verdict ?? "nuanced";
  const editorialNote = post?.editorial_note ?? article?.halalReview?.editorialNote ?? null;

  // Split post body markdown into paragraphs or use static article body or fallback
  const bodyParagraphs = post?.body_markdown
    ? post.body_markdown.split("\n\n").filter(Boolean)
    : article?.body
    ? article.body.split("\n\n").filter(Boolean)
    : FALLBACK_BODY;

  // Related articles
  const related = ALL_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const canonicalCategory = normalizeCategory(kicker || article?.category);
  const sectorDef = CATEGORY_DEFINITIONS[canonicalCategory];
  const sectorSlug = sectorDef ? sectorDef.slug : 'ai-infrastructure';

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE] overflow-x-hidden">
      <Masthead />

      {/* Full-width responsive header */}
      <header className="border-b border-[#1A1F2E] px-4 py-8 sm:px-6 sm:py-14 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {kicker && (
              <Link
                href={`/section/${sectorSlug}`}
                className="font-mono text-xs uppercase tracking-wider text-[#B8922A] hover:text-[#E5C058] transition-colors"
              >
                {kicker}
              </Link>
            )}
            <LanternSeal
              name={title}
              tickerOrTag={kicker}
              stance={halalStance as "positive" | "nuanced" | "concern" | "blocked"}
              editorialNote={editorialNote || undefined}
            />
          </div>

          <h1 className="font-serif mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-[#F7F2EE] text-balance">
            {title}
          </h1>

          {excerpt && (
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[#9CA3AF] leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#6B7280]">
            <span className="text-[#D1D5DB]">{author}</span>
            <span className="opacity-40">·</span>
            <span>{date}</span>
            <span className="opacity-40">·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero Image Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-w-5xl mx-auto my-6 sm:my-10 overflow-hidden rounded-none sm:rounded-lg border-y sm:border border-[#1A1F2E] bg-[#0D0F14]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      {/* Main 2-column layout (stacks vertically on mobile < 1024px) */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          {/* Article Body */}
          <article className="prose prose-invert max-w-none text-[#D1D5DB] leading-[1.8] text-base sm:text-lg">
            {bodyParagraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg sm:text-xl text-[#F7F2EE] font-medium leading-relaxed" : "mt-6"}>
                {p}
              </p>
            ))}

            <blockquote className="my-8 sm:my-10 border-l-4 border-[#B8922A] bg-[#0D0F14] px-5 py-4 sm:px-6 sm:py-6 rounded-r">
              <p className="font-serif italic text-lg sm:text-xl text-[#F7F2EE]">
                &ldquo;Build the thing you needed, give away what you can, and measure success on a longer horizon.&rdquo;
              </p>
            </blockquote>

            {/* Islamic Lens Callout Card */}
            {editorialNote && (
              <div className="mt-8 border-l-4 border-[#B8922A] bg-[#0E1017] p-5 sm:p-6 rounded-r border border-l-0 border-[#1A1F2E]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-[#B8922A]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#B8922A] font-bold">
                    The Islamic Lens
                  </span>
                </div>
                <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed italic">
                  {editorialNote}
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-lg border border-[#1A1F2E] bg-[#0D0F14] p-5 sm:p-6">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#B8922A] font-bold">
                Get the Briefing
              </h2>
              <p className="mt-2 mb-4 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                Join {SOCIAL_PROOF}. Field notes, tech infrastructure, and Islamic sovereignty every morning.
              </p>
              <SubscribeForm compact buttonText="Subscribe" />
            </div>

            {related.length > 0 && (
              <div className="border border-[#1A1F2E] bg-[#0D0F14] p-5 sm:p-6 rounded-lg">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] pb-3 border-b border-[#1A1F2E]">
                  Related Signals
                </h2>
                <div className="mt-4 divide-y divide-[#1A1F2E]">
                  {related.map((a) => (
                    <div key={a.slug} className="py-3 first:pt-0 last:pb-0">
                      <Link href={`/article/${a.slug}`} className="group block">
                        <span className="font-mono text-[10px] text-[#B8922A] uppercase tracking-wider block mb-1">
                          {a.kicker}
                        </span>
                        <h3 className="font-serif text-sm font-bold text-[#F7F2EE] group-hover:text-[#B8922A] transition-colors line-clamp-2">
                          {a.title}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
