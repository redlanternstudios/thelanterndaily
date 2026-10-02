import type { Post as DbPost } from "@/lib/supabase/types";

export type Post = DbPost;

// NOT a "client" module — no side effects on import
// Safe to import at module level in any Next.js context

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  let supabase;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    supabase = await createClient();
  } catch {
    return [];
  }

  try {
    let query = supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) { console.error("Error fetching published posts:", error); return []; }
    return (data as Post[]) || [];
  } catch (e) {
    console.error("Supabase query failed (build-time env missing?):", e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  let supabase;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    supabase = await createClient();
  } catch {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) { console.error("Error fetching post by slug:", slug, error); return null; }
    return data as Post | null;
  } catch {
    return null;
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  let supabase;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    supabase = await createClient();
  } catch {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);
    if (error) { console.error("Error fetching featured posts:", error); return []; }
    return (data as Post[]) || [];
  } catch {
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  let supabase;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    supabase = await createClient();
  } catch {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .order("published_at", { ascending: false });
    if (error) { console.error("Error fetching posts by category:", category, error); return []; }
    return (data as Post[]) || [];
  } catch {
    return [];
  }
}

export interface UnifiedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  hero_image_url: string;
  reading_time_minutes: number;
  published_at: string;
  created_at: string;
  status: string;
  halal_stance: "positive" | "critical" | "blocked" | "nuanced";
  editorial_note?: string;
  body?: string;
}

export async function getUnifiedPosts(limit?: number): Promise<UnifiedArticle[]> {
  const { ALL_ARTICLES } = await import("@/lib/content");
  const { normalizeCategory } = await import("@/lib/taxonomy");

  const dbPosts = await getPublishedPosts(limit);

  const staticPosts: UnifiedArticle[] = ALL_ARTICLES.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: normalizeCategory(a.category),
    image: a.image,
    hero_image_url: a.image,
    reading_time_minutes: parseInt(a.readTime) || 5,
    published_at: a.date,
    created_at: a.date,
    status: "published",
    halal_stance: ((a.halalReview?.verdict === "concern" ? "critical" : a.halalReview?.verdict === "pending" ? "nuanced" : a.halalReview?.verdict) || "positive") as "positive" | "critical" | "blocked" | "nuanced",
    editorial_note: a.halalReview?.editorialNote,
    body: a.body,
  }));

  const slugMap = new Map<string, UnifiedArticle>();

  // Map dbPosts first so real database content takes precedence
  dbPosts.forEach((p) => {
    const matchingStatic = ALL_ARTICLES.find((a) => a.slug === p.slug);
    const img = p.hero_image_url || matchingStatic?.image || "/images/hero-founder.png";
    slugMap.set(p.slug, {
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || p.summary || p.title,
      category: normalizeCategory(p.category),
      image: img,
      hero_image_url: img,
      reading_time_minutes: p.reading_time_minutes || 5,
      published_at: p.published_at || p.created_at,
      created_at: p.created_at,
      status: p.status,
      halal_stance: (p.halal_stance as any) || "positive",
      editorial_note: p.editorial_note || undefined,
      body: p.body_markdown || p.content_markdown || undefined,
    });
  });

  // Then fill in any static posts that are not yet in the DB
  staticPosts.forEach((p) => {
    if (!slugMap.has(p.slug)) {
      slugMap.set(p.slug, p);
    }
  });

  const all = Array.from(slugMap.values());
  return limit && limit > 0 ? all.slice(0, limit) : all;
}

