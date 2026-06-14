'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Issue {
  id: string;
  title: string;
  date: string;
  summary: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArchivePage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/issues')
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.issues || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-amber-700 hover:text-amber-800 font-medium">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-stone-900 mt-2">Issue Archive</h1>
          <p className="text-stone-600 mt-1">Browse all past issues of The Lantern Daily</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {issues.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 text-lg">No issues found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <Link
                key={issue.id}
                href={`/issues/${issue.id}`}
                className="block bg-white rounded-lg border border-stone-200 p-6 hover:border-amber-300 hover:shadow-md transition-all duration-200"
              >
                <h2 className="text-xl font-semibold text-stone-900">{issue.title}</h2>
                <p className="text-amber-700 text-sm mt-1">{formatDate(issue.date)}</p>
                <p className="text-stone-600 mt-2">{issue.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
