import React from 'react';
import Link from 'next/link';
import Masthead from '@/components/Masthead';

interface VaultItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  fileFormat: string;
  fileSizeDisplay: string;
  downloadUrl: string;
  license: string;
}

const VAULT_CATALOG: VaultItem[] = [
  {
    id: '1',
    title: 'Ibn Kathir Tafsir Complete English Corpus',
    slug: 'ibn-kathir-tafsir-corpus',
    tagline: 'Complete scholarly English commentary of all 114 Surahs in clean machine-readable JSON and formatted PDF.',
    description: 'The authoritative commentary of Hafiz Ibn Kathir. Indexed by Surah, Ayah, and thematic keywords. Machine-readable JSON ready for LLM RAG pipelines or local reference.',
    category: 'Scripture Dataset',
    fileFormat: 'ZIP',
    fileSizeDisplay: '705 KB',
    downloadUrl: '/vault/ibn-kathir-tafsir-v1.zip',
    license: 'Public Domain',
  },
  {
    id: '2',
    title: 'Authentic Hadith Engine Corpus (Sahih Kutub al-Sittah)',
    slug: 'sahih-hadith-engine-corpus',
    tagline: '34,034 authenticated Sahih traditions across the 6 canonical collections in structured JSON.',
    description: 'Includes Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami at-Tirmidhi, Sunan an-Nasa\'i, and Sunan Ibn Majah. Filtered strictly to Sahih and Hasan gradings with narrator chains.',
    category: 'Scripture Dataset',
    fileFormat: 'JSON',
    fileSizeDisplay: '18.9 MB',
    downloadUrl: '/vault/kutub-al-sittah-sahih.json',
    license: 'MIT',
  },
  {
    id: '3',
    title: 'The Lantern Daily n8n Newsroom Automation Pipeline',
    slug: 'lantern-daily-n8n-newsroom-pipeline',
    tagline: 'Complete importable 6-workflow JSON bundle powering multi-tier RSS ingestion, AI clustering, and Beehiiv auto-dispatch.',
    description: 'The exact production pipeline running The Lantern Daily. Connects 19 RSS feeds, executes cross-publication clustering, queries Supabase pgvector RAG, crafts the 3-beat Islamic Lens, and publishes.',
    category: 'Workflow Automation',
    fileFormat: 'N8N JSON',
    fileSizeDisplay: '21 KB',
    downloadUrl: '/vault/lantern-daily-n8n-v1.json',
    license: 'MIT',
  },
  {
    id: '4',
    title: 'Halal Public Equities Screening Matrix (AAOIFI Standard 21)',
    slug: 'halal-equity-screener-aaoifi-matrix',
    tagline: 'Automated financial spreadsheet template implementing AAOIFI debt, cash, and non-permissible income ratios.',
    description: 'Formulas for market cap vs interest-bearing debt (<33%), cash & securities (<33%), and non-compliant revenue purification (<5%). Paste ticker financials for instant compliance verdict.',
    category: 'Finance Tool',
    fileFormat: 'XLSX',
    fileSizeDisplay: '6.0 KB',
    downloadUrl: '/vault/aaoifi-equity-screening-matrix.xlsx',
    license: 'MIT',
  },
  {
    id: '5',
    title: 'Islamic Tech Ethics & Maqasid Governance Framework',
    slug: 'islamic-tech-ethics-governance-framework',
    tagline: 'Executive PDF guide and policy matrix for evaluating AI agents, algorithms, and SaaS business models under Islamic law.',
    description: 'Deconstructs Din, Nafs, Aql, Nasl, and Mal into actionable technical criteria. Includes red-line audit checklists for dark patterns, predatory retention mechanics, and algorithmic riba.',
    category: 'Research Report',
    fileFormat: 'PDF',
    fileSizeDisplay: '3.6 KB',
    downloadUrl: '/vault/islamic-tech-ethics-framework.pdf',
    license: 'CC-BY-NC 4.0',
  },
];

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <Masthead />
      {/* Hero Header */}
      <section className="border-b border-[#1A1F2E] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8922A]/40 bg-[#B8922A]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#B8922A]">
            <span>✦</span>
            <span>The Lantern Vault</span>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-5xl">
            Sovereign Tools for Muslim Builders.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg">
            Free readers get daily clarity. Paid operators get the software, workflows, and machine-readable scripture engines we build with.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#D1D5DB]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#4ADE80]">✓</span> Machine-Readable Datasets
            </span>
            <span className="text-[#4B5563]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#4ADE80]">✓</span> Exportable Automation Pipelines
            </span>
            <span className="text-[#4B5563]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#4ADE80]">✓</span> Open-Source MIT Licenses
            </span>
          </div>
        </div>
      </section>

      {/* Vault Catalog Grid */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2D35] pb-4">
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-[#F7F2EE]">
              Available Deliverables ({VAULT_CATALOG.length})
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              All items stamped &ldquo;Downloaded from thelanterndaily.com&rdquo;
            </p>
          </div>

          <div className="rounded-lg border border-[#B8922A]/30 bg-[#12151D] px-4 py-2 text-xs">
            <span className="text-[#9CA3AF]">Access Tier: </span>
            <span className="font-semibold text-[#B8922A]">Paid Subscribers Only</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VAULT_CATALOG.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-6 transition-all hover:border-[#B8922A]/50 hover:shadow-lg"
            >
              <div>
                <div className="mb-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="rounded bg-[#1A1F2C] px-2 py-0.5 text-[#B8922A]">
                    {item.category}
                  </span>
                  <span className="text-[#9CA3AF]">
                    {item.fileFormat} · {item.fileSizeDisplay}
                  </span>
                </div>

                <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-[#F7F2EE]">
                  {item.title}
                </h3>

                <p className="mb-4 text-xs leading-relaxed text-[#9CA3AF]">
                  {item.tagline}
                </p>
              </div>

              <div className="mt-6 border-t border-[#1F2430] pt-4">
                <div className="mb-3 flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span>License: {item.license}</span>
                  <span className="font-mono text-[#4ADE80]">✓ Physical Asset Ready</span>
                </div>

                {/* Direct Verified Physical Download */}
                <a
                  href={item.downloadUrl}
                  download
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#B8922A] px-4 py-2.5 text-xs font-semibold text-[#07080D] transition-colors hover:bg-[#D4A936]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Deliverable ({item.fileSizeDisplay})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-2xl border border-[#B8922A]/30 bg-gradient-to-b from-[#12151D] to-[#0D0F14] p-8 text-center sm:p-12">
          <h3 className="font-serif text-2xl font-bold text-[#F7F2EE] sm:text-3xl">
            Build with the tools that power The Lantern Daily.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#9CA3AF]">
            Subscribe to the Operator tier for $15/month. Instant access to all current deliverables, future pipeline releases, and our complete dataset repository.
          </p>
          <div className="mt-6">
            <Link
              href="/#subscribe"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D92532] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#BF1F2B]"
            >
              <span>Join Operator Tier →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
