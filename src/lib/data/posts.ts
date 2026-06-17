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
