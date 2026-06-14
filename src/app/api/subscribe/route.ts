<<<<<<< HEAD
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
=======
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Forward subscription to n8n webhook — business logic lives there
    const n8nWebhookUrl = process.env.N8N_SUBSCRIBE_WEBHOOK_URL
    if (n8nWebhookUrl) {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'thelanterndaily' }),
      })
      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    }

    // Fallback if n8n is not configured
    return NextResponse.json({
      message: 'Subscription received',
      email,
      note: 'n8n not configured — subscription queued',
    })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
>>>>>>> origin/main
}
