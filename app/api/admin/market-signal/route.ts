/**
 * POST /api/admin/market-signal
 *
 * Inbound webhook from Make.com scenario 06 (Market Signal).
 * Receives yfinance + DeepSeek editorial + halal screening data.
 *
 * Writes to TWO tables:
 *   1. lantern_market_signals — upserted by ticker (Market Watch homepage section reads from here)
 *   2. lantern_content_queue  — for editorial review pipeline
 *
 * Payload:
 *   ticker            — e.g. "MSFT"
 *   company_name      — e.g. "Microsoft"
 *   asset_class       — "EQUITY" | "CRYPTO" (defaults to "EQUITY")
 *   market_data       — object: { current_price, change_pct, change_abs, volume, ... }
 *   editorial         — DeepSeek-written conviction note (ummah context, halal framing)
 *   halal_verdict     — "pass" | "review" | "fail"
 *   halal_score       — 0-100
 *   musaffa_status    — "COMPLIANT" | "NON_COMPLIANT" | "DOUBTFUL" | "NOT_COVERED"
 *   signal            — "watch" | "note" | "alert" (optional, defaults to "watch")
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
    asset_class?: string;
    market_data?: Record<string, unknown>;
    editorial?: string;
    halal_verdict?: "pass" | "review" | "fail";
    halal_score?: number;
    musaffa_status?: string;
    change_pct?: number;
    signal?: string;
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

  const verdict = halal_verdict ?? "pending_screen";
  const changePct = (market_data?.change_pct as number) ?? body.change_pct ?? 0;
  const changeAbs = market_data?.change_abs as number | undefined;
  const price = market_data?.current_price as number | undefined;
  const volume = market_data?.volume as string | undefined;
  const assetClass = body.asset_class ?? "EQUITY";
  const now = new Date().toISOString();

  // Map halal_verdict → halal_status display string
  const halalStatus =
    verdict === "pass"
      ? "COMPLIANT"
      : verdict === "review"
      ? "QUESTIONABLE"
      : verdict === "fail"
      ? "NON_COMPLIANT"
      : "UNKNOWN";

  // Map musaffa_status → halal_source label
  const halalSource = body.musaffa_status === "NOT_COVERED" ? "ZOYA" : "MUSAFFA";

  // ── 1. Upsert lantern_market_signals (the table Market Watch reads from) ──
  const { error: signalError } = await supabase
    .from("lantern_market_signals")
    .upsert(
      {
        ticker: ticker.toUpperCase(),
        name: company_name ?? ticker,
        asset_class: assetClass,
        price: price ?? null,
        change_pct: changePct,
        change_abs: changeAbs ?? null,
        volume: volume ?? null,
        halal_status: halalStatus,
        halal_source: halalSource,
        signal: body.signal ?? "watch",
        signal_note: editorial ?? null,
        source_url: `https://musaffa.com/stocks/${ticker.toUpperCase()}`,
        as_of: now,
      },
      { onConflict: "ticker" }
    );

  if (signalError) {
    console.error("[market-signal] Upsert to lantern_market_signals failed:", signalError);
    return NextResponse.json({ error: signalError.message }, { status: 500 });
  }

  // ── 2. Insert into lantern_content_queue (editorial pipeline — dedup by day) ──
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("lantern_content_queue")
    .select("id", { count: "exact", head: true })
    .eq("market_ticker", ticker)
    .eq("content_type", "market")
    .gte("queued_at", todayStart.toISOString());

  if (!count || count === 0) {
    const { error: queueError } = await supabase.from("lantern_content_queue").insert({
      title: `Halal Market Watch: ${company_name ?? ticker} (${ticker}) — ${changePct > 0 ? "+" : ""}${changePct.toFixed(2)}% today`,
      url: `https://musaffa.com/stocks/${ticker.toUpperCase()}`,
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

    if (queueError) {
      // Log but don't fail — market signal already written to primary table
      console.warn("[market-signal] Queue insert failed (non-fatal):", queueError);
    }
  }

  return NextResponse.json({ ok: true, upserted_signal: 1, ticker: ticker.toUpperCase() });
}
