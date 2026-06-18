import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

export async function POST(req: NextRequest) {
  try {
    const { id, reject_reason } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("lantern_content_queue")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reject_reason: reject_reason ?? null,
      })
      .eq("id", id);

    if (error) {
      console.error("[queue/reject]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[queue/reject] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
