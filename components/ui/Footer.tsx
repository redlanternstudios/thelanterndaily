export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#07080D',
      borderTop: '1px solid #1A1D24',
      marginTop: '80px',
    }}>
      {/* Main footer row */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 24px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
      }}>
        {/* Brand */}
        <div>
          <div style={{ color: '#D92532', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>
            THE LANTERN DAILY
          </div>
          <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Muslim-built. AI-native. Signal before consensus.
          </p>
          <p style={{ color: '#3D4048', fontSize: '11px', margin: 0, letterSpacing: '0.04em' }}>
            BY RED, LLC · EST. 2025
          </p>
        </div>

        {/* Sections */}
        <div>
          <div style={{ color: '#F7F2EE', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '16px' }}>
            PUBLICATION
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/archive', label: 'Archive' },
              { href: '/stack', label: 'Weekly Stack' },
              { href: '/builders', label: 'Builder Spotlights' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ color: '#6B7280', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.02em' }}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Community */}
        <div>
          <div style={{ color: '#F7F2EE', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '16px' }}>
            COMMUNITY
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/builders', label: 'Submit Your Spotlight' },
              { href: '/about', label: 'About' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ color: '#6B7280', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.02em' }}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div>
          <div style={{ color: '#F7F2EE', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '16px' }}>
            LEGAL
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Use' },
              { href: 'mailto:hello@thelanterndaily.com', label: 'Contact' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ color: '#6B7280', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.02em' }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid #1A1D24',
        padding: '16px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{ color: '#3D4048', fontSize: '11px', margin: 0, letterSpacing: '0.04em' }}>
          © {currentYear} BY RED, LLC. ALL RIGHTS RESERVED.
        </p>
        <p style={{ color: '#3D4048', fontSize: '11px', margin: 0, letterSpacing: '0.04em' }}>
          AFFILIATE DISCLOSURE: SOME LINKS EARN A COMMISSION. ALL CONTENT IS EDITORIALLY INDEPENDENT.
        </p>
      </div>
    </footer>
  );
}
