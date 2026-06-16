import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SubscribeForm } from './SubscribeForm'

export const revalidate = 300

export default async function HomePage() {
  let subscriberCount = 0
  try {
    const supabase = await createClient()
    const { count } = await supabase
      .from('lantern_subscribers')
      .select('*', { count: 'exact', head: true })
    subscriberCount = count || 0
  } catch {}

  return (
    <div className="min-h-screen">
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium mb-6">SIGNAL BEFORE CONSENSUS</div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          The Daily Stack for <span className="text-blue-600 dark:text-blue-400">Muslim Builders</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          Muslim-built. AI-native. Every morning: tools, stacks, and builder stories.
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <p className="text-sm text-zinc-500">
            Join <span className="font-semibold text-zinc-800 dark:text-zinc-200">{subscriberCount}</span> Muslim founders and builders
          </p>
        </div>
        <SubscribeForm />
      </section>

      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Why The Lantern</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <h3 className="font-semibold mb-2">📡 Signal Before Consensus</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">We find the tools before they trend.</p>
          </div>
          <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <h3 className="font-semibold mb-2">🕌 Halal-Curated</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Every tool screened. No haram revenue streams.</p>
          </div>
          <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <h3 className="font-semibold mb-2">🤝 Builder-First</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Spotlighting the Muslims building the future.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">This Week's Stack</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">8-12 tools every week. Free subscribers see highlights.</p>
          <Link href="/stack" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">View the Stack →</Link>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
          <span>📧 Beehiiv-powered</span>
          <span>🔒 RLS-encrypted</span>
          <span>✅ Halal-curated</span>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/stack" className="hover:underline">Stack</Link>
            <Link href="/builders" className="hover:underline">Builders</Link>
            <Link href="/archive" className="hover:underline">Archive</Link>
          </div>
          <p>© 2026 The Lantern Daily</p>
        </div>
      </footer>
    </div>
  )
}
