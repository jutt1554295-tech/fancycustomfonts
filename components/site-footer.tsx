import Link from "next/link";

const exploreLinks = [
  { label: "Fonts", href: "/fonts" },
  { label: "Tools", href: "/tools" },
  { label: "Symbols", href: "/symbols" },
  { label: "Gaming", href: "/gaming" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer premium-footer">
      <div className="premium-footer-glow premium-footer-glow-one" />
      <div className="premium-footer-glow premium-footer-glow-two" />

      <div className="premium-footer-inner">
        <div className="premium-footer-top">
          <div className="premium-footer-brand">
            <Link
              className="premium-footer-logo"
              href="/"
              aria-label="FancyCustomFonts home"
            >
              <span className="premium-footer-mark" aria-hidden="true">
                f
              </span>

              <span className="premium-footer-wordmark">
                FancyCustomFonts
              </span>
            </Link>

            <span className="premium-footer-kicker">
              UNICODE TEXT STUDIO
            </span>

            <h2>
              Make ordinary text
              <br />
              feel{" "}
              <span className="premium-footer-accent">anything but</span>
              <br />
              ordinary.
            </h2>

            <p className="premium-footer-description">
              Stylish Unicode text for bios, usernames, gaming, social media
              and everywhere you share.
            </p>

            <Link className="premium-footer-cta" href="/#generator">
              <span>Create a style</span>
              <span className="premium-footer-cta-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          <div className="premium-footer-nav">
            <div className="premium-footer-column">
              <span className="premium-footer-label">Explore</span>

              <nav aria-label="Explore">
                {exploreLinks.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <span>{item.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="premium-footer-column">
              <span className="premium-footer-label">Company</span>

              <nav aria-label="Company">
                {companyLinks.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <span>{item.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="premium-footer-word-banner" aria-hidden="true">
          <span>FancyCustomFonts</span>
        </div>

        <div className="premium-footer-divider">
          <span />
        </div>

        <div className="premium-footer-bottom">
          <span>© {new Date().getFullYear()} FancyCustomFonts</span>

          <span className="premium-footer-bottom-center">
            Built for creators
          </span>

          <span className="premium-footer-bottom-text">
  Unicode text styles, made simple
</span>
        </div>
      </div>
    </footer>
  );
}