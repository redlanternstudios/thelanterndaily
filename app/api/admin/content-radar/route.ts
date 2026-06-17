/**
 * POST /api/admin/content-radar
 *
 * Inbound webhook from Make.com scenario 03 (Content Radar).
 * Receives scored + screened articles from Groq, inserts into lantern_content_queue.
 *
 * Payload:
 *   articles_json  — JSON string: array of article objects from Groq
 *   source         — RSS source name (e.g. "salaamgateway.com")
 *
 * Article object shape (from Groq):
 *   { title, url, score, summary, halal_verdict?, halal_score?, halal_flags?, editorial_commentary? }
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

// Make.com sends a shared secret header for basic auth
const ADMIN_SECRET = process.env.ADMIN_WEBHOOK_SECRET ?? "";

type GroqArticle = {
  title: string;
  url: string;
  score: number; // 1-10 relevance
  summary: string;
  halal_verdict?: "pass" | "review" | "fail" | "pending_screen";
  halal_score?: number; // 0-100
  halal_flags?: string[];
  editorial_commentary?: string;
};

export async function POST(req: NextRequest) {
  // Basic auth check
  if (ADMIN_SECRET) {
    const secret = req.headers.get("x-admin-secret");
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

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

  let articles: GroqArticle[];
  try {
    // Groq sometimes wraps in markdown — strip it
    const cleaned = articles_json.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
    articles = JSON.parse(cleaned);
    if (!Array.isArray(articles)) throw new Error("Not an array");
  } catch (err) {
    console.error("[content-radar] Failed to parse articles_json:", err);
    return NextResponse.json({ error: "articles_json must be a valid JSON array" }, { status: 400 });
  }

  if (articles.length === 0) {
    return NextResponse.json({ ok: true, inserted: 0, skipped: 0 });
  }

  const supabase = createClient();
  let inserted = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const article of articles) {
    if (!article.title || !article.url) {
      skipped++;
      continue;
    }

    // Clamp score to 1-10 constraint
    const relevance_score = Math.min(10, Math.max(1, Math.round(article.score ?? 5)));

    // Dedup check: skip if URL already in queue in last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("lantern_content_queue")
      .select("id", { count: "exact", head: true })
      .eq("url", article.url)
      .gte("queued_at", sevenDaysAgo);

    if (count && count > 0) {
      skipped++;
      continue;
    }

    const halal_verdict = article.halal_verdict ?? "pending_screen";
    const status = halal_verdict === "fail" ? "rejected" : "pending";

    const { error } = await supabase.from("lantern_content_queue").insert({
      title: article.title,
      url: article.url,
      source: source ?? "make.com",
      content_type: "article",
      status,
      ai_summary: article.summary ?? null,
      editorial_commentary: article.editorial_commentary ?? null,
      halal_verdict,
      halal_score: article.halal_score ?? null,
      halal_flags: article.halal_flags ?? [],
      relevance_score,
      reject_reason:
        halal_verdict === "fail" && article.halal_flags?.length
          ? `Halal screening failed: ${article.halal_flags[0]}`
          : null,
    });

    if (error) {
      console.error("[content-radar] Insert failed for", article.url, error);
      errors.push(article.url);
    } else {
      inserted++;
    }
  }

  return NextResponse.json({
    ok: true,
    inserted,
    skipped,
    errors: errors.length > 0 ? errors : undefined,
  });
}
