"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export interface SourceItem {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  tier: 'Tier 1: Institutional' | 'Tier 2: Engineering' | 'Tier 3: Fiqh & Primary';
  protocol: 'FastMCP REST API' | 'RSS 2.0 Ingest' | 'SEC EDGAR Pipeline' | 'Webhook Stream' | 'Direct Scraping';
  cadence: 'Continuous 4-Hour' | 'Daily 04:00 AM' | 'Real-Time Webhook' | 'Weekly Audit';
  filtrationRule: string;
  status: 'STREAMING' | 'ACTIVE' | 'VERIFIED';
  latency: string;
  uptime: string;
  description: string;
}

export const MONITORED_SOURCES: SourceItem[] = [
  {
    id: 'src-bloomberg',
    name: 'Bloomberg Markets & Commodities',
    domain: 'bloomberg.com',
    url: 'https://www.bloomberg.com/markets',
    category: 'Markets & Islamic Finance',
    tier: 'Tier 1: Institutional',
    protocol: 'FastMCP REST API',
    cadence: 'Continuous 4-Hour',
    filtrationRule: 'Sovereign liquidity, treasury yields, and physical gold/energy reserves. Strips speculative retail options.',
    status: 'STREAMING',
    latency: '34ms',
    uptime: '99.99%',
    description: 'Global benchmark for macro liquidity, interest rate decisions, and institutional capital movements.',
  },
  {
    id: 'src-ft',
    name: 'Financial Times — Global Finance',
    domain: 'ft.com',
    url: 'https://www.ft.com/',
    category: 'Markets & Islamic Finance',
    tier: 'Tier 1: Institutional',
    protocol: 'RSS 2.0 Ingest',
    cadence: 'Daily 04:00 AM',
    filtrationRule: 'Filtered for cross-border private equity, sovereign wealth allocation (PIF, Mubadala, QIA), and asset-backed debt.',
    status: 'ACTIVE',
    latency: '82ms',
    uptime: '99.95%',
    description: 'European and Gulf institutional finance coverage, sovereign debt restructuring, and macro trend analysis.',
  },
  {
    id: 'src-aaoifi',
    name: 'AAOIFI Standards & Governance Registry',
    domain: 'aaoifi.com',
    url: 'https://aaoifi.com/',
    category: 'Sacred Ethics & Fiqh',
    tier: 'Tier 3: Fiqh & Primary',
    protocol: 'Direct Scraping',
    cadence: 'Weekly Audit',
    filtrationRule: 'Strict AAOIFI Standard 21 screening: Debt-to-Market-Cap < 33%, Cash/Interest-bearing deposits < 33%, Haram revenue < 5%.',
    status: 'VERIFIED',
    latency: '110ms',
    uptime: '100%',
    description: 'Accounting and Auditing Organization for Islamic Financial Institutions — foundational benchmarks for interest-free equity screening.',
  },
  {
    id: 'src-ars',
    name: 'Ars Technica — Systems & Security',
    domain: 'arstechnica.com',
    url: 'https://arstechnica.com/information-technology/',
    category: 'AI & Infrastructure',
    tier: 'Tier 2: Engineering',
    protocol: 'RSS 2.0 Ingest',
    cadence: 'Continuous 4-Hour',
    filtrationRule: 'Bare-metal vulnerability disclosures, enterprise CVEs, and autonomous agent security architecture.',
    status: 'STREAMING',
    latency: '45ms',
    uptime: '99.98%',
    description: 'In-depth enterprise cybersecurity, Linux kernel developments, and cloud infrastructure vulnerabilities.',
  },
  {
    id: 'src-ieee',
    name: 'IEEE Spectrum — Computing & Hardware',
    domain: 'spectrum.ieee.org',
    url: 'https://spectrum.ieee.org/',
    category: 'AI & Infrastructure',
    tier: 'Tier 1: Institutional',
    protocol: 'RSS 2.0 Ingest',
    cadence: 'Daily 04:00 AM',
    filtrationRule: 'Silicon fabrication (TSMC/Intel), liquid cooling thermal engineering, and interconnect bandwidth specs.',
    status: 'ACTIVE',
    latency: '68ms',
    uptime: '99.92%',
    description: 'Peer-reviewed engineering reports on semiconductor physics, high-density compute nodes, and photonics.',
  },
  {
    id: 'src-sec',
    name: 'U.S. SEC EDGAR Form 10-K & 8-K Feed',
    domain: 'sec.gov/edgar',
    url: 'https://www.sec.gov/edgar',
    category: 'Markets & Islamic Finance',
    tier: 'Tier 1: Institutional',
    protocol: 'SEC EDGAR Pipeline',
    cadence: 'Real-Time Webhook',
    filtrationRule: 'Automated debt-to-equity and interest expense parsing directly from audited balance sheets.',
    status: 'STREAMING',
    latency: '28ms',
    uptime: '100%',
    description: 'Direct federal filings from public equities. Powers The Lantern Daily Sharia equity balance-sheet screener.',
  },
  {
    id: 'src-restofworld',
    name: 'Rest of World — Global Tech Briefs',
    domain: 'restofworld.org',
    url: 'https://restofworld.org/',
    category: 'Governance & Policy',
    tier: 'Tier 2: Engineering',
    protocol: 'RSS 2.0 Ingest',
    cadence: 'Daily 04:00 AM',
    filtrationRule: 'Sovereign infrastructure deployments outside Silicon Valley (MENA, Pakistan, Southeast Asia, Sub-Saharan Africa).',
    status: 'ACTIVE',
    latency: '74ms',
    uptime: '99.90%',
    description: 'Investigative reporting on technological sovereignty and local hardware ecosystems in non-Western economies.',
  },
  {
    id: 'src-semianalysis',
    name: 'SemiAnalysis — GPU & Compute Economics',
    domain: 'semianalysis.com',
    url: 'https://www.semianalysis.com/',
    category: 'AI & Infrastructure',
    tier: 'Tier 2: Engineering',
    protocol: 'Direct Scraping',
    cadence: 'Weekly Audit',
    filtrationRule: 'GPU cluster capex, power utilization efficiency (PUE), and wafer supply contracts (NVIDIA, AMD, Broadcom).',
    status: 'VERIFIED',
    latency: '95ms',
    uptime: '99.99%',
    description: 'Forensic financial and hardware audits of global AI datacenter buildouts and wafer allocations.',
  },
  {
    id: 'src-github',
    name: 'GitHub Trending & Open-Weights Repos',
    domain: 'github.com',
    url: 'https://github.com/trending',
    category: 'Operator Stack',
    tier: 'Tier 3: Fiqh & Primary',
    protocol: 'FastMCP REST API',
    cadence: 'Continuous 4-Hour',
    filtrationRule: 'Filtered for permissive licensing (MIT, Apache 2.0), self-hostable runtimes, and local inference tooling.',
    status: 'STREAMING',
    latency: '40ms',
    uptime: '99.99%',
    description: 'Production-ready agent frameworks, vector database engines, and fine-tuning harnesses.',
  },
  {
    id: 'src-huggingface',
    name: 'Hugging Face Open LLM Leaderboard',
    domain: 'huggingface.co',
    url: 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard',
    category: 'Operator Stack',
    tier: 'Tier 3: Fiqh & Primary',
    protocol: 'FastMCP REST API',
    cadence: 'Daily 04:00 AM',
    filtrationRule: 'Weights audit: Zero proprietary cloud lock-in, quantized edge execution capability, and token efficiency score > 85.',
    status: 'ACTIVE',
    latency: '52ms',
    uptime: '99.94%',
    description: 'Empirical benchmark tracking of open-source weights against closed commercial frontier models.',
  },
  {
    id: 'src-vanta',
    name: 'Vanta Compliance & Security Research',
    domain: 'vanta.com',
    url: 'https://www.vanta.com/resources',
    category: 'Governance & Policy',
    tier: 'Tier 2: Engineering',
    protocol: 'RSS 2.0 Ingest',
    cadence: 'Weekly Audit',
    filtrationRule: 'SOC 2 Type II, ISO 27001, and automated continuous evidence harvesting for autonomous systems.',
    status: 'ACTIVE',
    latency: '60ms',
    uptime: '99.97%',
    description: 'Modern policy-as-code frameworks, vendor risk management, and algorithmic compliance monitoring.',
  },
  {
    id: 'src-oic',
    name: 'International Islamic Fiqh Academy (IIFA / OIC)',
    domain: 'iifa-aifi.org',
    url: 'https://iifa-aifi.org/',
    category: 'Sacred Ethics & Fiqh',
    tier: 'Tier 3: Fiqh & Primary',
    protocol: 'Direct Scraping',
    cadence: 'Weekly Audit',
    filtrationRule: 'Scholarly consensus (Ijma) on algorithmic contracts, digital ownership, artificial intelligence delegation, and riba prohibitions.',
    status: 'VERIFIED',
    latency: '140ms',
    uptime: '99.85%',
    description: 'Primary international body of Islamic jurisprudence representing 57 member states of the OIC.',
  },
  {
    id: 'src-whitehouse',
    name: 'Federal Register — AI Policy & Executive Orders',
    domain: 'federalregister.gov',
    url: 'https://www.federalregister.gov/',
    category: 'Governance & Policy',
    tier: 'Tier 1: Institutional',
    protocol: 'FastMCP REST API',
    cadence: 'Real-Time Webhook',
    filtrationRule: 'Direct statutory text, export control regulations (BIS compute sanctions), and national defense AI mandates.',
    status: 'STREAMING',
    latency: '30ms',
    uptime: '100%',
    description: 'Official gazette of the United States Government for executive orders and regulatory rulemaking.',
  },
  {
    id: 'src-fred',
    name: 'Federal Reserve Bank of St. Louis (FRED)',
    domain: 'fred.stlouisfed.org',
    url: 'https://fred.stlouisfed.org/',
    category: 'Markets & Islamic Finance',
    tier: 'Tier 1: Institutional',
    protocol: 'FastMCP REST API',
    cadence: 'Daily 04:00 AM',
    filtrationRule: 'M2 money supply velocity, Fed funds effective rate, real yields, and commercial bank credit contraction.',
    status: 'ACTIVE',
    latency: '22ms',
    uptime: '100%',
    description: 'The definitive macroeconomic database tracking monetary inflation, debt loads, and credit liquidity.',
  },
  {
    id: 'src-hadith',
    name: 'Authentic Hadith Primary Sourcing (Kutub al-Sittah)',
    domain: 'sunnah.com',
    url: 'https://sunnah.com/',
    category: 'Sacred Ethics & Fiqh',
    tier: 'Tier 3: Fiqh & Primary',
    protocol: 'Direct Scraping',
    cadence: 'Weekly Audit',
    filtrationRule: 'Verified Sahih chain of narration (Isnad) across Sahih al-Bukhari, Sahih Muslim, and classical Mu\'amalat treatises.',
    status: 'VERIFIED',
    latency: '38ms',
    uptime: '99.99%',
    description: 'Primary scriptural citations for trade ethics, honest disclosure (Bayan), prohibition of deception (Gharar), and mutual consent.',
  },
];

