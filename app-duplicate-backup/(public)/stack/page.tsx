import { createClient } from '@/lib/supabase/server'
import StackToolCard from '@/components/lantern/StackToolCard'

import type { StackToolCardProps } from '@/components/lantern/StackToolCard'

export const revalidate = 300

interface RawTool {
  id: string
  tool_name: string
  tool_url: string
  category: string
  tier: string
  is_open_source: boolean
  one_line_desc: string
  full_breakdown?: string
  avoid_reason?: string
  operator_context?: string
  has_affiliate: boolean
  affiliate_link?: string
  tier_placement?: string
  published: boolean
  created_at: string
}

function mapToolToProps(tool: RawTool): StackToolCardProps {
  return {
    toolName: tool.tool_name,
    toolUrl: tool.tool_url,
    category: tool.category,
    tier: (tool.tier as StackToolCardProps['tier']) || 'free',
    isOpenSource: tool.is_open_source,
    oneLineDesc: tool.one_line_desc,
    fullBreakdown: tool.full_breakdown,
    avoidReason: tool.avoid_reason,
    operatorContext: tool.operator_context,
    hasAffiliate: tool.has_affiliate,
    affiliateLink: tool.affiliate_link,
    tierPlacement: (tool.tier_placement as StackToolCardProps['tierPlacement']) || 'free_teaser',
  }
}

export default async function StackPage() {
  const supabase = await createClient()
  const { data: tools } = await supabase
    .from('lantern_stack_entries')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">The Stack</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">Tools curated for Muslim builders.</p>
      {(!tools || tools.length === 0) ? (
        <div className="text-center py-16"><p className="text-zinc-500">Stack coming this week.</p></div>
      ) : (
        <div className="grid gap-4">
          {tools.slice(0, 3).map((tool) => (<StackToolCard key={tool.id} {...mapToolToProps(tool)} />))}
          {tools.slice(3).map((tool) => (<StackToolCard key={tool.id} {...mapToolToProps(tool)} />))}
        </div>
      )}
    </div>
  )
}
