import { UserSpotlightCard } from "@/components/lantern/UserSpotlightCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Temporary seed data — replace with Supabase query when DB is live
const seedSpotlights = [
  {
    displayName: "Community Builder",
    attributionType: "ROLE_BASED" as const,
    roleDescription: "Building halal fintech tools for the Ummah",
    productsBuilding: ["HalalPay", "ZakatTracker"],
    quote: "The Muslim tech community has more talent than people realize.",
    slug: "community-builder-1",
    spotlightTier: "free" as const,
  },
];

export default async function BuildersPage() {
  /* Uncomment when DB is configured
  const supabase = createServerComponentClient({ cookies });
  const { data: spotlights } = await supabase
    .from("lantern_user_spotlights")
    .select("*")
    .eq("status", "published")
    .order("spotlight_published_date", { ascending: false });
  */

  const spotlights = seedSpotlights;

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Builders</h1>
        <p className="text-gray-400 mb-4">
          The community building Muslim tech. No staff featured — this is the Ummah&apos;s space.
        </p>

        {/* Submission CTA — always visible */}
        <div className="p-4 rounded-lg bg-[#0D0F14] border border-[#2A2D35] mb-8">
          <p className="text-sm text-gray-300 mb-3">
            Are you building something for the Ummah? Get your own spotlight — free, forever.
          </p>
          <a
            href="#submit" /* Replace with Tally / custom form URL */
            className="inline-block px-4 py-2 rounded bg-[#2D7A4F] text-white text-sm hover:bg-green-700 transition-colors"
          >
            Submit Your Spotlight
          </a>
        </div>

        {/* Spotlight grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {spotlights.map((s) => (
            <UserSpotlightCard
              key={s.slug}
              displayName={s.displayName}
              attributionType={s.attributionType}
              roleDescription={s.roleDescription}
              productsBuilding={s.productsBuilding}
              quote={s.quote}
              slug={s.slug}
              spotlightTier={s.spotlightTier}
            />
          ))}
        </div>

        {spotlights.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No spotlights yet. Be the first.</p>
          </div>
        )}
      </div>
    </div>
  );
}
