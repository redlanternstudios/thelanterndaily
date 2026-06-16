import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateOperatorNumber(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

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

  // Persist to Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      const payload: Record<string, unknown> = {
        email,
        tier: "free",
        operator_number: generateOperatorNumber(),
      };
      if (refCode) {
        payload.ref_code = refCode;
      }

      await supabase.from("lantern_subscribers").upsert(payload, { onConflict: "email" });
    }
  } catch (err) {
    console.log("[subscribe] persist skipped:", (err as Error).message);
  }

  return NextResponse.json({ ok: true, ref: refCode }, { status: 200 });
}
