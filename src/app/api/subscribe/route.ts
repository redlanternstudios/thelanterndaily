import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("lantern_subscribers")
      .select("operator_number")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        operator_number: existing.operator_number,
        existing: true,
      });
    }

    const { count } = await supabase
      .from("lantern_subscribers")
      .select("*", { count: "exact", head: true });

    const operatorNumber = (count ?? 0) + 1;

    const { error } = await supabase.from("lantern_subscribers").insert({
      email,
      operator_number: operatorNumber,
      tier: "free",
      subscribed_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Subscribe insert error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ operator_number: operatorNumber });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
