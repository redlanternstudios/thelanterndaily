'use client';

import { useState } from 'react';

interface SharePromptProps {
  title?: string;
  text?: string;
  url?: string;
}

export default function SharePrompt({
  title = 'The Lantern Daily',
  text = 'Join me on The Lantern Daily — signal before consensus.',
  url = 'https://thelanterndaily.com',
}: SharePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-lantern-muted-text hover:text-lantern-accent transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
      </svg>
      {copied ? 'Link copied!' : 'Share'}
    </button>
  );
}
