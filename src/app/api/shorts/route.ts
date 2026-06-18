import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = 10
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select('*')
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [])
}
