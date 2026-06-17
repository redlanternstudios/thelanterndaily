import { createClient } from "@/lib/supabase/server";
import type { Post as DbPost } from "@/lib/supabase/types";

// Re-export the database Post type as the canonical Post for consumers
export type Post = DbPost;

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (limit && limit > 0) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }

  return (data as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching post by slug: " + slug, error);
    return null;
  }

  return data as Post | null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }

  return (data as Post[]) || [];
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by category: " + category, error);
    return [];
  }

  return (data as Post[]) || [];
}
