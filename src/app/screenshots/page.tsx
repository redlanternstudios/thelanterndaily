import Image from "next/image";
import Link from "next/link";

const SCREENSHOTS = [
  { file: "01-desktop-hero.png", label: "Homepage — Hero (Desktop)", section: "Homepage" },
  { file: "02-desktop-grid-row1.png", label: "Homepage — Content Grid Row 1 (Desktop)", section: "Homepage" },
  { file: "03-desktop-grid-row2.png", label: "Homepage — Content Grid Row 2 (Desktop)", section: "Homepage" },
  { file: "04-desktop-grid-row3.png", label: "Homepage — Content Grid Row 3 (Desktop)", section: "Homepage" },
  { file: "05-desktop-footer.png", label: "Homepage — Footer (Desktop)", section: "Homepage" },
  { file: "06-desktop-markets.png", label: "Markets Page (Desktop)", section: "Markets" },
  { file: "07-desktop-about.png", label: "About Page (Desktop)", section: "About" },
  { file: "08-desktop-archive.png", label: "Archive Page (Desktop)", section: "Archive" },
  { file: "09-desktop-stack.png", label: "Stack Page (Desktop)", section: "Stack" },
  { file: "10-mobile-hero.png", label: "Homepage — Hero (Mobile)", section: "Mobile" },
  { file: "11-mobile-grid.png", label: "Homepage — Grid Row 1 (Mobile)", section: "Mobile" },
  { file: "12-mobile-grid2.png", label: "Homepage — Grid Row 2 (Mobile)", section: "Mobile" },
  { file: "13-mobile-footer.png", label: "Homepage — Footer (Mobile)", section: "Mobile" },
  { file: "14-mobile-markets.png", label: "Markets Page (Mobile)", section: "Mobile" },
  { file: "15-desktop-search-open.png", label: "Search Bar — Open State", section: "Interactions" },
];

const SECTIONS = ["Homepage", "Markets", "About", "Archive", "Stack", "Mobile", "Interactions"];

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
                  gridTemplateColumns: section === "Mobile" ? "repeat(auto-fill, minmax(280px, 1fr))" : "repeat(auto-fill, minmax(520px, 1fr))",
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
                          aspectRatio: section === "Mobile" ? "9/19" : "16/9",
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
