import { LanternMasthead } from "@/components/LanternMasthead";

interface OSSRepo {
  name: string;
  description: string;
  category: "ai" | "frontend" | "backend" | "devtools" | "islamic-tech";
  github: string;
  download?: string;
  stars?: string;
  language?: string;
  license: string;
  halal_screened: boolean;
}

const repos: OSSRepo[] = [
  // AI & LLM
  {
    name: "Ollama",
    description: "Run large language models locally. Llama 3, Mistral, Gemma — no cloud required.",
    category: "ai",
    github: "https://github.com/ollama/ollama",
    download: "https://ollama.com/download",
    stars: "97k",
    language: "Go",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "LangChain",
    description: "Framework for building LLM-powered applications with chains, agents, and memory.",
    category: "ai",
    github: "https://github.com/langchain-ai/langchain",
    stars: "95k",
    language: "Python",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "n8n",
    description: "Workflow automation platform. Self-host your AI pipelines and integrations.",
    category: "ai",
    github: "https://github.com/n8n-io/n8n",
    download: "https://n8n.io/get-started",
    stars: "48k",
    language: "TypeScript",
    license: "Sustainable Use",
    halal_screened: true,
  },
  {
    name: "LocalAI",
    description: "Free, open source alternative to OpenAI. Self-hosted, community-driven, no GPU required.",
    category: "ai",
    github: "https://github.com/mudler/LocalAI",
    stars: "24k",
    language: "Go",
    license: "MIT",
    halal_screened: true,
  },
  // Frontend
  {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS. Copy and paste into your apps.",
    category: "frontend",
    github: "https://github.com/shadcn-ui/ui",
    stars: "76k",
    language: "TypeScript",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework. The backbone of most modern web UIs.",
    category: "frontend",
    github: "https://github.com/tailwindlabs/tailwindcss",
    stars: "83k",
    language: "CSS",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "Next.js",
    description: "React framework with App Router, server components, and edge rendering. Production-ready.",
    category: "frontend",
    github: "https://github.com/vercel/next.js",
    stars: "127k",
    language: "TypeScript",
    license: "MIT",
    halal_screened: true,
  },
  // Backend
  {
    name: "Supabase",
    description: "Open source Firebase alternative. Postgres, Auth, Storage, Realtime, Edge Functions.",
    category: "backend",
    github: "https://github.com/supabase/supabase",
    stars: "73k",
    language: "TypeScript",
    license: "Apache 2.0",
    halal_screened: true,
  },
  {
    name: "Hono",
    description: "Ultrafast web framework for the edge. Runs on Cloudflare Workers, Deno, Bun, Node.",
    category: "backend",
    github: "https://github.com/honojs/hono",
    stars: "20k",
    language: "TypeScript",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "Drizzle ORM",
    description: "TypeScript ORM that feels like SQL. Lightweight, type-safe, no magic.",
    category: "backend",
    github: "https://github.com/drizzle-team/drizzle-orm",
    stars: "24k",
    language: "TypeScript",
    license: "Apache 2.0",
    halal_screened: true,
  },
  // DevTools
  {
    name: "Bun",
    description: "All-in-one JavaScript runtime. Faster installs, faster tests, faster builds.",
    category: "devtools",
    github: "https://github.com/oven-sh/bun",
    download: "https://bun.sh",
    stars: "74k",
    language: "Zig",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "Turso (libSQL)",
    description: "SQLite for production. Edge-native, distributed, open source.",
    category: "devtools",
    github: "https://github.com/tursodatabase/libsql",
    stars: "15k",
    language: "Rust",
    license: "MIT",
    halal_screened: true,
  },
  // Islamic Tech
  {
    name: "Quran API",
    description: "Complete Quran data in JSON. All 114 surahs, 6,236 ayahs, 40+ translations.",
    category: "islamic-tech",
    github: "https://github.com/fawazahmed0/quran-api",
    stars: "2.9k",
    language: "JSON",
    license: "Unlicense",
    halal_screened: true,
  },
  {
    name: "Adhan JS",
    description: "Prayer time calculations for JavaScript and TypeScript. Highly accurate, fully offline.",
    category: "islamic-tech",
    github: "https://github.com/batoulapps/adhan-js",
    stars: "1.2k",
    language: "TypeScript",
    license: "MIT",
    halal_screened: true,
  },
  {
    name: "Aladhan API",
    description: "Prayer times, Hijri calendar, Qibla direction. Free public API with generous rate limits.",
    category: "islamic-tech",
    github: "https://github.com/islamic-network/api.aladhan.com",
    stars: "840",
    language: "PHP",
    license: "MIT",
    halal_screened: true,
  },
];

const CATEGORY_META: Record<OSSRepo["category"], { label: string; description: string }> = {
  ai: {
    label: "AI & LLM Tools",
    description: "Models, runtimes, and frameworks for building AI-native products.",
  },
  frontend: {
    label: "Frontend & UI",
    description: "Components, frameworks, and styling tools operators actually ship with.",
  },
  backend: {
    label: "Backend & Infrastructure",
    description: "Databases, ORMs, and server frameworks running in production.",
  },
  devtools: {
    label: "Dev Tools & Runtimes",
    description: "Runtimes, bundlers, and productivity tools for faster builds.",
  },
  "islamic-tech": {
    label: "Islamic Tech",
    description: "Open source data and libraries for building halal digital products.",
  },
};

const CATEGORY_ORDER: OSSRepo["category"][] = [
  "ai",
  "frontend",
  "backend",
  "devtools",
  "islamic-tech",
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Zig: "#ec915c",
  PHP: "#4F5D95",
  CSS: "#563d7c",
  JSON: "#292929",
};

