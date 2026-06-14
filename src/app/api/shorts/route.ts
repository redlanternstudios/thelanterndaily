import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select('*')
    .eq('type', 'short')
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ shorts: [], error: error.message }, { status: 500 })
  }

  return NextResponse.json({ shorts: data, page, limit })
}
