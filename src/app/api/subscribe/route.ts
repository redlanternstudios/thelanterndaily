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
}
