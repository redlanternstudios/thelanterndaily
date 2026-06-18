/**
 * POST /api/admin/content-radar
 *
 * Receives processed article data from Make.com Lantern C1 - Content Radar scenario.
 * Validates x-admin-secret header, parses articles_json from OpenAI output,
 * upserts content radar entries into Supabase.
 *
 * Called by: Make.com HTTP (legacy) Module 3 — every 4 hours
 * Auth: x-admin-secret header (value must match ADMIN_SECRET env var)
 *
 * Payload: { articles_json: string, source: string }
 */

import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const ADMIN_SECRET = process.env.ADMIN_SECRET
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

function isAuthorized(req: NextRequest): boolean {
  const secret = req.headers.get("x-admin-secret")
  if (!ADMIN_SECRET) {
    console.error("[content-radar] ADMIN_SECRET env var not set")
    return false
  }
  return secret === ADMIN_SECRET
}

interface RadarArticle {
  title: string
  url: string
  summary?: string
  category?: string
  signal?: "HALAL-ALIGNED" | "CRITICAL" | "BLOCKED" | "NUANCED"
  published_at?: string
  source?: string
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { articles_json?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { articles_json, source } = body

  if (!articles_json) {
    return NextResponse.json({ error: "Missing articles_json" }, { status: 400 })
  }

  // Strip markdown code fences if OpenAI wrapped the JSON
  let articles: RadarArticle[] = []
  try {
    const cleaned = articles_json
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim()
    const parsed = JSON.parse(cleaned)
    articles = Array.isArray(parsed) ? parsed : [parsed]
  } catch (e) {
    console.error("[content-radar] Failed to parse articles_json:", e)
    return NextResponse.json(
      { error: "Failed to parse articles_json", detail: articles_json.slice(0, 200) },
      { status: 422 }
    )
  }

  if (articles.length === 0) {
    return NextResponse.json({ message: "No articles to process", count: 0 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  const rows = articles.map((article) => ({
    title: article.title ?? null,
    url: article.url ?? null,
    summary: article.summary ?? null,
    category: article.category ?? null,
    signal: article.signal ?? null,
    published_at: article.published_at ?? null,
    source: article.source ?? source ?? null,
    ingested_at: new Date().toISOString(),
  }))

  const { data, error } = await supabase
    .from("content_radar")
    .upsert(rows, { onConflict: "url", ignoreDuplicates: false })
    .select("id, url")

  if (error) {
    console.error("[content-radar] Supabase upsert error:", error)
    return NextResponse.json(
      { error: "Database error", detail: error.message },
      { status: 500 }
    )
  }

  console.log(`[content-radar] Upserted ${rows.length} articles from ${source}`)
  return NextResponse.json({
    message: "Content radar updated",
    count: rows.length,
    source,
    ids: data?.map((r) => r.id) ?? [],
  })
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
