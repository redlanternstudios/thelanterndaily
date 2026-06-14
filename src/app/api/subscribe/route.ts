import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  // Persist to Supabase when configured; otherwise accept gracefully.
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("subscribers").upsert({ email }, { onConflict: "email" });
    }
  } catch (err) {
    console.log("[v0] subscribe persist skipped:", (err as Error).message);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
