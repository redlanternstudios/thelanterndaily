import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import UserSpotlightCard from '@/components/lantern/UserSpotlightCard'

export const revalidate = 300

export default async function BuildersPage() {
  const supabase = await createClient()
  const { data: spotlights } = await supabase
    .from('lantern_user_spotlights')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen py-16 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-3xl font-bold mb-2">Builders</h1><p className="text-zinc-600 dark:text-zinc-400">Muslim founders and builders shaping the future</p></div>
        <Link href="/builders/submit" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">Share Your Story →</Link>
      </div>
      {(!spotlights || spotlights.length === 0) ? (
        <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
          <p className="text-zinc-500 mb-4">Be the first builder featured</p>
          <Link href="/builders/submit" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Submit Your Spotlight</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {spotlights.map((spotlight) => (
            <UserSpotlightCard
              key={spotlight.id}
              displayName={spotlight.display_name || spotlight.name || 'Anonymous'}
              attributionType={spotlight.attribution_type || 'NAMED'}
              roleDescription={spotlight.role_description}
              location={spotlight.location}
              productsBuilding={spotlight.products_building || []}
              quote={spotlight.quote}
              slug={spotlight.slug || spotlight.id}
              spotlightTier={spotlight.spotlight_tier || 'free'}
              isFeaturedBuilder={spotlight.is_featured_builder || false}
            />
          ))}
        </div>
      )}
    </div>
  )
}