import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import CategoryBadge from "@/components/CategoryBadge";

const FEATURED_ARTICLES = [
  {
    id: "1",
    slug: "the-digital-renaissance",
    title: "The Digital Renaissance: How AI is Reshaping Creative Industries",
    excerpt:
      "From music production to visual arts, artificial intelligence is fundamentally changing how we create and consume art. But is it a threat or an opportunity?",
    content: "",
    author: "Sarah Chen",
    category: "Technology",
    published_at: "2026-06-13T08:00:00Z",
    updated_at: null,
    read_time: 8,
    featured: true,
    tags: ["AI", "creativity", "technology"],
    status: "published" as const,
  },
  {
    id: "2",
    slug: "climate-adaptation-cities",
    title: "Rising Waters, Rising Solutions: How Coastal Cities Are Adapting",
    excerpt:
      "Miami, Amsterdam, and Jakarta are racing against time to build infrastructure that can withstand rising sea levels. Here's what's working.",
    content: "",
    author: "Marcus Williams",
    category: "Environment",
    published_at: "2026-06-12T10:30:00Z",
    updated_at: null,
    read_time: 12,
    featured: true,
    tags: ["climate", "cities", "infrastructure"],
    status: "published" as const,
  },
  {
    id: "3",
    slug: "future-of-remote-work",
    title: "Beyond the Office: What the Data Says About Remote Work in 2026",
    excerpt:
      "Four years after the great return-to-office push, the numbers tell a surprising story about productivity, wellbeing, and where work actually happens.",
    content: "",
    author: "Elena Rodriguez",
    category: "Business",
    published_at: "2026-06-11T14:00:00Z",
    updated_at: null,
    read_time: 6,
    featured: false,
    tags: ["work", "remote", "business"],
    status: "published" as const,
  },
  {
    id: "5",
    slug: "quantum-computing-breakthrough",
    title: "Quantum Computing Hits a Milestone: What Error Correction Means",
    excerpt:
      "A major breakthrough in quantum error correction brings practical quantum computers closer than ever. Here's why it matters.",
    content: "",
    author: "Dr. Priya Patel",
    category: "Technology",
    published_at: "2026-06-09T11:00:00Z",
    updated_at: null,
    read_time: 9,
    featured: false,
    tags: ["quantum", "computing", "science"],
    status: "published" as const,
  },
  {
    id: "4",
    slug: "indie-film-renaissance",
    title: "The Indie Film Renaissance: How Streaming Changed Storytelling",
    excerpt:
      "Small-budget films are finding global audiences like never before. A look at the filmmakers redefining what cinema can be.",
    content: "",
    author: "James Okafor",
    category: "Culture",
    published_at: "2026-06-10T09:15:00Z",
    updated_at: null,
    read_time: 10,
    featured: false,
    tags: ["film", "streaming", "culture"],
    status: "published" as const,
  },
  {
    id: "6",
    slug: "global-food-systems",
    title: "The Future of Food: Can Vertical Farming Feed the World?",
    excerpt:
      "With the global population approaching 9 billion, innovative farming methods are emerging to address food security. Vertical farming leads the charge.",
    content: "",
    author: "Amara Obi",
    category: "Science",
    published_at: "2026-06-08T07:30:00Z",
    updated_at: null,
    read_time: 7,
    featured: false,
    tags: ["food", "agriculture", "innovation"],
    status: "published" as const,
  },
];

const CATEGORIES = [
  { name: "Technology", count: 2 },
  { name: "Environment", count: 1 },
  { name: "Business", count: 1 },
  { name: "Culture", count: 1 },
  { name: "Science", count: 1 },
  { name: "Politics", count: 0 },
];

export default function HomePage() {
  const featured = FEATURED_ARTICLES.filter((a) => a.featured);
  const latest = FEATURED_ARTICLES.filter((a) => !a.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-lantern-dark text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-widest text-lantern-gold mb-4">
              Featured Story
            </span>
            <h1 className="headline-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              {featured[0]?.title}
            </h1>
            <p className="text-gray-300 font-sans text-lg leading-relaxed mb-8 max-w-2xl">
              {featured[0]?.excerpt}
            </p>
            <div className="flex items-center gap-4 font-sans text-sm text-gray-400">
              <span className="font-medium text-white">
                {featured[0]?.author}
              </span>
              <span>·</span>
              <span>{featured[0]?.read_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="border-b border-lantern-border bg-white">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-sm text-lantern-muted">
            {FEATURED_ARTICLES.length} stories and counting
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-lantern-border bg-white">
        <div className="container-wide py-4 flex flex-wrap items-center gap-2">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-lantern-muted mr-2">
            Browse:
          </span>
          {CATEGORIES.map((cat) => (
            <CategoryBadge
              key={cat.name}
              category={cat.name}
              count={cat.count}
            />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container-wide py-12">
        <h2 className="headline-serif text-2xl mb-8 text-lantern-dark">
          Latest Stories
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          {featured.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
