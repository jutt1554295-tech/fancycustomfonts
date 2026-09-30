import type { Metadata } from "next";
import { FontsBrowser } from "@/components/fonts-browser";
import { PageHeading } from "@/components/page-heading";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fancy Fonts: Browse 149+ Unicode Text Styles",
  description: "Explore bold, cursive, gothic, small caps, circled and decorative Unicode text styles. Search, preview and copy fancy text for free.",
  alternates: { canonical: "/fonts" },
  openGraph: { title: "Fancy Fonts | FancyCustomFonts", description: "Explore and copy 149+ Unicode text styles.", url: `${siteUrl}/fonts` },
};

export default function FontsPage() {
  return (
    <div className="page-width fonts-page">
      <PageHeading
        current="Fonts"
        href="/fonts"
        title="Fancy Fonts"
        description="Browse Unicode text styles for profiles, captions, messages and games. Enter your own words, filter by category and copy a live preview that is ready to paste."
      />
      <div className="page-content">
        <FontsBrowser />
        <article className="content-copy">
          <h2>Unicode text styles</h2>
          <p>Unicode Styles converts supported letters and numbers into related Unicode characters. These copyable text transformations are not traditional web fonts and do not require an installation. Character support and appearance can vary across apps and devices.</p>
          <h2>Real font previews</h2>
          <p>Real Fonts renders your unchanged text with a selected font family when a licensed web-font file is available. This project includes a catalog and fallback stacks, but no font binaries; previews use the fallback until a properly licensed file is added. Copying from this tab copies your original text, not a font file.</p>
          <h2>Choose a style that travels well</h2>
          <p>Bold and italic alphabets are useful when you want emphasis, while script, small caps and circled letters make a profile feel more personal. Decorative combining marks can render differently between devices and some apps may restrict which characters they accept. Always preview a copied style in its destination.</p>
          <p>Characters without a Unicode variant stay unchanged. This keeps punctuation and many languages readable instead of replacing them with unrelated symbols.</p>
        </article>
      </div>
    </div>
  );
}