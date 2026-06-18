import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.BEEHIIV_WEBHOOK_SECRET;
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = await createClient();
  const { title, slug, summary, content_html, published_at, status, tags } = body;

  const { error } = await supabase.from("lantern_issues").upsert(
    {
      title: title || "Untitled",
      slug: slug || title?.toLowerCase().replace(/\s+/g, "-"),
      summary: summary || null,
      content_html: content_html || null,
      published_at: published_at ? new Date(published_at).toISOString() : new Date().toISOString(),
      status: status || "published",
      tags: tags || [],
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.error("Beehiiv webhook upsert failed:", error);
    return NextResponse.json({ error: "Upsert failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
