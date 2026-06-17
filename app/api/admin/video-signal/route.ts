/**
 * POST /api/admin/video-signal
 *
 * Inbound webhook from Make.com scenario 07 (Video Pipeline).
 * Receives YouTube video data + Groq editorial, inserts into lantern_content_queue.
 *
 * Payload:
 *   video_id          — YouTube video ID (11 chars, e.g. "dQw4w9WgXcQ")
 *   title             — Video title
 *   channel_name      — Channel name
 *   description       — Video description (first 300 chars)
 *   editorial         — Groq-written 2-3 sentence editorial
 *   halal_verdict     — "pass" | "review" | "fail"
 *   halal_score       — 0-100
 *   halal_flags       — string[]
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

const ADMIN_SECRET = process.env.ADMIN_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  if (ADMIN_SECRET) {
    const secret = req.headers.get("x-admin-secret");
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: {
    video_id?: string;
    title?: string;
    channel_name?: string;
    description?: string;
    editorial?: string;
    halal_verdict?: "pass" | "review" | "fail" | "pending_screen";
    halal_score?: number;
    halal_flags?: string[];
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { video_id, title, channel_name, editorial, halal_verdict, halal_score } = body;

  if (!video_id || !title) {
    return NextResponse.json({ error: "Missing video_id or title" }, { status: 400 });
  }

  const supabase = createClient();

  // Dedup by video_id — a video should only appear once ever
  const { count } = await supabase
    .from("lantern_content_queue")
    .select("id", { count: "exact", head: true })
    .eq("youtube_video_id", video_id);

  if (count && count > 0) {
    return NextResponse.json({ ok: true, inserted: 0, skipped: 1, reason: "video_already_queued" });
  }

  const verdict = halal_verdict ?? "pending_screen";

  const { error } = await supabase.from("lantern_content_queue").insert({
    title,
    url: `https://www.youtube.com/watch?v=${video_id}`,
    source: channel_name ?? "YouTube",
    content_type: "video",
    status: verdict === "fail" ? "rejected" : "pending",
    editorial_commentary: editorial ?? null,
    youtube_video_id: video_id,
    source_excerpt: body.description ? body.description.slice(0, 300) : null,
    halal_verdict: verdict,
    halal_score: halal_score ?? null,
    halal_flags: body.halal_flags ?? [],
    relevance_score: 9,
    reject_reason:
      verdict === "fail" && body.halal_flags?.length
        ? `Halal screening failed: ${body.halal_flags[0]}`
        : null,
  });

  if (error) {
    console.error("[video-signal] Insert failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inserted: 1 });
}
