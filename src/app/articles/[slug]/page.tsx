import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const MOCK_ARTICLES: Record<string, any> = {
  "the-digital-renaissance": {
    id: "1",
    slug: "the-digital-renaissance",
    title: "The Digital Renaissance: How AI is Reshaping Creative Industries",
    excerpt: "From music production to visual arts, artificial intelligence is fundamentally changing how we create and consume art. But is it a threat or an opportunity?",
    content: `
      <p>In studios across the globe, a quiet revolution is taking place. Artificial intelligence tools are no longer just novelties—they are becoming essential instruments in the creative process.</p>
      <p>From Grammy-winning producers using AI to generate harmonic progressions to visual artists creating stunning works through text prompts, the line between human and machine creativity is blurring.</p>
      <p>But this transformation raises profound questions: What happens to the role of the artist? Can AI truly be creative, or is it merely mimicking? And how do we value art when anyone can generate a masterpiece with a few keystrokes?</p>
      <h2>The Tools of Transformation</h2>
      <p>Today's creative AI tools range from the familiar—Adobe's Firefly, OpenAI's DALL-E, and Midjourney—to specialized platforms like AIVA for music composition and Runway for video editing. These tools are not replacing creatives; they are changing the workflow.</p>
      <p>Photographers now spend less time on retouching and more on composition. Writers use AI for research and outlining. Musicians explore chord progressions they never would have considered.</p>
      <h2>The Economic Impact</h2>
      <p>According to a recent study by the Creative Economy Institute, AI-assisted creators report 40% higher productivity. But the same study warns that entry-level positions in design and content creation have declined 15% year-over-year.</p>
      <p>For established creators, the calculus is clear: adapt or risk irrelevance. But for aspiring artists, the barriers to entry have never been lower—or the path to sustainable income more uncertain.</p>
      <h2>Looking Ahead</h2>
      <p>The next five years will determine whether AI becomes a tool of liberation or consolidation in creative industries. What's certain is that the digital renaissance is already here—and it's reshaping everything.</p>
    `,
    author: "The Lantern Daily",
    category: "Technology",
    published_at: "2026-06-13T08:00:00Z",
    updated_at: null,
    read_time: 8,
    featured: true,
    tags: ["AI", "creativity", "technology"],
    status: "published",
  },
  "climate-adaptation-cities": {
    id: "2",
    slug: "climate-adaptation-cities",
    title: "Rising Waters, Rising Solutions: How Coastal Cities Are Adapting",
    excerpt: "Miami, Amsterdam, and Jakarta are racing against time to build infrastructure that can withstand rising sea levels.",
    content: `
      <p>Coastal cities around the world face an unprecedented challenge: sea levels are rising faster than most models predicted just five years ago. But from the Netherlands to Indonesia, innovative solutions are emerging.</p>
      <p>Miami has invested $4 billion in a comprehensive flood management system that includes elevated roads, pump stations, and living shorelines. Amsterdam continues to refine its world-famous water management systems. Jakarta is building a massive sea wall while simultaneously addressing the ground-water extraction that has caused the city to sink.</p>
      <p>The lesson? Adaptation is possible—but it requires political will, significant investment, and community buy-in.</p>
      <p>As other coastal cities from Bangkok to New York watch closely, the approaches pioneered by these front-line cities may well define how humanity copes with a changing climate.</p>
    `,
    author: "The Lantern Daily",
    category: "Environment",
    published_at: "2026-06-12T10:30:00Z",
    updated_at: null,
    read_time: 12,
    featured: true,
    tags: ["climate", "cities", "infrastructure"],
    status: "published",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_ARTICLES[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      authors: ["The Lantern Daily"],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = MOCK_ARTICLES[slug];

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.published_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="container-narrow py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 font-sans text-sm text-lantern-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-lantern-red transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        {article.category && (
          <>
            <Link
              href={`/categories/${article.category.toLowerCase()}`}
              className="hover:text-lantern-red transition-colors"
            >
              {article.category}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-lantern-ink">{article.title}</span>
      </nav>

      {/* Category Badge */}
      {article.category && (
        <span className="inline-block font-sans text-xs font-semibold uppercase tracking-wider text-lantern-red mb-3">
          {article.category}
        </span>
      )}

      {/* Title */}
      <h1 className="headline-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-lantern-dark leading-tight">
        {article.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 font-sans text-sm text-lantern-muted mb-8 pb-8 border-b border-lantern-border">
        <span className="font-medium text-lantern-ink">The Lantern Daily</span>
        <time dateTime={article.published_at}>{formattedDate}</time>
        {article.read_time && <span>{article.read_time} min read</span>}
      </div>

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:headline-serif prose-headings:text-lantern-dark prose-p:text-lantern-ink prose-p:leading-relaxed prose-a:text-lantern-red prose-strong:text-lantern-dark font-sans"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-lantern-border">
          <h3 className="font-sans text-sm font-semibold text-lantern-dark uppercase tracking-wider mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-sans text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-lantern-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-12">
        <Link
          href="/"
          className="font-sans text-sm text-lantern-red hover:text-red-700 transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    </article>
  );
}
