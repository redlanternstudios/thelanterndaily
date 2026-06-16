import Link from "next/link";
import Image from "next/image";
import { HERO_ARTICLE } from "@/lib/content";

export default function Hero() {
  const a = HERO_ARTICLE;
  return (
    <section className="grid gap-0.5 lg:grid-cols-[0.95fr_1.15fr] bg-[var(--color-border)]">
      <div className="bg-[var(--color-bg)] flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <span className="kicker">{a.kicker}</span>
        <h1 className="font-headline text-balance mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-[var(--color-text)]">
          {a.title}
        </h1>
        <p className="mt-5 max-w-md text-base text-[var(--color-text-dim)] leading-relaxed text-pretty">
          {a.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
          <span>The Lantern Daily</span>
          <span className="opacity-40">·</span>
          <span>{a.date}</span>
          <span className="opacity-40">·</span>
          <span>{a.readTime}</span>
        </div>
        <Link
          href={`/article/${a.slug}`}
          className="mt-8 inline-flex w-fit items-center bg-[var(--color-red)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-text)] hover:opacity-90 transition-opacity"
        >
          Read the story
        </Link>
      </div>
      <Link
        href={`/article/${a.slug}`}
        className="img-zoom relative min-h-[320px] lg:min-h-[560px] bg-[var(--color-card)] block"
      >
        <Image
          src={a.image || "/placeholder.svg"}
          alt={a.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </Link>
    </section>
  );
}
