import { getSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const { error } = await supabase.from("lantern_subscribers").insert({
      email,
      status: "active",
      source: "homepage",
      subscribed_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You're already subscribed. Welcome back." },
          { status: 200 }
        );
      }
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "You're in. Check your inbox for the welcome email." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
