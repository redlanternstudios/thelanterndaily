import { NextRequest, NextResponse } from "next/server";
import { subscribeEmail } from "@/lib/beehiiv";

export async function POST(req: NextRequest) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let email: string;
  try {
    const body = await req.json();
    email = body.email?.trim()?.toLowerCase();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  // ── Validate email ──────────────────────────────────────────────────────────
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "Valid email required" },
      { status: 400 }
    );
  }

  // ── Subscribe ───────────────────────────────────────────────────────────────
  const result = await subscribeEmail({
    email,
    utm_source: req.headers.get("referer") ?? "the-lantern-site",
    utm_medium: "organic",
  });

  if (!result.success) {
    // Already subscribed is not a failure state for the user
    if (result.alreadySubscribed) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, subscription: result.subscription });
}
