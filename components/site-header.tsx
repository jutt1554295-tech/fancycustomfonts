"use client";

import Link from "next/link";
import { AppearanceControl } from "@/components/appearance-control";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner glass-panel">
        <Link className="brand" href="/" aria-label="FancyCustomFonts home">
          <span className="brand-mark" aria-hidden="true">f</span>
          <span>FancyCustomFonts</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <Link className="header-cta" href="/#generator">
          Create a style <span aria-hidden="true">↗</span>
        </Link>
        <AppearanceControl />
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><span /><span /></summary>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}