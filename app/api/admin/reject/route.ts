import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

const ADMIN_KEY = process.env.ADMIN_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const { id } = await req.json().catch(() => ({}));

  // ── Validate admin key ────────────────────────────────────────────────────
  if (!key || key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("lantern_content_queue")
    .update({ status: "rejected", rejected_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")
    .select("id, title")
    .single();

  if (error) {
    console.error("[admin/reject] Supabase error:", error);
    return NextResponse.json({ error: "Failed to reject" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Story not found or already processed" }, { status: 404 });
  }

  return NextResponse.json({ success: true, story: data });
}