export const DAILY_CADENCE_STAGES = [
  {
    time: '04:00 AM EST',
    tag: 'RADAR SWEEP',
    title: 'Global Ingestion & Overnight Sweep',
    description: 'Tokyo and London market close data is scraped alongside Wall Street pre-market indicators across 50+ RSS and FastMCP endpoints. Unstructured stories are normalized and pushed to Supabase content_radar.',
    tooling: ['n8n Autonomous Radar (WF-01)', 'FastMCP Server', 'Supabase content_radar'],
    status: 'AUTOMATED',
  },
  {
    time: '05:00 AM EST',
    tag: 'EVALUATION GATE',
    title: 'Deterministic AI Synthesis & Fiqh Screening',
    description: 'Gemini 3.8 Flash and Claude Sonnet process raw ingested feeds against deterministic evaluation rules: (1) AAOIFI 21 debt ratios, (2) Zero-hype filter, (3) Mathematical citation verification.',
    tooling: ['n8n LangChain Screener (WF-02)', 'Gemini 3.8 Flash', 'AAOIFI Standard 21 Parser'],
    status: 'AUTOMATED',
  },
  {
    time: '05:30 AM EST',
    tag: 'HUMAN GATE',
    title: 'Editorial Review & Telegram Mobile Hold',
    description: 'Scored intelligence candidates and editorial drafts are staged directly to Keymon via @TheLanternDailyRadar_Bot. Dispatches are approved with 1-tap inline buttons (Approve / Reject) or held for revision.',
    tooling: ['The Lantern Daily Bot (@TheLanternDailyRadar_Bot)', 'Telegram Mobile HITL Gate', 'Next.js Admin Review'],
    status: 'HUMAN-IN-THE-LOOP',
  },
  {
    time: '06:00 AM EST',
    tag: 'PRODUCTION LAUNCH',
    title: 'Live Edition Publication & Archival Countdown',
    description: 'The Lantern Daily production edition is published to Next.js Edge. The 24-hour Edition Countdown Timer activates, and the daily morning briefing dispatches via Beehiiv and Resend.',
    tooling: ['n8n Edge Dispatcher (WF-04)', 'Vercel Edge Network', 'Beehiiv REST API'],
    status: 'LIVE PUBLIC',
  },
  {
    time: '12:00 PM EST',
    tag: 'MIDDAY PULSE',
    title: '90-Second Video Signal & Macro Pulse',
    description: 'Midday executive briefing tracking compute spot prices, energy capex, gold/currency movements, and corporate earnings. Rendered in 9:16 vertical video for omni-social distribution.',
    tooling: ['Remotion Canvas', 'Claude Sonnet Copy', 'FastMCP Dispatcher'],
    status: 'OMNI-SYNDICATED',
  },
  {
    time: '06:00 PM EST',
    tag: 'ARCHIVE HAND-OFF',
    title: 'Daily Archival Wrap & Vault Ingestion',
    description: 'The active daily edition transitions to the immutable Archival Registry (/archive). Overnight autonomous listeners activate across geopolitical and silicon supply channels.',
    tooling: ['Supabase DB Archive', 'Markdown Vault Sync', 'Continuous Watchers'],
    status: 'IMMUTABLE RECORD',
  },
];

