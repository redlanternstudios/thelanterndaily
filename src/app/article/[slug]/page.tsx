import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SubscribeForm from "@/components/SubscribeForm";
import { HalalBadge } from "@/components/HalalBadge";
import { getPostBySlug, getPublishedPosts } from "@/lib/data/posts";
import { SOCIAL_PROOF } from "@/lib/content";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPublishedPosts(4);
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Normalize DB field names to display-friendly names
  const excerpt = post.summary || "";
  const kicker = post.category || "";
  const author = "The Lantern Daily";
  const readTime = post.reading_time_minutes
    ? `${post.reading_time_minutes} min read`
    : "";
  const imageUrl = post.hero_image_url || "/placeholder.svg";
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const bodyParagraphs: string[] = post.summary ? [post.summary] : [];

  return (
    <>
      <Masthead />
      <Ticker />

      {/* Full-width header */}
      <header className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <Link
            href={`/archive?cat=${post.category}`}
            className="kicker inline-block hover:opacity-80"
          >
            {kicker}
          </Link>
          {post.halal_stance && (
            <div style={{ marginBottom: "16px", marginTop: "12px", display: "flex", justifyContent: "center" }}>
              <HalalBadge stance={post.halal_stance} size="md" />
            </div>
          )}
          <h1 className="font-headline text-balance mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[var(--color-text)]">
            {post.title}
          </h1>
          {excerpt && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-dim)] leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
            <span className="text-[var(--color-text)]">{author}</span>
            <span className="opacity-40">·</span>
            <span>{publishedDate}</span>
            <span className="opacity-40">·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full bg-[var(--color-card)]">
        <Image
          src={imageUrl}
          alt={post.title}
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
            {bodyParagraphs.length > 0 ? (
              bodyParagraphs.map((p, i) => (
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
              ))
            ) : (
              <p className="text-lg text-[var(--color-text-dim)] leading-relaxed">
                Full article content loading from database...
              </p>
            )}

            {/* Editorial note — Islamic Lens */}
            {post.editorial_note && (
              <div style={{
                borderLeft: "3px solid var(--color-red)",
                paddingLeft: "20px",
                marginTop: "40px",
                fontStyle: "italic",
              }}>
                <div style={{
                  fontWeight: 700,
                  fontStyle: "normal",
                  marginBottom: "8px",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-red)",
                }}>
                  Islamic Lens
                </div>
                <p className="text-[var(--color-text-dim)] leading-relaxed">{post.editorial_note}</p>
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
                  {related.map((p) => (
                    <ArticleCard key={p.slug} post={p} size="compact" />
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
