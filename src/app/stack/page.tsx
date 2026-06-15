import { StackToolCard } from "@/components/lantern/StackToolCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function StackPage() {
  // Check subscription status (simplified — expand with real check)
  const isSubscribed = false;
  // const supabase = createServerComponentClient({ cookies });
  // const { data: { session } } = await supabase.auth.getSession();
  // ... check session for active subscription

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">The Stack</h1>
        <p className="text-gray-400 mb-8">
          Tools we build with — vetted, in production, recommended.
        </p>

        {/* Free teaser section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[#2D7A4F]">Quick Stack</h2>
          <p className="text-sm text-gray-400 mb-6">
            Free every Thursday. Three tools, one-liner descriptions, external links.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <StackToolCard
              toolName="Claude (Anthropic)"
              toolUrl="https://anthropic.com/claude"
              category="ai"
              tier="paid"
              isOpenSource={false}
              oneLineDesc="AI assistant for code, writing, and analysis."
              tierPlacement="free_teaser"
              hasAffiliate={false}
            />
            <StackToolCard
              toolName="Supabase"
              toolUrl="https://supabase.com"
              category="backend"
              tier="freemium"
              isOpenSource={true}
              oneLineDesc="Open-source backend with Postgres, auth, and storage."
              tierPlacement="free_teaser"
              hasAffiliate={false}
            />
            <StackToolCard
              toolName="Next.js"
              toolUrl="https://nextjs.org"
              category="frontend"
              tier="free"
              isOpenSource={true}
              oneLineDesc="React framework for production web apps."
              tierPlacement="free_teaser"
              hasAffiliate={false}
            />
          </div>
        </section>

        {/* Paid full section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[#B8922A]">Full Stack</h2>
          {isSubscribed ? (
            <div className="grid gap-4 md:grid-cols-2">
              <StackToolCard
                toolName="Make.com"
                toolUrl="https://make.com"
                category="automation"
                tier="paid"
                isOpenSource={false}
                oneLineDesc="Visual automation platform."
                fullBreakdown="Used for content pipeline: RSS intake, Groq scoring, Telegram approval, Supabase insert. 5 scenarios in production."
                operatorContext="Runs daily 6am curation + Stripe webhook handling."
                tierPlacement="paid_full"
                hasAffiliate={false}
                isSubscribed={true}
              />
              {/* More tools rendered when subscribed */}
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-[#0D0F14] border border-[#2A2D35] text-center">
              <p className="text-gray-300 mb-4">
                Full breakdown of 12 tools with cost comparison, operator context, and &quot;avoid&quot; notes.
              </p>
              <p className="text-lg font-semibold text-[#B8922A] mb-2">$15/mo or $120/yr</p>
              <a
                href="/subscribe"
                className="inline-block px-6 py-2 rounded bg-[#2D7A4F] text-white hover:bg-green-700 transition-colors"
              >
                Subscribe for Full Access
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
