import { getSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("lantern_issues")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}
