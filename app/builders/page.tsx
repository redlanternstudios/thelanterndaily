import { LanternMasthead } from '@/components/LanternMasthead';
import { Footer } from '@/components/ui/Footer';
import { UserSpotlightCard } from '@/components/ui/UserSpotlightCard';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

export const metadata = {
  title: 'Builder Spotlights — The Lantern Daily',
  description: 'Muslim founders and builders shaping the future of halal tech. Real stacks. Real stories.',
};

async function getSpotlights() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('lantern_user_spotlights')
      .select('*')
      .eq('status', 'published')
      .order('user_number', { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

export default async function BuildersPage() {
  const spotlights = await getSpotlights();

  return (
    <>
      <LanternMasthead />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'end', marginBottom: '48px' }}>
          <div>
            <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '12px' }}>
              LIVE BUILDER SPOTLIGHTS
            </div>
            <h1 style={{
              color: '#F7F2EE',
              fontSize: '36px',
              fontWeight: 900,
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              margin: '0 0 12px',
            }}>
              The operators building halal tech.
            </h1>
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Real builders. Real stacks. Community-vetted. Free spotlight with affiliate referral revenue.
            </p>
          </div>
          <a
            href="#submit"
            style={{
              background: '#D92532',
              color: '#F7F2EE',
              padding: '12px 24px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            SUBMIT YOUR SPOTLIGHT →
          </a>
        </div>

        {/* Grid */}
        {spotlights.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2px',
            marginBottom: '80px',
          }}>
            {spotlights.map((s: {
              id: string;
              user_number: number;
              display_name: string;
              attribution_type: 'NAMED' | 'ROLE_BASED';
              role_description: string;
              products_building: string[];
              quote: string;
              spotlight_slug: string;
              affiliate_code: string;
              spotlight_tier: 'free' | 'paid';
              homepage_featured: boolean;
            }) => (
              <UserSpotlightCard
                key={s.id}
                userNumber={s.user_number}
                displayName={s.display_name}
                attributionType={s.attribution_type}
                roleDescription={s.role_description}
                productsBuilding={s.products_building || []}
                quote={s.quote}
                spotlightSlug={s.spotlight_slug}
                affiliateCode={s.affiliate_code}
                spotlightTier={s.spotlight_tier}
                homepageFeatured={s.homepage_featured}
              />
            ))}
          </div>
        ) : (
          /* Empty state — first spotlight being recruited */
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            border: '1px solid #1A1D24',
            marginBottom: '80px',
          }}>
            <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '16px' }}>
              FOUNDING SPOTLIGHTS OPENING SOON
            </div>
            <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 24px' }}>
              We're hand-selecting the first cohort of builders to feature. Submit your stack — if selected, you receive a permanent spotlight page and a 30% referral commission on every subscriber you bring in.
            </p>
            <a href="#submit" style={{
              color: '#D92532',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderBottom: '1px solid #D92532',
              paddingBottom: '2px',
            }}>
              BE A FOUNDING BUILDER →
            </a>
          </div>
        )}

        {/* Submit section */}
        <div id="submit" style={{
          background: '#0D0F14',
          border: '1px solid #2A2D35',
          padding: '48px',
          marginBottom: '40px',
        }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '16px' }}>
              APPLY FOR A SPOTLIGHT
            </div>
            <h2 style={{ color: '#F7F2EE', fontSize: '28px', fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              Your stack deserves an audience.
            </h2>
            <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px' }}>
              Free forever. A permanent page at <span style={{ color: '#F7F2EE' }}>/builders/[your-slug]</span>, your own affiliate link (30% Year-1 commission per subscriber), and listing in the archive.
            </p>
            <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.6', margin: '0 0 28px' }}>
              Paid upgrade ($49 one-time) available after acceptance: Thursday newsletter feature, social post, 7-day homepage rotation, and an embeddable badge.
            </p>
            <a
              href="https://tally.so/r/lantern-spotlight"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#D92532',
                color: '#F7F2EE',
                padding: '14px 32px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              SUBMIT YOUR SPOTLIGHT →
            </a>
            <p style={{ color: '#3D4048', fontSize: '11px', margin: '16px 0 0', letterSpacing: '0.04em' }}>
              PAID UPGRADE OFFERED ONLY AFTER EDITORIAL ACCEPTANCE. NEVER BEFORE.
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
