import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

const ADMIN_KEY = process.env.ADMIN_WEBHOOK_SECRET;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const { id } = params;

  // ── Validate admin key ────────────────────────────────────────────────────
  if (!key || key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("lantern_content_queue")
    .update({ status: "approved", approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")
    .select("id, title")
    .single();

  if (error) {
    console.error("[admin/approve/id] Supabase error:", error);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Story not found or already processed" }, { status: 404 });
  }

  // Redirect back to digest or show success page
  const redirectUrl = new URL(req.url);
  redirectUrl.pathname = "/admin";
  redirectUrl.searchParams.set("approved", id);

  return NextResponse.redirect(redirectUrl, 302);
}
