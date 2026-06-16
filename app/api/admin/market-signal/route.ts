/**
 * POST /api/admin/market-signal
 *
 * Inbound webhook from Make.com scenario 06 (Market Signal).
 * Receives yfinance + Musaffa data + Groq editorial, inserts into lantern_content_queue.
 *
 * Payload:
 *   ticker            — e.g. "MSFT"
 *   company_name      — e.g. "Microsoft"
 *   market_data       — object: { current_price, change_pct, market_cap, sector, ... }
 *   editorial         — Groq-written market commentary string (includes compliance preface)
 *   halal_verdict     — "pass" | "review" | "fail"
 *   halal_score       — 0-100
 *   musaffa_status    — "COMPLIANT" | "NON_COMPLIANT" | "DOUBTFUL" | "NOT_COVERED"
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/service";

const ADMIN_SECRET = process.env.ADMIN_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  if (ADMIN_SECRET) {
    const secret = req.headers.get("x-admin-secret");
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: {
    ticker?: string;
    company_name?: string;
    market_data?: Record<string, unknown>;
    editorial?: string;
    halal_verdict?: "pass" | "review" | "fail";
    halal_score?: number;
    musaffa_status?: string;
    change_pct?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { ticker, company_name, market_data, editorial, halal_verdict, halal_score } = body;

  if (!ticker) {
    return NextResponse.json({ error: "Missing ticker" }, { status: 400 });
  }

  const supabase = createClient();

  // Dedup: one market signal per ticker per calendar day
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("lantern_content_queue")
    .select("id", { count: "exact", head: true })
    .eq("market_ticker", ticker)
    .eq("content_type", "market")
    .gte("queued_at", todayStart.toISOString());

  if (count && count > 0) {
    return NextResponse.json({ ok: true, inserted: 0, skipped: 1, reason: "already_exists_today" });
  }

  const verdict = halal_verdict ?? "pending_screen";
  const changePct = (market_data?.change_pct as number) ?? body.change_pct ?? 0;

  const { error } = await supabase.from("lantern_content_queue").insert({
    title: `Halal Market Watch: ${company_name ?? ticker} (${ticker}) — ${changePct > 0 ? "+" : ""}${changePct}% this week`,
    url: `https://musaffa.com/stocks/${ticker}`,
    source: "Musaffa + yfinance",
    content_type: "market",
    status: verdict === "fail" ? "rejected" : "pending",
    editorial_commentary: editorial ?? null,
    market_ticker: ticker,
    market_data: market_data ?? null,
    halal_verdict: verdict,
    halal_score: halal_score ?? null,
    halal_flags: body.musaffa_status === "NON_COMPLIANT" ? ["Non-compliant per Musaffa"] : [],
    relevance_score: 8,
    reject_reason: verdict === "fail" ? `Non-compliant: ${body.musaffa_status}` : null,
  });

  if (error) {
    console.error("[market-signal] Insert failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inserted: 1 });
}
