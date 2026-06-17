import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

export async function POST(req: NextRequest) {
  try {
    const { id, scheduled_for } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("lantern_content_queue")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        ...(scheduled_for ? { scheduled_for } : {}),
      })
      .eq("id", id);

    if (error) {
      console.error("[queue/approve]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[queue/approve] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
