import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/supabase/types";
import type { Article } from "@/lib/content";
import HalalBadge from "@/components/halal/HalalBadge";

export default function ArticleCard({
  post,
  article,
  size = "default",
}: {
  post?: Post;
  article?: Article;
  size?: "default" | "compact";
}) {
  // Support both Post (Supabase) and Article (static fallback)
  const title = post?.title ?? article?.title ?? "";
  const slug = post?.slug ?? article?.slug ?? "";
  const excerpt = post?.summary ?? article?.excerpt ?? "";
  const image = post?.hero_image_url ?? article?.image ?? "/placeholder.svg";
  const author = article?.author ?? "";
  const readTime = article?.readTime ?? (post?.reading_time_minutes ? `${post.reading_time_minutes} min read` : "");
  const kicker = article?.kicker ?? post?.category ?? "";
  const halalStance = post?.halal_stance ?? null;

  return (
    <Link
      href={`/article/${slug}`}
      className="group card-hover flex flex-col bg-[var(--color-card)] border border-[var(--color-border)] h-full relative"
    >
      <div className="img-zoom relative aspect-[3/2] w-full overflow-hidden bg-[var(--color-bg)]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />
        {halalStance && (
          <HalalBadge
            stance={halalStance as "positive" | "critical" | "blocked" | "nuanced"}
            position="overlay"
          />
        )}
      </div>
      <div className={`flex flex-col gap-2 ${size === "compact" ? "p-4" : "p-5"}`}>
        {kicker && <span className="kicker">{kicker}</span>}
        <h3
          className={`font-headline text-balance leading-snug text-[var(--color-text)] group-hover:text-[var(--color-red)] transition-colors ${
            size === "compact" ? "text-lg" : "text-xl"
          }`}
        >
          {title}
        </h3>
        {size === "default" && excerpt && (
          <p className="text-sm text-[var(--color-text-dim)] leading-relaxed text-pretty">
            {excerpt}
          </p>
        )}
        <div className="mt-auto pt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
          <span>{author}</span>
          {readTime && (
            <>
              <span className="opacity-40">·</span>
              <span>{readTime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
