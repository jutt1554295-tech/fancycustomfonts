import Link from "next/link";

const footerLinks = [
  { label: "Fonts", href: "/fonts" },
  { label: "Tools", href: "/tools" },
  { label: "Symbols", href: "/symbols" },
  { label: "Gaming", href: "/gaming" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">f</span>
            <span>FancyCustomFonts</span>
          </Link>
          <p>Words with a little more personality</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FancyCustomFonts</span>
        <span>Unicode text styles, made simple</span>
      </div>
    </footer>
  );
}