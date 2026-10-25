import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/faq-section";
import { FontExplorer } from "@/components/font-explorer";
import { fontStyles, type FontCategory } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fancy Text Generator: Copy and Paste Stylish Text",
  description: "Transform ordinary text into stylish Unicode text for social bios, usernames, gaming and messages. Preview and copy 149+ styles instantly.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fancy Text Generator | FancyCustomFonts",
    description: "Transform ordinary text into stylish Unicode text for your profiles and messages.",
    url: siteUrl,
  },
  twitter: {
  card: "summary_large_image",
  title: "Fancy Text Generator | FancyCustomFonts",
  description:
    "Transform ordinary text into stylish Unicode text you can copy and paste for bios, usernames, gaming profiles and messages.",
},
};

const categoryCards: { title: string; glyph: string; categories: FontCategory[]; href: string }[] = [
  { title: "Bold & italic", glyph: "𝐀", categories: ["Bold", "Italic"], href: "/fonts#font-library" },
  { title: "Script & cursive", glyph: "𝒜", categories: ["Script", "Cursive"], href: "/fonts#font-library" },
  { title: "Gothic & fraktur", glyph: "𝔉", categories: ["Gothic", "Fraktur"], href: "/fonts#font-library" },
  { title: "Small caps", glyph: "ᴬ", categories: ["Small Caps"], href: "/fonts#font-library" },
  { title: "Circled & squared", glyph: "ⓐ", categories: ["Circled", "Squared"], href: "/fonts#font-library" },
  { title: "Aesthetic", glyph: "✧", categories: ["Aesthetic"], href: "/fonts#font-library" },
  { title: "Gaming names", glyph: "♛", categories: ["Gaming", "Username"], href: "/gaming" },
  { title: "Symbols", glyph: "✦", categories: ["Symbols"], href: "/symbols" },
];

const toolCards = [
  { title: "Instagram font generator", text: "Give a bio, caption, or profile name a distinctive Unicode look", icon: "ig", href: "/fonts" },
  { title: "Gaming name styles", text: "Add a little edge to a tag with bold lettering and decorative marks", icon: "⌘", href: "/gaming" },
  { title: "Cool symbols", text: "Browse stars, hearts, arrows and useful copy-ready symbols", icon: "✧", href: "/symbols" },
  { title: "Discord text styles", text: "Find bold, monospace and decorated text for your server profile", icon: "#", href: "/fonts" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FancyCustomFonts",
  url: siteUrl,
  description: "A free browser-based Unicode text style generator and font library.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Your words, With a twist</span>
          <h1>Make ordinary text feel <em>anything but ordinary</em></h1>
<p>
  Use this free fancy text generator to turn ordinary words into stylish
  Unicode text you can copy and paste into bios, usernames, gaming profiles
  and messages.
</p>
          <div className="hero-actions">
            <a className="primary-button" href="#generator">Make fancy text <span aria-hidden="true">↓</span></a>
            <Link className="quiet-link" href="/fonts">Browse all styles <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-proof"><span className="proof-stars" aria-hidden="true"></span><span>Free to use · No sign-up · Copy and paste</span></div>
        </div>
              </section>

      <div className="page-width">
        <FontExplorer mode="generator" initialText="Make it yours" />
      </div>
      <section className="section-block page-width">
  <div className="section-heading">
    <div>
      <span className="eyebrow">How it works</span>
      <h2>How to use the fancy text generator</h2>
    </div>
    <p>
      Turn plain text into copy-ready Unicode styles in three simple steps.
    </p>
  </div>

  <div className="content-copy">
    <ol>
      <li>
        <strong>Enter your text.</strong> Type a name, bio, caption or short
        message into the generator above.
      </li>
      <li>
        <strong>Choose a style.</strong> Preview bold, script, gothic,
        small-caps and other available Unicode transformations.
      </li>
      <li>
        <strong>Copy and paste.</strong> Copy your favourite result and test
        it in your destination app. Character support varies by device and
        platform.
      </li>
    </ol>
  </div>
</section>

      <section className="section-block page-width">
        <div className="section-heading">
          <div><span className="eyebrow">A style for every side</span><h2>Find your kind of fancy</h2></div>
          <Link className="text-link" href="/fonts">Browse the font library <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="category-grid">
          {categoryCards.map((item) => (
            <Link className="category-card" href={item.href} key={item.title}>
              <span className="category-glyph" aria-hidden="true">{item.glyph}</span>
              <h3>{item.title}</h3><span>{item.categories.reduce((count, category) => count + fontStyles.filter((style) => style.category === category).length, 0)} styles</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block page-width">
        <div className="section-heading">
          <div><span className="eyebrow">Made for where you post</span><h2>Little tools for lots of uses</h2></div>
          <p>From a cleaner profile name to a full-on gaming tag, find a look that fits the place you use it.</p>
        </div>
        <div className="tools-grid">
          {toolCards.map((item) => (
            <Link className="tool-card" href={item.href} key={item.title}>
              <span className="tool-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
<p>{item.text}</p>
<span className="tool-card-link">Explore styles ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-band page-width">
        <div>
          <span className="eyebrow">Simple by design</span>
          <h2>Copy, Paste and be a little more you</h2>
          <p>Choose a style, preview your text and use it wherever Unicode characters are supported. No account or download stands between you and your next profile refresh.</p>
        </div>
        <ul className="feature-list">
          <li><span>✓</span><span><strong>Instant previews</strong><br />See every transformation as you type</span></li>
          <li><span>✓</span><span><strong>One-tap copying</strong><br />Take your favorite style with you</span></li>
          <li><span>✓</span><span><strong>Works in your browser</strong><br />Your text is transformed on your device</span></li>
          <li><span>✓</span><span><strong>Made for real platforms</strong><br />Styles for social bios, chat and games</span></li>
        </ul>
      </section>

      <div className="page-width section-block faq-section-wrap">
        <FaqSection />
      </div>
    </>
  );
}
