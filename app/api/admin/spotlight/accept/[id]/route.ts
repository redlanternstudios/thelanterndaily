import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

const ADMIN_KEY = process.env.ADMIN_WEBHOOK_SECRET;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const { id } = await params;

  // ── Validate admin key ────────────────────────────────────────────────────
  if (!key || key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("lantern_user_spotlights")
    .update({
      status: "published",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "draft")
    .select("id, name, status")
    .single();

  if (error) {
    console.error("[admin/spotlight/accept] Supabase error:", error);
    return NextResponse.json({ error: "Failed to accept spotlight" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Spotlight not found or already processed" }, { status: 404 });
  }

  // Trigger Make.com SP1 accept webhook
  const makeWebhook = process.env.MAKE_SPOTLIGHT_ACCEPT_WEBHOOK;
  if (makeWebhook) {
    fetch(makeWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "accepted", builder_name: data.name }),
    }).catch((err) => console.error("[spotlight] Make.com notification failed:", err));
  }

  return NextResponse.json({ success: true, spotlight: data });
}
