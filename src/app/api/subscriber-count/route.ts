import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabase()
  const { count, error } = await supabase
    .from('lantern_subscribers')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching subscriber count:', error)
    return NextResponse.json({ count: 0 })
  }

  return NextResponse.json({ count: count ?? 0 })
}
