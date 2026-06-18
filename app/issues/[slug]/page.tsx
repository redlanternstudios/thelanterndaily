import { notFound } from 'next/navigation';
import { LanternMasthead } from '@/components/LanternMasthead';
import { Footer } from '@/components/ui/Footer';
import { PremiumGate } from '@/components/ui/PremiumGate';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getIssue(slug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('lantern_issues')
      .select('*')
      .eq('slug', slug)
      .not('published_at', 'is', null)
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = await getIssue(slug);

  if (!issue) notFound();

  const isPaid = issue.tier === 'paid';
  const publishedDate = issue.published_at
    ? new Date(issue.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
      <LanternMasthead />
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Category + date */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          {issue.category && (
            <span style={{
              color: '#D92532',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}>
              {issue.category}
            </span>
          )}
          {publishedDate && (
            <span style={{ color: '#3D4048', fontSize: '12px', letterSpacing: '0.04em' }}>
              {publishedDate}
            </span>
          )}
          {isPaid && (
            <span style={{
              background: '#D92532',
              color: '#F7F2EE',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              padding: '3px 8px',
            }}>
              PAID
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          color: '#F7F2EE',
          fontSize: '36px',
          fontWeight: 900,
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          margin: '0 0 20px',
        }}>
          {issue.title}
        </h1>

        {/* Excerpt */}
        {issue.excerpt && (
          <p style={{
            color: '#9CA3AF',
            fontSize: '16px',
            lineHeight: '1.7',
            margin: '0 0 40px',
            borderBottom: '1px solid #1A1D24',
            paddingBottom: '32px',
          }}>
            {issue.excerpt}
          </p>
        )}

        {/* Content — gated if paid */}
        {isPaid ? (
          <PremiumGate previewLines={400}>
            <div
              className="issue-content"
              dangerouslySetInnerHTML={{ __html: issue.content }}
              style={{ color: '#C4BBAF', fontSize: '15px', lineHeight: '1.85' }}
            />
          </PremiumGate>
        ) : (
          <div
            className="issue-content"
            dangerouslySetInnerHTML={{ __html: issue.content }}
            style={{ color: '#C4BBAF', fontSize: '15px', lineHeight: '1.85' }}
          />
        )}

        {/* Back */}
        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #1A1D24', display: 'flex', gap: '24px' }}>
          <a href="/archive" style={{ color: '#6B7280', fontSize: '12px', letterSpacing: '0.06em', textDecoration: 'none' }}>
            ← ALL ISSUES
          </a>
          <a href="/" style={{ color: '#6B7280', fontSize: '12px', letterSpacing: '0.06em', textDecoration: 'none' }}>
            HOME
          </a>
        </div>

      </main>
      <Footer />
    </>
  );
}
