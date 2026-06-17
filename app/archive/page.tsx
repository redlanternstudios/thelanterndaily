import { LanternMasthead } from "@/components/LanternMasthead";
import { getApprovedContent } from "@/lib/lantern/queries";
import { ArchiveGrid } from "./ArchiveGrid";

export const revalidate = 300; // revalidate every 5 minutes

export default async function ArchivePage() {
  const articles = await getApprovedContent(200);

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── PAGE HEADER ────────────────────────────────────────── */}
        <header style={{ padding: "48px 0 40px", borderBottom: "1px solid var(--border)" }}>
          <div className="kicker" style={{ marginBottom: "12px" }}>
            Intelligence Archive
          </div>
          <h1 style={{ marginBottom: "16px" }}>Every signal we&apos;ve published.</h1>
          <p className="excerpt" style={{ maxWidth: "560px" }}>
            Searchable, filterable, and fully indexed. Muslim-built. AI-native.
            Signal over noise since 2025.
          </p>
        </header>

        {/* ── FILTER + GRID (client) ──────────────────────────────── */}
        <ArchiveGrid articles={articles} />

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer className="footer">
          <div className="footer-bottom">
            <span>© 2026 By Red, LLC</span>
            <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
