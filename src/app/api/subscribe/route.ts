import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let email = "";
  let refCode: string | null = null;

  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    refCode = typeof body.ref === "string" ? body.ref.trim() : null;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  // Persist to Supabase when configured
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const { getSupabase } = await import("@/lib/supabase");
      const payload: Record<string, unknown> = { email };
      if (refCode) {
        payload.ref_code = refCode;
      }
      await getSupabase().from("subscribers").upsert(payload, { onConflict: "email" });
    }
  } catch (err) {
    console.log("[v0] subscribe persist skipped:", (err as Error).message);
  }

  return NextResponse.json({ ok: true, ref: refCode }, { status: 200 });
}
