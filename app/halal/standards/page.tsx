import { LanternMasthead } from '@/components/LanternMasthead';
import { Footer } from '@/components/ui/Footer';
import { HalalBadge } from '@/components/HalalBadge';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halal Standards — The Lantern Daily',
  description: 'Every piece of content passes a 6-gate halal trust pipeline. Our standards and methodology.',
};

export default function HalalStandardsPage() {
  return (
    <>
      <LanternMasthead />
      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '64px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '16px' }}>
            TRUST ARCHITECTURE
          </div>
          <h1 style={{ color: '#F7F2EE', fontSize: '40px', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px' }}>
            Halal Standards & Trust Pipeline
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            The Lantern Daily is built for the Ummah. Every piece of content — whether written by our editorial team, sourced from the community, or surfaced from the signal pipeline — passes through a six-gate trust architecture before it reaches you.
          </p>
        </div>

        {/* Pipeline graphic */}
        <div style={{ marginBottom: '56px' }}>
          {[
            { gate: 1, name: 'Source Whitelist', desc: 'Only pre-approved sources enter the content queue. New sources must be reviewed and added by editorial. All aggregators, publications, and RSS feeds are vetted before inclusion.', status: 'Always active' },
            { gate: 2, name: 'AI Relevance & Halal Scoring', desc: 'Groq (llama-4-scout) scores every inbound signal for relevance (0-10) and halal stance (ALLOWED / BLOCKED / REQUIRES_REVIEW). Signals scoring below 7 relevance or marked BLOCKED are discarded immediately.', status: 'Always active' },
            { gate: 3, name: 'Editorial Approval', desc: 'Every piece of content is reviewed by a human editor before publication. Editorial team reviews AI-approved content, verifies sourcing, and makes the final call.', status: 'Always active' },
            { gate: 4, name: 'Islamic Claim Screen', desc: 'Content that touches aqeedah (creed), fiqh (jurisprudence), or any Islamic claim is flagged for mandatory scholar review. Nothing with Islamic claims publishes without a qualified reviewer.', status: 'Triggered on claim detection' },
            { gate: 5, name: 'Financial Product Screen', desc: 'Any content mentioning financial products, investments, or halal finance instruments is screened against DJIM-equivalent criteria. Riba-adjacent content is blocked. All financial content is reviewed before publication.', status: 'Triggered on financial content' },
            { gate: 6, name: 'Community Correction Loop', desc: 'Readers can flag content post-publication via the community feedback system. Flagged content triggers immediate re-review. Retractions are published transparently with full explanation.', status: 'Always active' },
          ].map(({ gate, name, desc, status }) => (
            <div
              key={gate}
              style={{
                display: 'flex',
                gap: '20px',
                padding: '20px 24px',
                marginBottom: '2px',
                background: '#0D0F14',
                border: '1px solid #1A1D24',
                borderLeft: '3px solid #D92532',
              }}
            >
              <div style={{ minWidth: '32px' }}>
                <div style={{ color: '#D92532', fontFamily: '"Space Mono", monospace', fontSize: '14px', fontWeight: 700 }}>
                  {String(gate).padStart(2, '0')}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <h3 style={{ color: '#F7F2EE', fontSize: '16px', fontWeight: 700, margin: 0 }}>{name}</h3>
                  <span style={{ fontSize: '10px', color: '#6B7280', fontFamily: '"Space Mono", monospace', letterSpacing: '0.06em' }}>
                    {status}
                  </span>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Halal Badge Types */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: '#F7F2EE', fontSize: '20px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em' }}>
            Trust Badges
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
            Every published piece carries one of four trust badges. Here's what each means:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            {[
              { type: 'halal_verified' as const, title: 'Halal Verified', icon: '✓', color: '#2D7A4F', desc: 'Passed all 6 gates. No Islamic claims or financial products. Standard editorial content with full trust pipeline verification.' },
              { type: 'scholar_reviewed' as const, title: 'Scholar Reviewed', icon: '📚', color: '#B8922A', desc: 'Contains Islamic claims — aqeedah, fiqh, or Quranic/sunnah references. Reviewed and verified by a qualified scholar before publication.' },
              { type: 'halal_finance_screened' as const, title: 'Halal Finance Screened', icon: '🏦', color: '#B8922A', desc: 'References financial products or investments. Screened against DJIM-equivalent criteria. No riba-adjacent content.' },
              { type: 'editorial_only' as const, title: 'Editorial Only', icon: 'ℹ️', color: '#4E556E', desc: 'Non-Islamic, non-financial editorial content. Technically passes all gates but no special screening triggered. Standard publication.' },
            ].map((b) => (
              <div key={b.type} style={{ padding: '24px', background: '#0D0F14', border: '1px solid #1A1D24' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: b.color }}>{b.icon}</span>
                  <h3 style={{ color: '#F7F2EE', fontSize: '14px', fontWeight: 700, margin: 0 }}>{b.title}</h3>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Badge visual examples */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: '#F7F2EE', fontSize: '20px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>
            Badge Examples
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <HalalBadge type="halal_verified" size="lg" />
            <HalalBadge type="scholar_reviewed" size="lg" />
            <HalalBadge type="halal_finance_screened" size="lg" />
            <HalalBadge type="editorial_only" size="lg" />
          </div>
        </section>

        {/* Commitment */}
        <section style={{ padding: '32px', background: '#0D0F14', border: '1px solid #2A2D35', borderLeft: '3px solid #2D7A4F' }}>
          <h2 style={{ color: '#F7F2EE', fontSize: '18px', fontWeight: 700, margin: '0 0 12px' }}>
            Our Commitment
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
            The Lantern Daily serves the global Muslim tech community. Our trust architecture is not a marketing badge — it is our editorial backbone. Every content decision flows through these gates. If we make a mistake, we correct it transparently through the community correction loop.
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7, marginTop: '16px' }}>
            We welcome feedback. If you see content that concerns you, please flag it. This publication belongs to the Ummah.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}