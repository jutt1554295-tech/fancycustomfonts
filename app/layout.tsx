import type { Metadata } from "next";

import { AppearanceProvider } from "@/components/appearance-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "FancyCustomFonts | Stylish Text Generator",
    template: "%s | FancyCustomFonts",
  },

  description:
    "Turn ordinary text into stylish Unicode text for bios, usernames, gaming and messages. Browse 149+ copy-ready text styles for free.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "FancyCustomFonts",
    title: "FancyCustomFonts | Stylish Text Generator",
    description:
      "Turn ordinary text into stylish Unicode text for bios, usernames, gaming and messages.",
    url: siteUrl,
  },

  twitter: {
    card: "summary_large_image",
    title: "FancyCustomFonts | Stylish Text Generator",
    description:
      "Turn ordinary text into stylish Unicode text for bios, usernames, gaming and messages.",
  },

  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en">
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