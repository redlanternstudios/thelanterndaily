import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const supabase = getSupabase()

    // Parse market data for price and change calculation
    const currentPrice = parseFloat(String(body.market_data?.current_price ?? 0))
    const prevClose = parseFloat(String(body.market_data?.previous_close ?? 0))
    const changePct = prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : null

    // Map halal verdict to halal_status
    const halalStatus =
      body.halal_verdict === 'pass' ? 'compliant' :
      body.halal_verdict === 'review' ? 'questionable' :
      body.halal_verdict === 'fail' ? 'non-compliant' : null

    // Determine signal based on change percentage
    const signal = changePct != null ? (changePct >= 0 ? 'watch' : 'neutral') : null

    // Upsert into lantern_market_signals (deduped on ticker)
    const { error: signalError } = await supabase
      .from('lantern_market_signals')
      .upsert({
        ticker: body.ticker,
        name: body.company_name ?? null,
        asset_class: (body as any).asset_class ?? 'equity',
        price: currentPrice || null,
        change_pct: changePct,
        halal_status: halalStatus,
        halal_source: 'musaffa',
        signal: signal,
        signal_note: body.editorial ?? null,
        source_url: `https://musaffa.com/stocks/${body.ticker}`,
        as_of: new Date().toISOString(),
      }, { onConflict: 'ticker' })

    if (signalError) {
      console.error('[market-signal] Upsert error:', signalError)
      return NextResponse.json({ error: signalError.message }, { status: 500 })
    }

    // Insert into lantern_content_queue (existing flow)
    const { error: queueError } = await supabase
      .from('lantern_content_queue')
      .insert({
        source_id: body.ticker,
        source: 'musaffa',
        company_name: body.company_name,
        content_type: 'market_signal',
        data: body,
        status: 'pending_review',
      })

    if (queueError) {
      console.error('[market-signal] Queue error:', queueError)
      return NextResponse.json({ error: queueError.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      ticker: body.ticker,
      signalCreated: true,
      queuedForReview: true,
    })
  } catch (err) {
    console.error('[market-signal] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
