"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppearanceControl } from "@/components/appearance-control";

const mainNavigation = [
  {
    label: "Home",
    href: "/",
    icon: "⌂",
  },
  {
    label: "Font",
    href: "/fonts",
    icon: "ƒ",
  },
  {
    label: "Symbols",
    href: "/symbols",
    icon: "✦",
  },
  
];

export function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    const path = href.split("#")[0] || "/";

    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  }

  return (
    <header className="site-header">
      <div className="header-inner glass-panel">
        <Link
          className="brand"
          href="/"
          aria-label="FancyCustomFonts home"
        >
          <span className="brand-mark" aria-hidden="true">
            f
          </span>

          <span>FancyCustomFonts</span>
        </Link>

        <nav className="desktop-nav creative-nav" aria-label="Main navigation">
          {mainNavigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-dock-item ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="nav-dock-icon" aria-hidden="true">
                  {item.icon}
                </span>

                <span className="nav-dock-label">
                  {item.label}
                </span>

                {active && (
                  <span className="nav-dock-bubble" aria-hidden="true">
                    <span className="nav-dock-bubble-light" />
                    <span className="nav-dock-bubble-dot" />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <AppearanceControl />

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
          </summary>

          <nav className="mobile-nav creative-mobile-nav" aria-label="Main navigation">
            {mainNavigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={active ? "is-active" : ""}
                  aria-current={active ? "page" : undefined}
                  onClick={(event) =>
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open")
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </details>
      </div>
    </header>
  );
}