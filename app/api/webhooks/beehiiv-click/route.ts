import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

/**
 * Beehiiv email.clicked webhook handler (UT3).
 * Receives forwarded click data from Make.com.
 * Only logs clicks matching affiliate/UTM patterns — filtering happens in Make.com.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const { subscriber_id, url, clicked_at } = body;

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("lantern_affiliate_clicks")
      .insert({
        subscriber_id,
        target_url: url,
        clicked_at: clicked_at ?? new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("[webhooks/beehiiv-click] Supabase error:", error);
      return NextResponse.json({ error: "Failed to log click" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("[webhooks/beehiiv-click] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
