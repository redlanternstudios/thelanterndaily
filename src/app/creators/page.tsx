'use client';

import React, { useState } from 'react';
import Masthead from '../../components/Masthead';
import HalalBadge from '../../components/HalalBadge';

interface CreatorItem {
  id: string;
  name: string;
  handle: string;
  platform: 'youtube' | 'tiktok';
  category: string;
  description: string;
  url: string;
}

const SEED_CREATORS: CreatorItem[] = [
  {
    id: '1',
    name: 'Yaqeen Institute',
    handle: '@YaqeenInstitute',
    platform: 'youtube',
    category: 'Research & Deen',
    description: 'Academic Islamic research addressing contemporary intellectual, ethical, and sociological questions.',
    url: 'https://youtube.com/@YaqeenInstitute',
  },
  {
    id: '2',
    name: 'Islamic Finance Guru',
    handle: '@IslamicFinanceGuru',
    platform: 'youtube',
    category: 'Halal Investing',
    description: 'Demystifying halal mortgages, crypto, equity screening, and venture capital for Muslim professionals.',
    url: 'https://youtube.com/@IslamicFinanceGuru',
  },
  {
    id: '3',
    name: 'Mufti Menk Official',
    handle: '@MuftiMenkOfficial',
    platform: 'youtube',
    category: 'Ethics & Wisdom',
    description: 'Practical, compassionate guidance on mental wellness, character, and contemporary life challenges.',
    url: 'https://youtube.com/@MuftiMenkOfficial',
  },
  {
    id: '4',
    name: 'Bayyinah Institute',
    handle: '@bayyinahtv',
    platform: 'youtube',
    category: 'Quranic Studies',
    description: 'Linguistic and thematic Quranic analysis bridging classical tafsir with modern human psychology.',
    url: 'https://youtube.com/@bayyinahtv',
  },
  {
    id: '5',
    name: '5Pillars News',
    handle: '@5PillarsNews',
    platform: 'youtube',
    category: 'Independent Journalism',
    description: 'Grassroots Muslim world coverage providing investigative reporting on geopolitics and minority civil rights.',
    url: 'https://youtube.com/@5PillarsNews',
  },
  {
    id: '6',
    name: 'IFG Shorts',
    handle: '@islamicfinanceguru',
    platform: 'tiktok',
    category: 'Micro-Finance',
    description: '60-second breakdowns on student loan riba, pension screening, and entrepreneurial risk.',
    url: 'https://tiktok.com/@islamicfinanceguru',
  },
];

export default function CreatorsPage() {
  const [handle, setHandle] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [category, setCategory] = useState('tech');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    // Simulate submission to n8n webhook or Supabase
    setSubmitted(true);
    setHandle('');
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <Masthead />
      {/* Header */}
      <section className="border-b border-[#1A1F2E] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D92532]/40 bg-[#D92532]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#D92532]">
            <span>📺</span>
            <span>Vetted Creator Network</span>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-5xl">
            Voices of Substance. Zero Rage-Bait.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            We review every channel before a single video surfaces on The Lantern Daily. High-signal thinkers across AI, sovereign finance, authentic scholarship, and independent journalism.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-[#2A2D35] pb-4">
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#F7F2EE]">
            Approved Creators ({SEED_CREATORS.length})
          </h2>
          <span className="font-mono text-xs text-[#2D7A4F]">100% Vetted by Rory</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEED_CREATORS.map((creator) => (
            <div
              key={creator.id}
              className="flex flex-col justify-between rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-6 transition-all hover:border-[#3E434F]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-[#B8922A]">
                    {creator.category}
                  </span>
                  <HalalBadge stance="halal" size="sm" />
                </div>

                <h3 className="font-serif text-lg font-bold text-[#F7F2EE]">
                  {creator.name}
                </h3>
                <p className="mb-3 font-mono text-xs text-[#9CA3AF]">
                  {creator.handle} · {creator.platform.toUpperCase()}
                </p>

                <p className="text-xs leading-relaxed text-[#9CA3AF]">
                  {creator.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#1F2430] pt-4 text-right">
                <a
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#9CA3AF] hover:text-[#B8922A]"
                >
                  <span>Visit Channel</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Nomination Form */}
        <div className="mt-16 rounded-2xl border border-[#2A2D35] bg-[#0D0F14] p-8 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-serif text-2xl font-bold text-[#F7F2EE]">
              Nominate a Creator for The Lantern Daily
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
              Know a YouTube builder, podcaster, or TikTok creator producing high-substance Muslim content? Submit their handle for editorial review.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-lg border border-[#2D7A4F] bg-[#2D7A4F]/10 p-4 text-xs font-medium text-[#4ADE80]">
                ✓ Nomination received. Forwarded to Rory for review.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="rounded-lg border border-[#2A2D35] bg-[#12151D] px-3 py-2.5 text-xs text-[#F7F2EE] focus:border-[#B8922A] focus:outline-none"
                >
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>

                <input
                  type="text"
                  placeholder="@channel_handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="flex-1 rounded-lg border border-[#2A2D35] bg-[#12151D] px-4 py-2.5 text-xs text-[#F7F2EE] placeholder-[#6B7280] focus:border-[#B8922A] focus:outline-none"
                  required
                />

                <button
                  type="submit"
                  className="rounded-lg bg-[#D92532] px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#BF1F2B]"
                >
                  Submit for Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
