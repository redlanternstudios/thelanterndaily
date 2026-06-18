import { notFound } from 'next/navigation';
import { LanternMasthead } from '@/components/LanternMasthead';
import { Footer } from '@/components/ui/Footer';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getSpotlight(slug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('lantern_user_spotlights')
      .select('*')
      .eq('spotlight_slug', slug)
      .eq('status', 'published')
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function BuilderSpotlightPage({ params }: Props) {
  const { slug } = await params;
  const spotlight = await getSpotlight(slug);

  if (!spotlight) notFound();

  const displayLabel = spotlight.attribution_type === 'NAMED'
    ? spotlight.display_name
    : spotlight.role_description;

  return (
    <>
      <LanternMasthead />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{
              color: '#D92532',
              fontFamily: 'monospace',
              fontSize: '48px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              #{String(spotlight.user_number).padStart(3, '0')}
            </div>
            {spotlight.spotlight_tier === 'paid' && (
              <span style={{
                background: '#B8922A',
                color: '#0A0B0F',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '4px 10px',
                alignSelf: 'flex-start',
                marginTop: '8px',
              }}>
                FEATURED BUILDER
              </span>
            )}
          </div>

          <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '10px' }}>
            BUILDER SPOTLIGHT
          </div>
          <h1 style={{
            color: '#F7F2EE',
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            {displayLabel}
          </h1>

          {spotlight.location && (
            <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 16px', letterSpacing: '0.04em' }}>
              {spotlight.location}
            </p>
          )}

          {/* Products building */}
          {spotlight.products_building?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              {spotlight.products_building.map((p: string) => (
                <span key={p} style={{
                  background: '#1A1D24',
                  color: '#9CA3AF',
                  fontSize: '12px',
                  padding: '4px 10px',
                  letterSpacing: '0.04em',
                }}>
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quote */}
        {spotlight.quote && (
          <blockquote style={{
            color: '#C4BBAF',
            fontSize: '18px',
            fontStyle: 'italic',
            lineHeight: '1.6',
            margin: '0 0 48px',
            padding: '24px 28px',
            background: '#0D0F14',
            borderLeft: '3px solid #D92532',
          }}>
            "{spotlight.quote}"
          </blockquote>
        )}

        {/* Stack */}
        {spotlight.stack_summary && Array.isArray(spotlight.stack_summary) && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ color: '#F7F2EE', fontSize: '18px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>
              Their stack
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {spotlight.stack_summary.map((item: { tool: string; purpose: string; tier: string }) => (
                <div key={item.tool} style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr auto',
                  gap: '16px',
                  padding: '14px 16px',
                  background: '#0D0F14',
                  alignItems: 'center',
                }}>
                  <span style={{ color: '#F7F2EE', fontSize: '13px', fontWeight: 700 }}>{item.tool}</span>
                  <span style={{ color: '#6B7280', fontSize: '13px' }}>{item.purpose}</span>
                  <span style={{ color: '#3D4048', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.tier}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Affiliate CTA */}
        <div style={{
          background: '#0D0F14',
          border: '1px solid #2A2D35',
          padding: '32px',
          marginBottom: '48px',
        }}>
          <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '12px' }}>
            JOIN VIA {displayLabel.toUpperCase()}'S LINK
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }}>
            Subscribe using this link and {spotlight.attribution_type === 'NAMED' ? displayLabel : 'this builder'} earns a 30% commission on your first year. Halal referral — no hidden markup, same price for you.
          </p>
          <a
            href={`/?ref=${spotlight.affiliate_code}`}
            style={{
              background: '#D92532',
              color: '#F7F2EE',
              padding: '12px 28px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            JOIN THE LANTERN DAILY →
          </a>
          <p style={{ color: '#3D4048', fontSize: '11px', margin: '12px 0 0', letterSpacing: '0.04em' }}>
            REFERRAL — BUILDER EARNS COMMISSION · FREE FOR YOU TO JOIN
          </p>
        </div>

        {/* Back */}
        <a href="/builders" style={{ color: '#6B7280', fontSize: '12px', letterSpacing: '0.06em', textDecoration: 'none' }}>
          ← ALL BUILDERS
        </a>

      </main>
      <Footer />
    </>
  );
}
