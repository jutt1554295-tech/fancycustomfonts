
import type { Metadata } from "next";

import { AppearanceProvider } from "@/components/appearance-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  verification: {
    google: "q0wdrAzQ5GTSVmEXnxJGKY874q15sUYuTvcKztm4HfA",
  },

  title: {
    default: "FancyCustomFonts | Stylish Text Generator",
    template: "%s | FancyCustomFonts",
  },

  description:
    "Turn ordinary text into stylish Unicode text for bios, usernames, gaming and messages. Explore copy-ready text styles for free.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
  type: "website",
  siteName: "FancyCustomFonts",
  title: "FancyCustomFonts | Stylish Text Generator",
  description:
    "Turn ordinary text into stylish Unicode text for bios, usernames, gaming and messages.",
  url: "/",
  images: [
    {
      url: "/og-logo.png",
      width: 1254,
      height: 1254,
      alt: "FancyCustomFonts Logo",
    },
  ],
},

  twitter: {
  card: "summary_large_image",
  title: "FancyCustomFonts | Stylish Text Generator",
  description:
    "Turn ordinary text into stylish Unicode text for bios, usernames, gaming and messages.",
  images: ["/og-logo.png"],
},

  icons: {
  icon: "/og-logo.png",
  shortcut: "/og-logo.png",
  apple: "/og-logo.png",
},
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AppearanceProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>

          <SiteHeader />

          <main id="main-content">
            {children}
          </main>

          <SiteFooter />
        </AppearanceProvider>
      </body>
    </html>
  );
}
