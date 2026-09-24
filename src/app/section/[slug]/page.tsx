import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import LanternSeal from '@/components/lantern/LanternSeal';
import EditorialStatusBadge from '@/components/editorial/EditorialStatusBadge';
import NewsletterBanner from '@/components/editorial/NewsletterBanner';
import {
  CANONICAL_CATEGORIES,
  CATEGORY_DEFINITIONS,
  getCategoryBySlug,
} from '@/lib/taxonomy';
import {
  ALL_ARTICLES,
  STRUCTURED_CATEGORY_STORIES,
  Article,
} from '@/lib/content';

export function generateStaticParams() {
  return Object.values(CATEGORY_DEFINITIONS).map((def) => ({
    slug: def.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const def = getCategoryBySlug(slug);
  if (!def) return { title: 'Section Not Found | The Lantern Daily' };

  return {
    title: `${def.name} | The Lantern Daily Intelligence`,
    description: def.tagline,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const def = getCategoryBySlug(slug);

  if (!def) {
    notFound();
  }

  // Gather all articles in this category
  const matchingArticles: Article[] = ALL_ARTICLES.filter(
    (a) => a.category === def.name
  );
  const structuredStories = STRUCTURED_CATEGORY_STORIES[def.name] || [];

  const leadStory = matchingArticles[0] || null;
  const secondaryStories = matchingArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE] antialiased">
      <Masthead />

      {/* ── Breadcrumbs & Global Context Bar ── */}
      <div className="border-b border-[#1A1E2B] bg-[#0A0C14] px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#F7F2EE] transition-colors">
              Today
            </Link>
            <span className="text-[#3A3F4D]">/</span>
            <span className="text-[#6B7280]">Sections</span>
            <span className="text-[#3A3F4D]">/</span>
            <span className="font-semibold text-[#F7F2EE]">{def.name}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#4ADE80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            <span>SECTOR MONITOR ACTIVE</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* ── Section Header ── */}
        <header className="border-b border-[#1A1E2B] pb-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#B8922A]">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: def.accent }} />
            <span>Section Intelligence Desk</span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-5xl">
            {def.name}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            {def.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-[#6B7280]">
            <span className="text-[#D1D5DB]">
              {matchingArticles.length + structuredStories.length} Verified Briefings
            </span>
            <span>·</span>
            <span>AAOIFI &amp; Sovereign Standard Enforced</span>
            <span>·</span>
            {def.name === 'Markets & Islamic Finance' && (
              <Link
                href="/markets"
                className="text-[#B8922A] hover:text-[#E5C058] underline"
              >
                Open Full Financial Terminal →
              </Link>
            )}
            {def.name === 'Open Source & Operator Stack' && (
              <Link
                href="/stack"
                className="text-[#B8922A] hover:text-[#E5C058] underline"
              >
                View Downloadable Runbooks →
              </Link>
            )}
          </div>
        </header>

        {/* ── Lead Story of Section ── */}
        {leadStory && (
          <section className="mt-10 border-b border-[#1A1E2B] pb-12">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#D42535]">
                      Lead Investigation
                    </span>
                    <span className="text-[#4B5563]">/</span>
                    <EditorialStatusBadge status="VERIFIED" confidence="HIGH" />
                  </div>

                  <h2 className="mt-4 font-serif text-2xl font-bold leading-tight text-[#F7F2EE] sm:text-3xl lg:text-4xl">
                    <Link
                      href={`/article/${leadStory.slug}`}
                      className="hover:text-[#E5C058] transition-colors"
                    >
                      {leadStory.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
                    {leadStory.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A1E2B] pt-4 font-mono text-xs">
                  <div className="text-[#6B7280]">
                    By <span className="text-[#D1D5DB]">{leadStory.author}</span> · {leadStory.readTime}
                  </div>
                  <Link
                    href={`/article/${leadStory.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#D42535] hover:text-white transition-colors"
                  >
                    Read Complete Investigation →
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden rounded-sm border border-[#1A1E2B] bg-[#0A0C14] lg:col-span-5">
                <Image
                  src={leadStory.image}
                  alt={leadStory.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Structured Secondary Stories Grid ── */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between border-b border-[#1A1E2B] pb-3 font-mono text-xs uppercase tracking-widest text-[#B8922A]">
            <span>Verified Intelligence Desk ({def.name})</span>
            <span className="text-[#6B7280]">Filtered for High Conviction</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render secondary static articles */}
            {secondaryStories.map((story) => (
              <div
                key={story.slug}
                className="group flex flex-col justify-between border border-[#1A1E2B] bg-[#0A0C14] p-5 transition-all hover:border-[#D42535] hover:bg-[#0D0F18]"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07080D]">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#6B7280]">
                    <span>{story.kicker}</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-[#F7F2EE] group-hover:text-[#E5C058] transition-colors">
                    <Link href={`/article/${story.slug}`}>{story.title}</Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF] line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#161822] pt-3 font-mono text-xs">
                  <span className="text-[#6B7280]">{story.date}</span>
                  <Link
                    href={`/article/${story.slug}`}
                    className="font-semibold text-[#B8922A] group-hover:text-[#E5C058]"
                  >
                    Read Briefing →
                  </Link>
                </div>
              </div>
            ))}

            {/* Render structured stories from repository */}
            {structuredStories.map((story) => (
              <div
                key={story.id}
                className="group flex flex-col justify-between border border-[#1A1E2B] bg-[#0A0C14] p-5 transition-all hover:border-[#B8922A] hover:bg-[#0D0F18]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <EditorialStatusBadge
                      status={story.editorialStatus}
                      confidence={story.confidence}
                    />
                    <span className="font-mono text-xs text-[#6B7280]">
                      {story.readTimeMinutes}m read
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-[#F7F2EE] group-hover:text-[#E5C058] transition-colors">
                    <Link href={`/article/${story.slug}`}>{story.headline}</Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF] line-clamp-3">
                    {story.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#161822] pt-3 font-mono text-xs">
                  <span className="text-[#6B7280]">Source: {story.sourceName}</span>
                  <Link
                    href={`/article/${story.slug}`}
                    className="font-semibold text-[#B8922A] group-hover:text-[#E5C058]"
                  >
                    Read Briefing →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Newsletter Conversion Banner ── */}
        <div className="mt-16">
          <NewsletterBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
