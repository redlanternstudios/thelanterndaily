import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

/**
 * Beehiiv post.published webhook handler.
 * Receives webhook from Make.com (D1 relay), sanitizes, and stores in Supabase.
 * Make.com forwards the raw Beehiiv payload — this route processes it.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // ── Validate payload ──────────────────────────────────────────────────────
  const { id: beehiiv_post_id, slug, title, content_type } = body;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    // Extract plain text excerpt from HTML content (first 280 chars)
    const excerpt = body.excerpt
      ?? body.meta_default_description
      ?? body.subtitle
      ?? "";

    // Upsert into lantern_posts
    const { data, error } = await supabase
      .from("lantern_posts")
      .upsert({
        title: title ?? slug,
        slug,
        excerpt: excerpt.slice(0, 280),
        body_html: body.content?.free?.web ?? body.content?.premium?.web ?? null,
        post_type: content_type === "short" ? "short" : "daily-dispatch",
        status: "published",
        author_name: "The Lantern Daily",
        beehiiv_post_id: beehiiv_post_id ?? null,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "slug",
      })
      .select("id, slug, title")
      .single();

    if (error) {
      console.error("[webhooks/beehiiv] Supabase error:", error);
      return NextResponse.json({ error: "Failed to store post" }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (err) {
    console.error("[webhooks/beehiiv] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
