import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default mt-16 py-12">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🏳</span>
              <span className="font-heading font-bold text-lg">
                The Lantern <span className="text-accent-gold">Daily</span>
              </span>
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Signal before consensus. Curated intelligence for the clear-minded.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: '/archive', label: 'Archive' },
                { href: '/shorts', label: 'Shorts' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Categories</h4>
            <ul className="space-y-2">
              {['Markets', 'Policy', 'Tech', 'Geopolitics'].map((cat) => (
                <li key={cat}>
                  <span className="text-sm text-text-secondary">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {currentYear} RedLantern Studios. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary">
            Signal before consensus.
          </p>
        </div>
      </div>
    </footer>
  );
}