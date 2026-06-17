"use client";

export function LanternLogoText() {
  return (
    <div>
      <div className="brand-title">
        <span>The </span>
        <span className="text-red">Lantern</span>
        <span> D</span>
        <span className="text-red">AI</span>
        <span>LY</span>
      </div>
      {/* No publisher attribution — Ummah-first: The Lantern Daily stands alone */}
    </div>
  );
}

export function LanternMasthead() {
  return (
    <>
      <header className="masthead">
        <a href="/" aria-label="The Lantern Daily home">
          <LanternLogoText />
        </a>
        <nav className="nav-links">
          <a href="/">Today</a>
          <a href="/stack">Stack</a>
          <a href="/archive">Archive</a>
          <a href="/about">About</a>
        </nav>
        <a href="/#subscribe" className="join-button">Join →</a>
      </header>
      <div className="editorial-ticker">
        <span>
          AI INFRASTRUCTURE · HALAL FINTECH · OPEN SOURCE AGENTS · OPERATOR STACK · MUSLIM-BUILT TECH · FIELD NOTES · MARKET SIGNALS · FOUNDER INTELLIGENCE · GOVERNANCE · PRODUCT CALLS · AI INFRASTRUCTURE · HALAL FINTECH · OPEN SOURCE AGENTS · OPERATOR STACK · MUSLIM-BUILT TECH · FIELD NOTES · MARKET SIGNALS · FOUNDER INTELLIGENCE · GOVERNANCE · PRODUCT CALLS ·
        </span>
      </div>
    </>
  );
}
