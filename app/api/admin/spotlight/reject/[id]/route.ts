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
    .from("lantern_user_spotlights")
    .update({
      status: "archived",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "draft")
    .select("id, name, status")
    .single();

  if (error) {
    console.error("[admin/spotlight/reject] Supabase error:", error);
    return NextResponse.json({ error: "Failed to reject spotlight" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Spotlight not found or already processed" }, { status: 404 });
  }

  return NextResponse.json({ success: true, spotlight: data });
}
