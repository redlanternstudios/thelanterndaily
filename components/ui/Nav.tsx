import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080C]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#D7262E] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">TL</span>
          </div>
          <span className="text-white text-sm font-bold tracking-wide">
            THE LANTERN
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/archive"
            className="text-[#6B6B72] text-xs tracking-wide hover:text-white transition-colors uppercase"
          >
            The Archive
          </Link>
          <Link
            href="/stack"
            className="text-[#6B6B72] text-xs tracking-wide hover:text-white transition-colors uppercase"
          >
            The Stack
          </Link>
          <Link
            href="/about"
            className="text-[#6B6B72] text-xs tracking-wide hover:text-white transition-colors uppercase"
          >
            About
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/#subscribe"
          className="bg-[#D7262E] text-white text-xs font-semibold px-4 py-2 hover:opacity-90 transition-opacity"
        >
          Join operators →
        </Link>
      </div>
    </header>
  );
}
