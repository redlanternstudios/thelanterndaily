import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/content";

export default function ArticleCard({
  article,
  size = "default",
}: {
  article: Article;
  size?: "default" | "compact";
}) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group card-hover flex flex-col bg-[var(--color-card)] border border-[var(--color-border)] h-full"
    >
      <div className="img-zoom relative aspect-[3/2] w-full overflow-hidden bg-[var(--color-bg)]">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className={`flex flex-col gap-2 ${size === "compact" ? "p-4" : "p-5"}`}>
        <span className="kicker">{article.kicker}</span>
        <h3
          className={`font-headline text-balance leading-snug text-[var(--color-text)] group-hover:text-[var(--color-red)] transition-colors ${
            size === "compact" ? "text-lg" : "text-xl"
          }`}
        >
          {article.title}
        </h3>
        {size === "default" && (
          <p className="text-sm text-[var(--color-text-dim)] leading-relaxed text-pretty">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto pt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
          <span>{article.author}</span>
          <span className="opacity-40">·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
