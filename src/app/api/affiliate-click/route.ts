import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceType, sourceId, affiliateLink, utmSource, utmCampaign } = body;

    if (!sourceType || !affiliateLink) {
      return NextResponse.json(
        { error: "sourceType and affiliateLink are required" },
        { status: 400 }
      );
    }

    // Persist to Supabase when configured
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (url && key) {
        const { getSupabase } = await import("@/lib/supabase");
        await getSupabase().from("lantern_affiliate_clicks").insert({
          source_type: sourceType,
          source_id: sourceId || null,
          affiliate_link: affiliateLink,
          utm_source: utmSource || "lantern",
          utm_medium: "lantern",
          utm_campaign: utmCampaign || null,
          clicked_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.log("[v0] affiliate click tracking skipped:", (err as Error).message);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
