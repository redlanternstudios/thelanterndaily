interface UserSpotlightCardProps {
  userNumber: number;
  displayName: string;
  attributionType: 'NAMED' | 'ROLE_BASED';
  roleDescription: string;
  productsBuilding: string[];
  quote: string;
  spotlightSlug: string;
  affiliateCode: string;
  spotlightTier: 'free' | 'paid';
  homepageFeatured?: boolean;
}

export function UserSpotlightCard({
  userNumber,
  displayName,
  attributionType,
  roleDescription,
  productsBuilding,
  quote,
  spotlightSlug,
  affiliateCode,
  spotlightTier,
  homepageFeatured = false,
}: UserSpotlightCardProps) {
  const displayLabel = attributionType === 'NAMED' ? displayName : roleDescription;
  const affiliateCta = attributionType === 'NAMED'
    ? `Join via ${displayName}'s link`
    : `Join via this builder's link`;

  return (
    <article style={{
      background: '#0D0F14',
      border: `1px solid ${homepageFeatured ? '#D92532' : '#2A2D35'}`,
      padding: '28px',
      position: 'relative',
    }}>
      {/* Paid badge */}
      {spotlightTier === 'paid' && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#B8922A',
          color: '#0A0B0F',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          padding: '3px 8px',
        }}>
          FEATURED
        </div>
      )}

      {/* Operator number */}
      <div style={{
        color: '#D92532',
        fontSize: '32px',
        fontWeight: 900,
        fontFamily: 'monospace',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        marginBottom: '12px',
      }}>
        #{String(userNumber).padStart(3, '0')}
      </div>

      {/* Name / role */}
      <div style={{
        color: '#F7F2EE',
        fontSize: '16px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        marginBottom: '4px',
      }}>
        {displayLabel}
      </div>

      {/* Products */}
      {productsBuilding.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '12px 0' }}>
          {productsBuilding.slice(0, 3).map((p) => (
            <span key={p} style={{
              background: '#1A1D24',
              color: '#9CA3AF',
              fontSize: '11px',
              padding: '3px 8px',
              letterSpacing: '0.04em',
            }}>
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Quote */}
      {quote && (
        <blockquote style={{
          color: '#C4BBAF',
          fontSize: '13px',
          fontStyle: 'italic',
          lineHeight: '1.6',
          margin: '12px 0',
          borderLeft: '2px solid #D92532',
          paddingLeft: '12px',
        }}>
          "{quote}"
        </blockquote>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
        <a
          href={`/builders/${spotlightSlug}`}
          style={{
            color: '#F7F2EE',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            borderBottom: '1px solid #D92532',
            paddingBottom: '2px',
          }}
        >
          Read Spotlight →
        </a>
        <a
          href={`/?ref=${affiliateCode}`}
          style={{
            color: '#6B7280',
            fontSize: '11px',
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
        >
          {affiliateCta} <span style={{ color: '#3D4048' }}>(referral)</span>
        </a>
      </div>
    </article>
  );
}