export default function SourcesConsole() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(MONITORED_SOURCES.map((s) => s.category)));
    return ['All', ...cats];
  }, []);

  const tiers = useMemo(() => {
    return ['All', 'Tier 1: Institutional', 'Tier 2: Engineering', 'Tier 3: Fiqh & Primary'];
  }, []);

  const filteredSources = useMemo(() => {
    return MONITORED_SOURCES.filter((s) => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchTier = selectedTier === 'All' || s.tier === selectedTier;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.filtrationRule.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchCat && matchTier && matchQuery;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  return (
    <div className="space-y-16">
      
      {/* ── SECTION 1: INTERACTIVE SOURCING REGISTRY ── */}
      <section>
        <div className="border-b border-[#1A1E2B] pb-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B8922A] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8922A]" />
              <span>Frontier Intelligence · Sourcing &amp; Provenance Registry</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#F7F2EE] mt-2">
              Frontier Tech &amp; Infrastructure Radar.
            </h2>
            <p className="mt-2 text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
              Every briefing published by The Lantern Daily is deterministically screened against authentic primary data, audited SEC balance sheets, semiconductor supply allocations, and verified compute benchmarks. Zero clickbait. Zero unverified hype.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="rounded border border-[#1A1F2E] bg-[#0A0C14] px-3 py-1.5 text-[#4ADE80]">
              ● 15 Active Pipelines
            </span>
            <span className="rounded border border-[#1A1F2E] bg-[#0A0C14] px-3 py-1.5 text-[#D1D5DB]">
              99.96% Health
            </span>
          </div>
        </div>

        {/* ── Deterministic Ingestion Covenant Callout ── */}
        <div className="mb-8 rounded-sm border border-[#D42535]/30 bg-gradient-to-r from-[#D42535]/10 via-[#0A0C14] to-[#0A0C14] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#D42535] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D42535] animate-pulse" />
                Deterministic Verification Covenant · Primary Source Standard
              </span>
              <p className="text-sm text-[#E5E7EB] font-serif leading-snug">
                We don&apos;t summarize yesterday&apos;s press releases. Our engineering desk continuously monitors direct repository commits, ArXiv preprints, foundry wafer orders, and SEC filings to verify what is actually executing in production.
              </p>
            </div>
            <div className="shrink-0 font-mono text-xs text-[#B8922A] border border-[#B8922A]/40 bg-[#07080D] px-3.5 py-2 rounded">
              ⚡ Autonomous Verification
            </div>
          </div>
        </div>

        {/* ── Filtration Bar ── */}
        <div className="rounded-sm border border-[#1A1E2B] bg-[#0A0C14] p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <label htmlFor="source-search" className="block font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                Search Monitored Feeds &amp; Rules
              </label>
              <input
                id="source-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Bloomberg, AAOIFI, SEC EDGAR, GitHub, GPU capex..."
                className="w-full rounded border border-[#1E2433] bg-[#07080D] px-3.5 py-2 font-mono text-xs text-[#F7F2EE] placeholder-[#4B5563] focus:border-[#B8922A] focus:outline-none transition-colors"
              />
            </div>

            {/* Tier Filter */}
            <div className="w-full md:w-64">
              <label htmlFor="tier-filter" className="block font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                Reliability Tier
              </label>
              <select
                id="tier-filter"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full rounded border border-[#1E2433] bg-[#07080D] px-3 py-2 font-mono text-xs text-[#F7F2EE] focus:border-[#B8922A] focus:outline-none transition-colors"
              >
                {tiers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-2">
              Filter by Sector Desk:
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded px-3 py-1 font-mono text-xs transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#B8922A] text-black font-bold'
                      : 'border border-[#1A1F2E] bg-[#07080D] text-[#9CA3AF] hover:text-[#F7F2EE] hover:border-[#374151]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sourcing Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              className="rounded-sm border border-[#1A1E2B] bg-[#0A0C14] p-5 flex flex-col justify-between hover:border-[#B8922A]/50 transition-colors"
            >
              <div>
                {/* Card Top: Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#B8922A]/40 bg-[#B8922A]/10 text-[#E5C058]">
                    {source.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#4ADE80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                    {source.status}
                  </span>
                </div>

                {/* Source Name & Link */}
                <h3 className="font-serif text-lg font-bold text-[#F7F2EE] leading-snug">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B8922A] transition-colors"
                  >
                    {source.name} ↗
                  </a>
                </h3>
                <div className="font-mono text-[11px] text-[#6B7280] mt-0.5">
                  {source.domain} · {source.protocol}
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-[#9CA3AF] leading-relaxed">
                  {source.description}
                </p>

                {/* Filtration Rule Callout */}
                <div className="mt-3.5 rounded border border-[#1E2433] bg-[#07080D] p-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#B8922A] font-bold mb-1">
                    Filtration Rule:
                  </div>
                  <div className="text-[11px] text-[#D1D5DB] leading-relaxed">
                    {source.filtrationRule}
                  </div>
                </div>
              </div>

              {/* Card Footer Telemetry */}
              <div className="mt-4 pt-3 border-t border-[#141722] flex items-center justify-between font-mono text-[10px] text-[#6B7280]">
                <span>{source.tier.split(':')[0]}</span>
                <span>{source.cadence}</span>
                <span className="text-[#4ADE80]">{source.latency}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSources.length === 0 && (
          <div className="rounded border border-[#1A1F2E] bg-[#0A0C14] p-12 text-center font-mono text-xs text-[#6B7280]">
            No monitored sources found matching your active filter criteria.
          </div>
        )}
      </section>

      {/* ── SECTION 2: THE 24-HOUR DAILY CADENCE ENGINE ── */}
      <section className="border-t border-[#1A1E2B] pt-16">
        <div className="border-b border-[#1A1E2B] pb-6 mb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D42535] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D42535]" />
            <span>Operational Runbook &amp; Cadence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#F7F2EE] mt-2">
            The 24-Hour Intelligence Cadence.
          </h2>
          <p className="mt-2 text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
            The automated pipeline that sweeps global markets, executes deterministic screening gates, and delivers verified briefings on an exact, repeatable timetable.
          </p>
        </div>

        {/* Cadence Timeline */}
        <div className="relative border-l border-[#1E2433] ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
          {DAILY_CADENCE_STAGES.map((stage, idx) => (
            <div key={stage.time} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#B8922A] bg-[#07080D] group-hover:bg-[#B8922A] transition-colors" />

              {/* Timestamp Indicator */}
              <div className="md:absolute md:-left-36 md:top-1 font-mono text-xs font-bold text-[#E5C058] tracking-wider mb-1 md:mb-0">
                {stage.time}
              </div>

              {/* Stage Card */}
              <div className="rounded-sm border border-[#1A1E2B] bg-[#0A0C14] p-5 hover:border-[#1E2433] transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#D42535]/30 bg-[#D42535]/10 text-[#F87171] font-bold">
                    {stage.tag}
                  </span>
                  <span className="font-mono text-[10px] text-[#4ADE80]">
                    {stage.status}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#F7F2EE]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
                  {stage.description}
                </p>

                {/* Tooling Tags */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-[#6B7280]">Pipeline:</span>
                  {stage.tooling.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#141722] px-2 py-0.5 font-mono text-[10px] text-[#D1D5DB]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: INGESTION PIPELINE ARCHITECTURE (WHERE IT COMES THROUGH) ── */}
      <section className="border-t border-[#1A1E2B] pt-16">
        <div className="rounded-sm border border-[#1A1E2B] bg-[#0A0C14] p-6 sm:p-8">
          <div className="font-mono text-xs uppercase tracking-widest text-[#4ADE80] font-bold mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            <span>Under The Hood: Ingestion Pipeline Topology</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F7F2EE]">
            How Ingested Data Moves From Raw Feeds to Production
          </h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="rounded border border-[#1E2433] bg-[#07080D] p-4 space-y-2">
              <div className="text-[#E5C058] font-bold">STAGE 1: Ingestion</div>
              <p className="text-[#9CA3AF] text-[11px] leading-relaxed font-sans">
                n8n autonomous workers poll 50+ RSS/FastMCP endpoints every 4 hours, deduplicating against Supabase and pushing validated payloads to <code className="text-[#D1D5DB]">/api/admin/content-radar</code>.
              </p>
            </div>

            <div className="rounded border border-[#1E2433] bg-[#07080D] p-4 space-y-2">
              <div className="text-[#E5C058] font-bold">STAGE 2: Screening Gate</div>
              <p className="text-[#9CA3AF] text-[11px] leading-relaxed font-sans">
                Deterministic LLM evaluation filters for AAOIFI Standard 21 compliance, verifies Isnad scriptural citations, and scores engineering signal over marketing fluff.
              </p>
            </div>

            <div className="rounded border border-[#1E2433] bg-[#07080D] p-4 space-y-2">
              <div className="text-[#E5C058] font-bold">STAGE 3: Human Review</div>
              <p className="text-[#9CA3AF] text-[11px] leading-relaxed font-sans">
                Staged dispatches emit interactive Slack &amp; Telegram cards. Editors review headlines, halal stance labels, and sources before production authorization.
              </p>
            </div>

            <div className="rounded border border-[#1E2433] bg-[#07080D] p-4 space-y-2">
              <div className="text-[#4ADE80] font-bold">STAGE 4: Edge Dispatch</div>
              <p className="text-[#9CA3AF] text-[11px] leading-relaxed font-sans">
                Approved briefings are committed to Supabase <code className="text-[#D1D5DB]">posts</code>, compiled on Vercel Edge, and broadcast to subscribers via Beehiiv and Resend.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
