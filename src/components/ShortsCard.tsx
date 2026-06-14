interface Props {
  title: string;
  body: string;
  date: string;
  tag: string;
}

export default function ShortsCard({ title, body, date, tag }: Props) {
  return (
    <div style={{ padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3A3F57' }}>{date}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8299', padding: '2px 7px', border: '1px solid rgba(255,255,255,0.12)' }}>{tag}</span>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 600, lineHeight: 1.3, color: '#E8E9EF', margin: '0 0 12px' }}>{title}</h3>
      <div style={{ fontSize: 14, lineHeight: 1.8, color: '#7A8299' }} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}