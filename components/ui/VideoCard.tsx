interface VideoCardProps {
  videoTitle: string;
  videoUrl: string; // YouTube watch URL only — NEVER embed
  channelName: string;
  channelUrl: string;
  thumbnailUrl?: string;
  channelType: 'MUSLIM_RUN' | 'HALAL_SAFE' | 'OPERATOR_RECOMMENDED';
  editorialNote?: string;
  contentType: 'tutorial' | 'interview' | 'tool-review' | 'founder-story';
}

const CHANNEL_TYPE_STYLES: Record<string, { label: string; color: string }> = {
  MUSLIM_RUN: { label: 'MUSLIM-RUN', color: '#2D7A4F' },
  HALAL_SAFE: { label: 'HALAL-SAFE', color: '#C47A2A' },
  OPERATOR_RECOMMENDED: { label: 'OPERATOR-RECOMMENDED', color: '#6070D0' },
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  tutorial: 'TUTORIAL',
  interview: 'INTERVIEW',
  'tool-review': 'TOOL REVIEW',
  'founder-story': 'FOUNDER STORY',
};

export function VideoCard({
  videoTitle,
  videoUrl,
  channelName,
  channelUrl,
  thumbnailUrl,
  channelType,
  editorialNote,
  contentType,
}: VideoCardProps) {
  // SAFETY: block any embed URLs
  if (videoUrl.includes('/embed/')) {
    console.error('[VideoCard] Embed URLs are blocked. Use youtube.com/watch?v= format.');
    return null;
  }

  const channelStyle = CHANNEL_TYPE_STYLES[channelType];

  return (
    <article style={{
      background: '#0D0F14',
      border: '1px solid #2A2D35',
      overflow: 'hidden',
    }}>
      {/* Thumbnail — static, links to YouTube */}
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', position: 'relative', aspectRatio: '16/9', background: '#1A1D24' }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={videoTitle}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1A1D24',
          }}>
            <span style={{ color: '#3D4048', fontSize: '24px' }}>▶</span>
          </div>
        )}
        {/* Play overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.3)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(217,37,50,0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: '18px', marginLeft: '3px' }}>▶</span>
          </div>
        </div>
      </a>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Type + channel badge row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span style={{
            color: '#D92532',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            {CONTENT_TYPE_LABELS[contentType]}
          </span>
          <span style={{
            background: channelStyle.color,
            color: '#fff',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            padding: '2px 6px',
          }}>
            {channelStyle.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          color: '#F7F2EE',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '1.4',
          margin: '0 0 8px',
          letterSpacing: '-0.01em',
        }}>
          {videoTitle}
        </h3>

        {/* Channel */}
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#6B7280', fontSize: '12px', textDecoration: 'none' }}
        >
          {channelName}
        </a>

        {/* Editorial note */}
        {editorialNote && (
          <p style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: '1.5', margin: '10px 0 0', fontStyle: 'italic' }}>
            {editorialNote}
          </p>
        )}

        {/* External CTA */}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '14px',
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
          Watch on YouTube →
        </a>
        <span style={{ display: 'block', color: '#3D4048', fontSize: '10px', marginTop: '4px', letterSpacing: '0.04em' }}>
          OPENS IN NEW TAB
        </span>
      </div>
    </article>
  );
}
