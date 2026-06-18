import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import type { Post } from "@/lib/types/post";
import { HalalBadge } from "@/components/HalalBadge";

function PlayIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center bg-[var(--color-red)]">
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
        <path d="M0 0L20 11L0 22V0Z" fill="currentColor" className="text-[var(--color-text)]" />
      </svg>
    </span>
  );
}

export default function SecondRow({ videoPost, sidePosts }: { videoPost: Post; sidePosts: Post[] }) {
  return (
    <section className="grid gap-0.5 lg:grid-cols-[1.1fr_0.7fr_0.7fr] bg-[var(--color-border)]">
      <Link
        href={`/article/${videoPost.slug}`}
        className="group img-zoom relative min-h-[300px] lg:min-h-[380px] bg-[var(--color-card)] block"
      >
        <Image
          src={videoPost.hero_image_url || "/placeholder.svg"}
          alt={videoPost.title}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover opacity-90"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
        <span className="absolute left-6 top-6 z-10">
          <PlayIcon />
        </span>
        <span className="absolute inset-x-6 bottom-6 z-10">
          <span className="kicker block">{videoPost.category || ""}</span>
          {videoPost.halal_stance && (
            <div style={{ marginTop: '6px' }}>
              <HalalBadge stance={videoPost.halal_stance} size="sm" />
            </div>
          )}
          <span className="font-headline mt-2 block text-2xl text-balance text-[var(--color-text)] group-hover:text-[var(--color-red)] transition-colors">
            {videoPost.title}
          </span>
        </span>
      </Link>
      {sidePosts.slice(0, 2).map((p) => (
        <ArticleCard key={p.slug} post={p} size="compact" />
      ))}
    </section>
  );
}
