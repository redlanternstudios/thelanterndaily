import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('lantern_issues')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
  }

  return NextResponse.json({ issue: data })
}
