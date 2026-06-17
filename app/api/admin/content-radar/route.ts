import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

const ADMIN_SECRET = process.env.ADMIN_WEBHOOK_SECRET;

interface IncomingArticle {
  title: string;
  url: string;
  score: number;
  summary?: string;
  halal_verdict?: string;
  halal_score?: number;
  halal_flags?: string[];
}

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: { articles_json?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { articles_json, source } = body;
  if (!articles_json) {
    return NextResponse.json({ error: "Missing articles_json" }, { status: 400 });
  }

  let articles: IncomingArticle[];
  try {
    articles = JSON.parse(articles_json);
    if (!Array.isArray(articles)) throw new Error("Not an array");
  } catch {
    return NextResponse.json({ error: "articles_json must be a JSON array" }, { status: 400 });
  }

  if (articles.length === 0) {
    return NextResponse.json({ inserted: 0, skipped: 0 });
  }

  const supabase = createClient();
  let inserted = 0;
  let skipped = 0;

  for (const article of articles) {
    if (!article.url || !article.title) {
      skipped++;
      continue;
    }

    // ── Dedup check ──────────────────────────────────────────────────────────
    const { data: existing } = await supabase
      .from("lantern_content_queue")
      .select("id")
      .eq("url", article.url)
      .maybeSingle();

    if (existing) {
      skipped++;
      continue;
    }

    // ── Insert ───────────────────────────────────────────────────────────────
    const { error } = await supabase.from("lantern_content_queue").insert({
      title: article.title,
      url: article.url,
      excerpt: article.summary ?? null,
      relevance_score: article.score ?? null,
      halal_classification: article.halal_verdict ?? null,
      halal_score: article.halal_score ?? null,
      status: "pending",
      content_type: "article",
      source_name: source ?? null,
      published_at: new Date().toISOString(),
    });

    if (error) {
      console.error("[content-radar] insert error:", error.message, article.url);
      skipped++;
    } else {
      inserted++;
    }
  }

  return NextResponse.json({ inserted, skipped, total: articles.length });
}
