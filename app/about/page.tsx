import { LanternMasthead } from '@/components/LanternMasthead';
import { Footer } from '@/components/ui/Footer';

export const metadata = {
  title: 'About — The Lantern Daily',
  description: 'Muslim-built. AI-native. Signal before consensus.',
};

export default function AboutPage() {
  return (
    <>
      <LanternMasthead />
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '16px' }}>
            ABOUT THE LANTERN DAILY
          </div>
          <h1 style={{
            color: '#F7F2EE',
            fontSize: '40px',
            fontWeight: 900,
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            Signal before consensus.
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
            The daily brief for Muslim founders and builders shaping the future of halal tech.
          </p>
        </div>

        {/* Mission */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: '#F7F2EE', fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
            What this is
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: '1.8', margin: '0 0 16px' }}>
            The Lantern Daily covers AI tools, Islamic finance and tech, halal software, and the builders behind them. It exists because mainstream tech media wasn't built for us.
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
            Every piece of content passes a 6-gate trust pipeline before it reaches you. No haram-adjacent content. No riba-linked financial products. No YouTube embeds (pre-roll ad risk). No ads that aren't disclosed.
          </p>
        </section>

        {/* Trust gates */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: '#F7F2EE', fontSize: '20px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>
            The 6-gate trust pipeline
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { n: '01', label: 'Source Whitelist', desc: 'Only approved sources enter the content queue.' },
              { n: '02', label: 'AI Relevance + Halal Scoring', desc: 'Groq scores each piece for relevance and halal stance. BLOCKED content is discarded immediately.' },
              { n: '03', label: 'Editorial Approval', desc: 'Human review before anything publishes. Editorial team reviews all AI-approved content.' },
              { n: '04', label: 'Islamic Claim Screen', desc: 'Content touching aqeedah or fiqh is flagged for scholar review before publication.' },
              { n: '05', label: 'Financial Product Screen', desc: 'Any financial product is screened against DJIM-equivalent criteria. Riba-adjacent = blocked.' },
              { n: '06', label: 'Community Correction Loop', desc: 'Readers can flag content post-publication. Flagged content is re-reviewed and retracted if needed.' },
            ].map(({ n, label, desc }) => (
              <div key={n} style={{ display: 'flex', gap: '20px', padding: '16px', background: '#0D0F14', border: '1px solid #1A1D24' }}>
                <div style={{ color: '#D92532', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, minWidth: '28px' }}>{n}</div>
                <div>
                  <div style={{ color: '#F7F2EE', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.5' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ummah first */}
        <section style={{ marginBottom: '48px', padding: '28px', background: '#0D0F14', border: '1px solid #2A2D35', borderLeft: '3px solid #D92532' }}>
          <h2 style={{ color: '#F7F2EE', fontSize: '18px', fontWeight: 700, margin: '0 0 12px' }}>
            Ummah-first, always
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
            No single founder or editor is the face of this publication. The Lantern Daily belongs to the community it serves. Builder spotlights feature community members, not editors. The editorial voice is collective. The mission is shared.
          </p>
        </section>

        {/* Join */}
        <section style={{ textAlign: 'center', padding: '40px 0' }}>
          <a
            href="/"
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
            JOIN THE LANTERN DAILY — FREE
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
