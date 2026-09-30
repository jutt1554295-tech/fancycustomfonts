import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact FancyCustomFonts",
  description: "Contact FancyCustomFonts with a question, accessibility note, or suggestion for the Unicode text tools.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact FancyCustomFonts", description: "Send feedback or a question about the text tools.", url: `${siteUrl}/contact` },
};

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_EMAIL;

  return (
    <div className="page-width">
      <PageHeading current="Contact" href="/contact" title="Say hello" description="Found a character that does not display properly, have an accessibility suggestion, or want to share an idea? We would like to hear from you." />
      <article className="content-copy page-content">
        <h2>Reach the FancyCustomFonts team</h2>
        {contactEmail ? (
          <p>Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with your question or feedback. For a display issue, include the style name, the app or device where you saw it and (if useful) the characters involved. Please do not include private text or account credentials.</p>
        ) : (
          <p>A monitored contact inbox has not been configured for this starter build. Set the <code>CONTACT_EMAIL</code> environment variable before launch to publish an email link here. This site does not currently accept or transmit contact form submissions.</p>
        )}
        <h2>What to expect</h2>
        <p>This is a starter contact route, not a support portal. Messages are handled by email; there is no contact form or account system on this site.</p>
      </article>
    </div>
  );
}