import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/check-tier
 *
 * Returns the tier for the current user.
 * Authentication priority:
 *   1. Supabase Auth session cookie (via @/lib/supabase/server)
 *   2. ?email= query parameter fallback
 *
 * Response: { tier: "free" | "paid", operator_number?: number | null }
 */
export async function GET(req: NextRequest) {
  const supabase = await createClient();

  // Strategy 1: try Supabase Auth session
  const { data: { user } } = await supabase.auth.getUser();

  let email: string | null = null;

  if (user?.email) {
    email = user.email;
  } else {
    // Strategy 2: fallback to email query param
    email = req.nextUrl.searchParams.get("email");
  }

  if (!email) {
    return NextResponse.json({ tier: "free" });
  }

  const { data, error } = await supabase
    .from("lantern_subscribers")
    .select("tier, operator_number")
    .eq("email", email)
    .single();

  if (error || !data) {
    return NextResponse.json({ tier: "free", operator_number: null });
  }

  return NextResponse.json({
    tier: data.tier ?? "free",
    operator_number: data.operator_number ?? null,
  });
}
