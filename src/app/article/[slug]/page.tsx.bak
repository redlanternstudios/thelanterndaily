import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SubscribeForm from "@/components/SubscribeForm";
import HalalBadge from "@/components/halal/HalalBadge";
import { ALL_ARTICLES, SOCIAL_PROOF } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const BODY = [
  "Across three continents and a dozen time zones, a pattern is emerging that the mainstream tech press has been slow to name. The builders shaping the next layer of AI infrastructure are not all in San Francisco, and they are not all working from the same playbook.",
  "What unites them is less a geography than a disposition: a refusal to treat speed as the only virtue, and a conviction that the tools we build carry the values we hold. For this cohort, that conviction is shaped by faith — and by a long tradition of treating knowledge as a trust to be stewarded, not hoarded.",
  "The result is a quietly distinct way of operating. Open by default. Patient with capital. Deliberate about governance long before regulators arrive. In conversation after conversation, the same themes surface: build the thing you needed, give away what you can, and measure success on a longer horizon.",
  "None of this is romantic. The people in this report are shipping production systems with real revenue and real failure modes. But they are doing it on their own terms, and the infrastructure they are leaving behind will outlast any single funding cycle.",
];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try Supabase first
  const supabase = await createClient();
  const { data: dbPost } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  // Fallback to static content
  const staticArticle = ALL_ARTICLES.find((a) => a.slug === slug);

  const post: (Post & { halal_stance?: string | null; editorial_note?: string | null }) | null = dbPost ?? null;
  const article = staticArticle;

  // If neither exists, 404
  if (!post && !article) notFound();

  const title = post?.title ?? article?.title ?? "";
  const excerpt = post?.summary ?? article?.excerpt ?? "";
  const image = post?.hero_image_url ?? article?.image ?? "/placeholder.svg";
  const kicker = article?.kicker ?? post?.category ?? "";
  const author = article?.author ?? "";
  const date = article?.date ?? (post?.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "");
  const readTime = article?.readTime ?? (post?.reading_time_minutes ? `${post.reading_time_minutes} min read` : "");

  const halalStance = post?.halal_stance ?? null;
  const editorialNote = post?.editorial_note ?? null;

  // Related articles
  const relatedStatic = article ? ALL_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3) : [];
  const related = relatedStatic;

  return (
    <>
      <Masthead />
      <Ticker />

      {/* Full-width header */}
      <header className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="flex items-center justify-center gap-3">
            {kicker && (
              <Link
                href={`/archive?cat=${kicker}`}
                className="kicker inline-block hover:opacity-80"
              >
                {kicker}
              </Link>
            )}
            {halalStance && (
              <HalalBadge
                stance={halalStance as "positive" | "critical" | "blocked" | "nuanced"}
              />
            )}
          </div>
          <h1 className="font-headline text-balance mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[var(--color-text)]">
            {title}
          </h1>
          {excerpt && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-dim)] leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
            {author && (
              <>
                <span className="text-[var(--color-text)]">{author}</span>
                <span className="opacity-40">·</span>
              </>
            )}
            {date && <span>{date}</span>}
            {readTime && (
              <>
                <span className="opacity-40">·</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full bg-[var(--color-card)]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 2-col body + sidebar */}
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <article className="max-w-2xl">
            {BODY.map((p, i) => (
              <p
                key={i}
                className={`text-[var(--color-text)] leading-[1.8] ${
                  i === 0
                    ? "text-xl first-letter:font-headline first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:text-[var(--color-red)]"
                    : "mt-6 text-lg"
                }`}
              >
                {p}
              </p>
            ))}

            <blockquote className="my-10 border-l-2 border-[var(--color-red)] bg-[var(--color-card)] px-7 py-8">
              <p className="font-headline italic text-2xl leading-snug text-[var(--color-text)]">
                &ldquo;Build the thing you needed, give away what you can, and measure
                success on a longer horizon.&rdquo;
              </p>
            </blockquote>

            {BODY.slice(0, 2).map((p, i) => (
              <p key={`b-${i}`} className="mt-6 text-lg text-[var(--color-text)] leading-[1.8]">
                {p}
              </p>
            ))}

            {/* Islamic Lens — Editorial Note */}
            {editorialNote && (
              <div className="mt-10 border-l-4 border-[var(--color-red)] bg-[var(--color-card)] px-6 py-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-red)] font-bold">
                  Islamic Lens
                </span>
                <p className="mt-2 text-[var(--color-text-dim)] italic leading-relaxed text-base">
                  {editorialNote}
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h2 className="kicker">Get the briefing</h2>
              <p className="mt-3 mb-5 text-sm text-[var(--color-text-dim)] leading-relaxed">
                Join {SOCIAL_PROOF}. Field notes and signal, every morning.
              </p>
              <SubscribeForm compact />
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="kicker border-b border-[var(--color-border)] pb-3">
                  Related
                </h2>
                <div className="mt-0.5 flex flex-col gap-0.5 bg-[var(--color-border)]">
                  {related.map((a) => (
                    <ArticleCard key={a.slug} article={a} size="compact" />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
