import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types/post";
import { HalalBadge } from "@/components/HalalBadge";

export default function Hero({ post }: { post: Post }) {
  return (
    <section className="grid gap-0.5 lg:grid-cols-[0.95fr_1.15fr] bg-[var(--color-border)]">
      <div className="bg-[var(--color-bg)] flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <span className="kicker">{post.kicker}</span>
        {post.halal_stance && (
          <div style={{ marginTop: '8px', marginBottom: '4px' }}>
            <HalalBadge stance={post.halal_stance} size="sm" />
          </div>
        )}
        <h1 className="font-headline text-balance mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-[var(--color-text)]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 max-w-md text-base text-[var(--color-text-dim)] leading-relaxed text-pretty">
            {post.excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
          <span>{post.author}</span>
          <span className="opacity-40">·</span>
          <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
          <span className="opacity-40">·</span>
          <span>{post.read_time || ''}</span>
        </div>
        <Link
          href={`/article/${post.slug}`}
          className="mt-8 inline-flex w-fit items-center bg-[var(--color-red)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-text)] hover:opacity-90 transition-opacity"
        >
          Read the story
        </Link>
      </div>
      <Link
        href={`/article/${post.slug}`}
        className="img-zoom relative min-h-[320px] lg:min-h-[560px] bg-[var(--color-card)] block"
      >
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </Link>
    </section>
  );
}