function groupByCategory(list: OSSRepo[]) {
  const groups: Partial<Record<OSSRepo["category"], OSSRepo[]>> = {};
  for (const repo of list) {
    if (!groups[repo.category]) groups[repo.category] = [];
    groups[repo.category]!.push(repo);
  }
  return CATEGORY_ORDER.filter((cat) => groups[cat]?.length).map((cat) => ({
    cat,
    meta: CATEGORY_META[cat],
    repos: groups[cat]!,
  }));
}

function RepoCard({ repo }: { repo: OSSRepo }) {
  const langColor = LANG_COLORS[repo.language ?? ""] ?? "#888";
  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "var(--surface-2)",
              border: "1px solid var(--border-2)",
              display: "grid",
              placeItems: "center",
              fontFamily: "Space Mono, monospace",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--red)",
              flexShrink: 0,
            }}
          >
            {repo.name.slice(0, 2).toUpperCase()}
          </div>
          {repo.stars && (
            <span
              style={{
                fontSize: "11px",
                fontFamily: "Space Mono, monospace",
                color: "var(--muted)",
              }}
            >
              ★ {repo.stars}
            </span>
          )}
        </div>

        {/* Name + description */}
        <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{repo.name}</h4>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.65,
            color: "var(--muted)",
            flex: 1,
            marginBottom: "16px",
          }}
        >
          {repo.description}
        </p>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {repo.language && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: langColor,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                {repo.language}
              </span>
            </span>
          )}
          <span
            style={{
              fontSize: "10px",
              fontFamily: "Space Mono, monospace",
              color: "var(--dim)",
              background: "var(--surface-2)",
              padding: "2px 6px",
              border: "1px solid var(--border-2)",
            }}
          >
            {repo.license}
          </span>
          {repo.halal_screened && (
            <span
              style={{
                fontSize: "10px",
                fontFamily: "Space Mono, monospace",
                color: "#16a34a",
                background: "rgba(22,163,74,0.08)",
                padding: "2px 6px",
                border: "1px solid rgba(22,163,74,0.2)",
              }}
            >
              ✓ HALAL SCREENED
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a
            href={repo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn outline"
            style={{
              fontSize: "11px",
              padding: "7px 14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            ↗ GitHub
          </a>
          {repo.download && (
            <a
              href={repo.download}
              target="_blank"
              rel="noopener noreferrer"
              className="join-button"
              style={{
                fontSize: "11px",
                padding: "7px 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
              }}
            >
              ↓ Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  const sections = groupByCategory(repos);

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          className="card"
          style={{
            padding: "72px 56px 64px",
            borderLeft: "2px solid var(--red)",
            marginBottom: "2px",
          }}
        >
          <div className="kicker" style={{ marginBottom: "20px" }}>
            Open Source Toolkit
          </div>
          <h1
            style={{
              fontSize: "54px",
              lineHeight: 1.05,
              marginBottom: "24px",
              fontFamily: "Georgia, serif",
            }}
          >
            Free. Open. Yours.
          </h1>
          <p
            className="excerpt"
            style={{ fontSize: "18px", maxWidth: "560px", marginBottom: "36px" }}
          >
            Curated open source repos for operators building AI-native products.
            All free. All linkable. Halal-screened where applicable.
          </p>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            {repos.length} REPOS · 5 CATEGORIES · CURATED BY THE LANTERN
          </div>
        </section>

        {/* ── CATEGORY NAV ─────────────────────────────────── */}
        <section style={{ display: "flex", gap: "2px", marginBottom: "2px", flexWrap: "wrap" }}>
          {sections.map(({ cat, meta }) => (
            <a
              key={cat}
              href={`#${cat}`}
              style={{
                flex: "1 1 auto",
                textDecoration: "none",
                color: "inherit",
                minWidth: "140px",
              }}
            >
              <div
                className="card"
                style={{
                  padding: "20px 24px",
                  borderTop: "2px solid var(--red)",
                  cursor: "pointer",
                }}
              >
                <div className="kicker" style={{ marginBottom: "6px", fontSize: "9px" }}>
                  {meta.label}
                </div>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--red)",
                  }}
                >
                  {repos.filter((r) => r.category === cat).length}
                </div>
              </div>
            </a>
          ))}
        </section>

        {/* ── REPO SECTIONS ────────────────────────────────── */}
        {sections.map(({ cat, meta, repos: sectionRepos }) => (
          <section key={cat} id={cat} style={{ marginBottom: "2px" }}>
            <div
              style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2px" }}
            >
              {/* Category label */}
              <div
                className="card"
                style={{
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: "2px solid var(--red)",
                }}
              >
                <div className="kicker" style={{ marginBottom: "10px" }}>
                  {meta.label}
                </div>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--muted)" }}>
                  {meta.description}
                </p>
              </div>

              {/* Repo grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2px",
                }}
              >
                {sectionRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── SUBMIT CTA ───────────────────────────────────── */}
        <section
          className="card"
          style={{ padding: "56px", textAlign: "center", margin: "2px 0" }}
        >
          <div className="kicker" style={{ marginBottom: "16px" }}>
            Know a repo we should add?
          </div>
          <h2 style={{ fontSize: "34px", marginBottom: "16px" }}>
            Help us grow the toolkit.
          </h2>
          <p
            className="excerpt"
            style={{ maxWidth: "480px", margin: "0 auto 32px" }}
          >
            Built something operators should discover? Found a gap in the list?
            Submit it — we review and add manually.
          </p>
          <a
            href="mailto:build@thelanterndaily.com?subject=OSS%20Repo%20Submission"
            className="join-button"
            style={{ display: "inline-block", textDecoration: "none" }}
          >
            Submit a repo →
          </a>
        </section>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <footer className="footer">
          <div className="footer-bottom">
            <span>© 2026 By Red, LLC · thelanterndaily.com</span>
            <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
