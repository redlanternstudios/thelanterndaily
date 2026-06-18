import Image from "next/image";
import Link from "next/link";

const SCREENSHOTS = [
  // Homepage — Desktop
  { file: "01-home-nav.png",          label: "Nav — dark theme, logo, search",         section: "Homepage — Desktop" },
  { file: "02-home-hero.png",         label: "Hero — AI Infrastructure lead story",     section: "Homepage — Desktop" },
  { file: "03-home-grid-row1.png",    label: "Grid — video card + markets + tech",      section: "Homepage — Desktop" },
  { file: "04-home-grid-row2.png",    label: "Grid — 4-col article row",                section: "Homepage — Desktop" },
  { file: "05-home-grid-row3.png",    label: "Grid — bottom article row",               section: "Homepage — Desktop" },
  { file: "06-home-footer.png",       label: "Footer — newsletter + links",             section: "Homepage — Desktop" },
  // Interactions
  { file: "15-search-open.png",       label: "Search bar — expanded inline state",      section: "Interactions" },
  // Markets
  { file: "07-markets-top.png",       label: "Markets — top section",                   section: "Markets" },
  { file: "08-markets-bottom.png",    label: "Markets — signals list",                  section: "Markets" },
  // About
  { file: "09-about-top.png",         label: "About — masthead and mission",            section: "About" },
  { file: "10-about-bottom.png",      label: "About — team and links",                  section: "About" },
  // Archive
  { file: "11-archive-top.png",       label: "Archive — article index top",             section: "Archive" },
  { file: "12-archive-bottom.png",    label: "Archive — article index bottom",          section: "Archive" },
  // Stack
  { file: "13-stack-top.png",         label: "Stack — tools and infrastructure top",    section: "Stack" },
  { file: "14-stack-bottom.png",      label: "Stack — tools and infrastructure bottom", section: "Stack" },
  // Mobile
  { file: "16-mobile-home-nav.png",   label: "Mobile — nav bar",                        section: "Mobile" },
  { file: "17-mobile-home-hero.png",  label: "Mobile — hero stacked layout",            section: "Mobile" },
  { file: "18-mobile-home-grid.png",  label: "Mobile — grid row 1",                     section: "Mobile" },
  { file: "19-mobile-home-grid2.png", label: "Mobile — grid row 2",                     section: "Mobile" },
  { file: "20-mobile-home-footer.png",label: "Mobile — footer",                         section: "Mobile" },
  { file: "21-mobile-markets.png",    label: "Mobile — markets page",                   section: "Mobile" },
  // Tablet
  { file: "22-tablet-home-hero.png",  label: "Tablet — hero 2-col layout",              section: "Tablet" },
  { file: "23-tablet-home-grid.png",  label: "Tablet — 2-col article grid",             section: "Tablet" },
];

const SECTIONS = ["Homepage — Desktop", "Interactions", "Markets", "About", "Archive", "Stack", "Mobile", "Tablet"];

export default function ScreenshotsPage() {
  return (
    <main style={{ background: "#07080F", minHeight: "100vh", padding: "60px 40px" }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11,
              color: "#9CA3AF",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ← Back to site
          </Link>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 36,
              fontWeight: 700,
              color: "#F7F2EE",
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            UI Screenshot Showcase
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 14, fontFamily: "var(--font-jetbrains), monospace" }}>
            The Lantern Daily — thelanterndaily.com — {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 8, fontFamily: "var(--font-jetbrains), monospace" }}>
            {SCREENSHOTS.length} screens across {SECTIONS.length} sections
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => {
          const items = SCREENSHOTS.filter((s) => s.section === section);
          if (!items.length) return null;
          return (
            <div key={section} style={{ marginBottom: 72 }}>
              {/* Section header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 28,
                  paddingBottom: 12,
                  borderBottom: "1px solid #1A1F2E",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#D42535",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {section}
                </span>
                <span style={{ color: "#1A1F2E", fontSize: 12 }}>
                  {items.length} screen{items.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Grid of screenshots */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: (section === "Mobile" || section === "Tablet") ? "repeat(auto-fill, minmax(280px, 1fr))" : "repeat(auto-fill, minmax(520px, 1fr))",
                  gap: 24,
                }}
              >
                {items.map((s) => (
                  <div key={s.file} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <a
                      href={`/screenshots/${s.file}`}
                      download={s.file}
                      style={{ display: "block", textDecoration: "none" }}
                      title={`Download ${s.label}`}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: section === "Mobile" ? "9/19" : section === "Tablet" ? "3/4" : "16/9",
                          background: "#0D0F1C",
                          border: "1px solid #1A1F2E",
                          overflow: "hidden",
                          borderRadius: 4,
                          transition: "border-color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#D42535")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#1A1F2E")}
                      >
                        <Image
                          src={`/screenshots/${s.file}`}
                          alt={s.label}
                          fill
                          style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                        {/* Download overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(7,8,15,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.2s",
                          }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}
                        >
                          <span
                            style={{
                              background: "#D42535",
                              color: "#fff",
                              fontFamily: "var(--font-jetbrains), monospace",
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              padding: "8px 16px",
                            }}
                          >
                            Download
                          </span>
                        </div>
                      </div>
                    </a>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains), monospace",
                          fontSize: 11,
                          color: "#9CA3AF",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {s.label}
                      </span>
                      <a
                        href={`/screenshots/${s.file}`}
                        download={s.file}
                        style={{
                          fontFamily: "var(--font-jetbrains), monospace",
                          fontSize: 10,
                          color: "#D42535",
                          textDecoration: "none",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          flexShrink: 0,
                        }}
                      >
                        ↓ PNG
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
