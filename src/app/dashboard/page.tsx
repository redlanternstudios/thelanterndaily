import Image from "next/image";
import DashSidebar from "@/components/dashboard/DashSidebar";
import { HERO_ARTICLE, GRID_ARTICLES } from "@/lib/content";

const KPIS = [
  { label: "Subscribers", value: "18,704", change: "+232 this week", up: true },
  { label: "Open Rate", value: "62.4%", change: "+1.8 pts", up: true },
  { label: "MRR", value: "$24,180", change: "+4.1%", up: true },
  { label: "Churn", value: "1.2%", change: "-0.3 pts", up: true },
];

const QUEUE = [
  { title: "Islamic Finance Meets On-Chain Settlement", status: "Scheduled", when: "Tomorrow · 7:00 AM" },
  { title: "The Late-Night Build Log", status: "In review", when: "Editing" },
  { title: "Signals From the Gulf", status: "Draft", when: "Assigned to Tariq" },
  { title: "The Governance Layer Nobody Wants", status: "Draft", when: "Assigned to Mariam" },
];

const ANALYTICS = [
  { label: "Top source", value: "Direct / Newsletter", sub: "48% of traffic" },
  { label: "Best dispatch", value: "Muslim-Built AI Infra", sub: "9,204 reads" },
  { label: "Avg. read time", value: "6m 41s", sub: "+12s vs last month" },
];

function StatusPill({ status }: { status: string }) {
  const color =
    status === "Scheduled"
      ? "text-[var(--color-blue)] border-[var(--color-blue)]"
      : status === "In review"
        ? "text-[var(--color-red)] border-[var(--color-red)]"
        : "text-[var(--color-text-dim)] border-[var(--color-border)]";
  return (
    <span className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${color}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex">
      <DashSidebar />
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-6 sm:px-8 py-5">
          <div>
            <h1 className="font-headline text-2xl text-[var(--color-text)]">Overview</h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-dim)] mt-1">
              Good morning, Layla · Saturday, 14 June
            </p>
          </div>
          <button className="bg-[var(--color-red)] px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-text)] hover:opacity-90 transition-opacity">
            New dispatch
          </button>
        </header>

        <div className="p-6 sm:p-8 flex flex-col gap-0.5">
          {/* KPI cards */}
          <div className="grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
            {KPIS.map((kpi) => (
              <div key={kpi.label} className="bg-[var(--color-card)] p-6">
                <p className="label-mono">{kpi.label}</p>
                <p className="font-headline text-4xl mt-2 text-[var(--color-text)]">
                  {kpi.value}
                </p>
                <p
                  className={`mt-2 font-mono text-[11px] uppercase tracking-[0.1em] ${
                    kpi.up ? "text-[var(--color-blue)]" : "text-[var(--color-red)]"
                  }`}
                >
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>

          {/* Featured + Queue */}
          <div className="grid gap-0.5 bg-[var(--color-border)] mt-0.5 lg:grid-cols-[1fr_1fr]">
            {/* Featured */}
            <div className="bg-[var(--color-card)] p-6">
              <p className="label-mono mb-4">Featured article</p>
              <div className="img-zoom relative aspect-[16/9] w-full bg-[var(--color-bg)] overflow-hidden">
                <Image
                  src={HERO_ARTICLE.image || "/placeholder.svg"}
                  alt={HERO_ARTICLE.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <span className="kicker mt-4 block">{HERO_ARTICLE.kicker}</span>
              <h2 className="font-headline text-2xl mt-2 text-[var(--color-text)] text-balance">
                {HERO_ARTICLE.title}
              </h2>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="font-headline text-2xl text-[var(--color-text)]">9,204</p>
                  <p className="label-mono">Reads</p>
                </div>
                <div>
                  <p className="font-headline text-2xl text-[var(--color-text)]">71%</p>
                  <p className="label-mono">Completion</p>
                </div>
                <div>
                  <p className="font-headline text-2xl text-[var(--color-text)]">312</p>
                  <p className="label-mono">Shares</p>
                </div>
              </div>
            </div>

            {/* Queue */}
            <div className="bg-[var(--color-card)] p-6">
              <p className="label-mono mb-4">Publishing queue</p>
              <ul className="flex flex-col">
                {QUEUE.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center justify-between gap-4 border-t border-[var(--color-border-soft)] py-4 first:border-0 first:pt-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-[var(--color-text)] truncate">{item.title}</p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)] mt-1">
                        {item.when}
                      </p>
                    </div>
                    <StatusPill status={item.status} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Analytics row */}
          <div className="grid gap-0.5 bg-[var(--color-border)] mt-0.5 sm:grid-cols-3">
            {ANALYTICS.map((a) => (
              <div key={a.label} className="bg-[var(--color-card)] p-6">
                <p className="label-mono">{a.label}</p>
                <p className="font-headline text-xl mt-2 text-[var(--color-text)] text-balance">
                  {a.value}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-dim)]">{a.sub}</p>
              </div>
            ))}
          </div>

          {/* Recent dispatches table */}
          <div className="bg-[var(--color-card)] p-6 mt-0.5">
            <p className="label-mono mb-4">Recent dispatches</p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="label-mono py-2 font-normal">Title</th>
                  <th className="label-mono py-2 font-normal hidden sm:table-cell">Author</th>
                  <th className="label-mono py-2 font-normal text-right">Reads</th>
                </tr>
              </thead>
              <tbody>
                {GRID_ARTICLES.map((a, i) => (
                  <tr key={a.slug} className="border-t border-[var(--color-border-soft)]">
                    <td className="py-3 text-sm text-[var(--color-text)] pr-4">{a.title}</td>
                    <td className="py-3 text-sm text-[var(--color-text-dim)] hidden sm:table-cell">
                      {a.author}
                    </td>
                    <td className="py-3 text-right font-mono text-sm text-[var(--color-text)]">
                      {(8200 - i * 1340).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
