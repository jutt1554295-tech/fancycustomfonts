import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Review the practical terms for using FancyCustomFonts and its Unicode text styling tools.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of Use | FancyCustomFonts", description: "Terms for using the text styles and symbols on FancyCustomFonts.", url: `${siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <div className="page-width">
      <PageHeading current="Terms" href="/terms" title="Terms of use" description="A few clear ground rules for using the FancyCustomFonts tools." />
      <article className="content-copy page-content">
        <p><strong>Last updated: September 30, 2026</strong></p>
        <h2>Using the site</h2>
        <p>You may use this site and its text transformations for lawful personal or business purposes. You are responsible for the text you create, where you use it and for ensuring that it follows the destination service&apos;s rules.</p>
        <h2>Unicode compatibility</h2>
        <p>Generated styles are Unicode characters, not installable fonts. Character support, rendering, accessibility and platform acceptance can differ. We do not guarantee that a particular style will display or be accepted in every app, game, device or assistive technology.</p>
        <h2>Availability and changes</h2>
        <p>The site is provided as available. Features, style collections, or pages may change as the service develops. Do not rely on the site as the sole copy of important text.</p>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent using the contact method listed on the <a href="/contact">Contact page</a>.</p>
      </article>
    </div>
  );
}