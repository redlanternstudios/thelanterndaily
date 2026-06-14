import { supabase } from './supabase'
import type { Issue, Short } from './types'

export async function getSubscriberCount(): Promise<number> {
  const { count, error } = await supabase
    .from('lantern_subscribers')
    .select('*', { count: 'exact', head: true })
  if (error) {
    console.error('Error fetching subscriber count:', error)
    return 247
  }
  return count ?? 247
}

export async function getRecentIssues(limit = 3): Promise<Issue[]> {
  const { data, error } = await supabase
    .from('lantern_issues')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('Error fetching recent issues:', error)
    return []
  }
  return data as Issue[]
}

export async function getRecentShorts(limit = 3): Promise<Short[]> {
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select('*')
    .eq('type', 'short')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('Error fetching recent shorts:', error)
    return []
  }
  return data as Short[]
}

export async function getIssueBySlug(slug: string): Promise<Issue | null> {
  const { data, error } = await supabase
    .from('lantern_issues')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) {
    console.error('Error fetching issue:', error)
    return null
  }
  return data as Issue
}

export async function getIssues(tier?: string, page = 1, perPage = 12): Promise<{ issues: Issue[]; total: number }> {
  let query = supabase
    .from('lantern_issues')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
  if (tier && tier !== 'all') query = query.eq('tier', tier)
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  const { data, count, error } = await query.range(from, to)
  if (error) {
    console.error('Error fetching issues:', error)
    return { issues: [], total: 0 }
  }
  return { issues: data as Issue[], total: count ?? 0 }
}

export async function getShorts(page = 1, perPage = 10): Promise<Short[]> {
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select('*')
    .eq('type', 'short')
    .order('published_at', { ascending: false })
    .range(from, to)
  if (error) {
    console.error('Error fetching shorts:', error)
    return []
  }
  return data as Short[]
}
