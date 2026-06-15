import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if subscriber already exists
    const { data: existing } = await supabase
      .from('lantern_subscribers')
      .select('operator_number')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json({
        operator_number: existing.operator_number,
        message: 'Already subscribed'
      })
    }

    // Get next operator number using sequence
    const { data: seqData } = await supabase.rpc('next_operator_number')
    const operator_number = seqData || Math.floor(Math.random() * 9000) + 1000

    const { error } = await supabase
      .from('lantern_subscribers')
      .insert({
        email: email.toLowerCase(),
        operator_number,
        tier: 'free'
      })

    if (error) {
      console.error('Subscribe error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({
      operator_number,
      message: 'Subscribed successfully'
    })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
