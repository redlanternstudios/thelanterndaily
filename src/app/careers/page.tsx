import React from 'react';
import Link from 'next/link';
import Masthead from '@/components/Masthead';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Careers & Sovereign Opportunities | The Lantern Daily',
  description: 'High-impact remote AI operations, autonomous engineering, and workflow systems roles across Penn Enterprises LLC and our partner network.',
};

interface JobRole {
  id: string;
  title: string;
  department: string;
  compensation: string;
  location: string;
  type: string;
  description: string;
  stack: string[];
  responsibilities: string[];
}

const ROLES: JobRole[] = [
  {
    id: 'ai-ops-lead',
    title: 'Lead AI Operations & Workflow Engineer',
    department: 'Autonomous Systems',
    compensation: '$110,000 – $145,000 + Equity',
    location: '100% US Remote / Global',
    type: 'Full-Time',
    description: 'Design, build, and maintain production-grade n8n, Make, and FastMCP agent workflows. You will own the execution pipeline that takes unstructured briefs and converts them into production-ready software and intelligence briefings.',
    stack: ['n8n', 'Python Playwright', 'FastMCP', 'Gemini Flash', 'Claude Sonnet', 'Supabase'],
    responsibilities: [
      'Architect resilient 7-stage autonomous agent governance chains with deterministic evaluation gates.',
      'Deploy and self-host n8n workflows with automatic error recovery and fail-closed security invariants.',
      'Build API bridges between CRM, Slack routers, and client databases.',
    ],
  },
  {
    id: 'halal-fintech-eng',
    title: 'Sovereign FinTech & Protocol Engineer',
    department: 'Markets & Capital',
    compensation: '$120,000 – $155,000',
    location: '100% Remote',
    type: 'Full-Time',
    description: 'Develop automated equity screening engines implementing AAOIFI Standard 21, programmable on-chain settlement mechanisms, and algorithmic verification systems for interest-free finance.',
    stack: ['TypeScript', 'Next.js 15', 'PostgreSQL', 'Python', 'Financial APIs'],
    responsibilities: [
      'Maintain real-time financial screening pipelines comparing market cap against interest-bearing debt.',
      'Integrate data pipelines connecting public tickers with authentic compliance benchmarks.',
      'Ensure zero computational leakage of interest-adjacent growth tracking.',
    ],
  },
  {
    id: 'solutions-architect',
    title: 'Enterprise AI Solutions Architect',
    department: 'Penn Enterprises Client Services',
    compensation: '$105,000 – $135,000 + Performance Bonus',
    location: '100% Remote',
    type: 'Full-Time',
    description: 'Interface directly with high-ticket commercial clients to conduct automation audits, deconstruct manual bottlenecks to their physics floor, and orchestrate turnkey agent implementations.',
    stack: ['AI Workflow Architecture', 'Client Discovery', 'API Integrations', 'System Architecture'],
    responsibilities: [
      'Conduct 60-minute technical client audits and produce architectural blueprint specifications.',
      'Manage multi-agent dispatching and deliver empirical verification reports before client handoff.',
      'Bridge business requirements into deterministic engineering workflows.',
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <Masthead />
      <Ticker />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <header className="border-b border-[#1A1F2E] pb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8922A]/40 bg-[#B8922A]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#B8922A]">
            <span>✦</span>
            <span>Penn Enterprises & Partner Network</span>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-5xl">
            Sovereign Careers & AI Ops.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg">
            We do not build toy chatbots or derivative SaaS wrappers. We build autonomous enterprise pipelines, sovereign compute infrastructure, and principled financial rails.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#D1D5DB]">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              $100K+ Base Compensation Floor
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#B8922A]" />
              100% Remote Global Mobility
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D92532]" />
              Principled & Riba-Free
            </span>
          </div>
        </header>

        {/* Roles Section */}
        <section className="mt-12 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
              Open Production Roles
            </h2>
            <span className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
              3 Positions Available
            </span>
          </div>

          <div className="space-y-6">
            {ROLES.map((role) => (
              <div
                key={role.id}
                className="group rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-6 transition-all hover:border-[#B8922A]/60 hover:shadow-xl sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2.5 text-xs font-mono">
                      <span className="rounded bg-[#1A1F2E] px-2.5 py-0.5 text-[#B8922A]">
                        {role.department}
                      </span>
                      <span className="text-[#6B7280]">·</span>
                      <span className="text-[#9CA3AF]">{role.location}</span>
                      <span className="text-[#6B7280]">·</span>
                      <span className="text-[#4ADE80]">{role.type}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#F7F2EE] group-hover:text-white sm:text-2xl">
                      {role.title}
                    </h3>

                    <p className="mt-1 font-mono text-sm font-semibold text-[#E5C058]">
                      {role.compensation}
                    </p>
                  </div>

                  <a
                    href="mailto:careers@thelanterndaily.com?subject=Application:%20"
                    className="inline-flex items-center justify-center rounded bg-[#D42535] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#b01e2c]"
                  >
                    Apply Now →
                  </a>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
                  {role.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#6B7280]">Core Stack:</span>
                  {role.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-[#1F2430] bg-[#12151D] px-2.5 py-0.5 font-mono text-[11px] text-[#D1D5DB]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Responsibilities */}
                <div className="mt-5 border-t border-[#1F2430] pt-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF] block mb-2 font-semibold">
                    Key Outcomes:
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#D1D5DB] list-disc list-inside">
                    {role.responsibilities.map((r, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Talent Network Banner */}
        <section className="mt-16 rounded-xl border border-[#B8922A]/40 bg-[#12151D] p-8 text-center sm:p-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#B8922A] font-bold block mb-2">
            ✦ Sovereign Talent Roster
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#F7F2EE] sm:text-3xl">
            Don&apos;t see an exact match?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#9CA3AF]">
            We are always scouting high-agency builders, prompt engineers, and workflow architects who operate with first-principles discipline. Submit your portfolio to join our private talent radar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:talent@pennenterpriseshq.com"
              className="inline-flex items-center gap-2 rounded border border-[#B8922A] bg-[#B8922A]/20 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#F7F2EE] hover:bg-[#B8922A] hover:text-black transition-all"
            >
              <span>Submit Portfolio to Talent Radar</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
