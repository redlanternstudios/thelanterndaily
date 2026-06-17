import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

/**
 * Beehiiv subscriber.created webhook handler.
 * Receives directly from Beehiiv (not via Make.com).
 * Syncs new subscribers to the local Supabase subscribers table.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const { email, id: beehiiv_id, utm_source, utm_medium } = body;

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("lantern_subscribers")
      .upsert({
        email: email.toLowerCase().trim(),
        beehiiv_id: beehiiv_id ?? null,
        subscription_tier: "free",
        is_active: true,
        subscribed_at: new Date().toISOString(),
      }, {
        onConflict: "email",
      })
      .select("id, email, operator_number")
      .single();

    if (error) {
      console.error("[webhooks/beehiiv-subscribe] Supabase error:", error);
      return NextResponse.json({ error: "Failed to sync subscriber" }, { status: 500 });
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (err) {
    console.error("[webhooks/beehiiv-subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
