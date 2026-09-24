import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

function checkAuth(request: NextRequest): boolean {
  const expected = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_SECRET
  if (!expected) return false
  const headerKey = request.headers.get('x-admin-key') || request.headers.get('x-admin-secret')
  const queryKey = request.nextUrl.searchParams.get('key') || request.nextUrl.searchParams.get('secret')
  return headerKey === expected || queryKey === expected
}

async function approveSpotlight(id: string, editor: string) {
  const supabase = getSupabase()
  const now = new Date().toISOString()
  return await supabase
    .from('lantern_spotlights')
    .update({ 
      status: 'published', 
      reviewed_at: now,
      metadata: { reviewed_by: editor, approved_at: now }
    })
    .eq('id', id)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return new NextResponse('<html><body style="background:#09090b;color:#f87171;font-family:sans-serif;padding:40px;text-align:center;"><h2>⛔ 401 Unauthorized</h2><p>Invalid editorial access key.</p></body></html>', {
      status: 401,
      headers: { 'Content-Type': 'text/html' }
    })
  }

  const { id } = await params
  const editor = request.nextUrl.searchParams.get('editor') || 'Editorial Desk'
  const { error } = await approveSpotlight(id, editor)

  if (error) {
    return new NextResponse(`<html><body style="background:#09090b;color:#f87171;font-family:sans-serif;padding:40px;text-align:center;"><h2>⚠️ Approval Failed</h2><p>${error.message}</p></body></html>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    })
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Spotlight Approved — The Lantern Daily</title>
        <style>
          body { background: #07090E; color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
          .card { background: #0E121B; border: 1px solid #1E293B; border-radius: 16px; padding: 32px 24px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
          .badge { display: inline-block; background: rgba(34, 197, 94, 0.15); color: #4ADE80; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; margin-bottom: 20px; border: 1px solid rgba(34, 197, 94, 0.3); }
          h1 { font-size: 22px; font-weight: 700; margin: 0 0 10px 0; color: #FFFFFF; }
          p { font-size: 14px; color: #94A3B8; line-height: 1.6; margin: 0 0 24px 0; }
          .meta { background: #131826; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #CBD5E1; text-align: left; margin-bottom: 24px; }
          .btn { display: block; background: #C9A227; color: #000000; font-weight: 700; font-size: 14px; padding: 12px 20px; border-radius: 8px; text-decoration: none; text-align: center; transition: opacity 0.2s; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">EDITORIAL LOCK ENGAGED</div>
          <h1>✅ Spotlight Approved</h1>
          <p>Candidate verified and queued for the 06:00 AM Daily Lantern broadcast.</p>
          <div class="meta">
            <div><strong>Item ID:</strong> ${id}</div>
            <div><strong>Reviewed By:</strong> ${editor}</div>
            <div><strong>Status:</strong> published</div>
          </div>
          <a href="https://thelanterndaily.com/dashboard" class="btn">Open Intelligence Dashboard</a>
        </div>
      </body>
    </html>
  `, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  let editor = 'Editorial Desk'
  try {
    const body = await request.json()
    if (body.editor) editor = body.editor
  } catch {}

  const { error } = await approveSpotlight(id, editor)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, status: 'published', editor })
}
