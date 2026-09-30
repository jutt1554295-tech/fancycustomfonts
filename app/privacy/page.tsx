import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how FancyCustomFonts handles text entered into the browser-based generator and what to expect from the site.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy | FancyCustomFonts", description: "How the browser-based text tools handle your information.", url: `${siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="page-width">
      <PageHeading current="Privacy" href="/privacy" title="Privacy policy" description="A plain-language overview of what happens when you use FancyCustomFonts." />
      <article className="content-copy page-content">
        <p><strong>Last updated: September 30, 2026</strong></p>
        <h2>Text you enter</h2>
        <p>The text generator transforms the text you enter in your browser. This starter version does not submit generator text to a FancyCustomFonts backend, store it in an account, or send it to an API. Copying uses your browser’s clipboard permission.</p>
        <h2>Site operations</h2>
        <p>When hosted, the infrastructure provider may process standard request information such as an IP address, browser details and requested page in server logs to deliver and protect the site. The exact retention and handling depend on the hosting provider used for deployment.</p>
        <h2>Cookies and advertising</h2>
        <p>This version does not include analytics, account cookies or advertising network scripts. Ads are not currently displayed. If analytics or advertising are added later, this policy should be updated to describe those services and any consent choices before they are enabled.</p>
        <h2>External services and links</h2>
        <p>Links to other websites are governed by their own privacy practices. We do not control their content or data handling.</p>
        <h2>Changes and questions</h2>
        <p>This policy may change as the site develops. For privacy questions, use the contact method listed on the <a href="/contact">Contact page</a>.</p>
      </article>
    </div>
  );
}