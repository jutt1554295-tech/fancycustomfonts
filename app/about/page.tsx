import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About FancyCustomFonts",
  description: "Learn why FancyCustomFonts exists and how its browser-based Unicode text styling works.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About FancyCustomFonts", description: "A simple place to explore and copy Unicode text styles.", url: `${siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <div className="page-width">
      <PageHeading current="About" href="/about" title="A little more character in a few clicks" description="FancyCustomFonts is a browser-based place to turn everyday text into styles you can copy and use across your digital life." />
      <article className="content-copy page-content">
        <h2>Made for words you want to share</h2>
        <p>Sometimes a profile name, message, or gaming tag needs a different feel. FancyCustomFonts brings a broad set of Unicode text transformations and copy-ready symbols together in one simple workspace.</p>
        <h2>How it works</h2>
        <p>The generator maps supported characters to related characters in Unicode. It runs in your browser, so you can preview styles as you type without an account, an API call, or a font download. Characters without an equivalent are kept as they are.</p>
        <h2>Designed to be useful</h2>
        <p>We aim to make browsing, previewing and copying straightforward on desktop and mobile. Unicode support differs between apps and devices, so a style may not look identical everywhere. We recommend checking important text in its final destination.</p>
        <h2>Get in touch</h2>
        <p>Questions or feedback are welcome on our <a href="/contact">contact page</a>.</p>
      </article>
    </div>
  );
}