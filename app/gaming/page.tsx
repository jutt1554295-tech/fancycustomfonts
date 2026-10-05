import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gaming Names and Stylish Gamer Text",
  description: "Explore stylish Unicode text, username ideas and copy-ready symbols for gaming profiles, PUBG and BGMI names and Discord.",
  alternates: { canonical: "/gaming" },
  openGraph: { title: "Gaming Names and Stylish Gamer Text | FancyCustomFonts", description: "Find a distinctive Unicode look for your gaming name and profile.", url: `${siteUrl}/gaming` },
};

const ideas = ["Ｎｏｖａ", "『NightRider』", "꧁Echo꧂", "𝐕𝐚𝐥𝐨𝐫", "✦ Orbit ✦", "乂Drift乂"];

export default function GamingPage() {
  return (
    <div className="page-width">
      <PageHeading current="Gaming" href="/gaming" title="Gaming names with their own style" description="Give your gamer tag a look that feels like yours. Preview decorative Unicode text, explore name ideas and find symbols for gaming profiles, PUBG or BGMI names and Discord." />
      <div className="page-content">
        <section aria-labelledby="gaming-ideas-title">
          <div className="section-heading">
            <div><span className="eyebrow">A few starting points</span><h2 id="gaming-ideas-title">Name ideas with a little edge</h2></div>
            <p>Try a short word or nickname in the generator to make a version you can use.</p>
          </div>
          <div className="category-grid">
            {ideas.map((idea, index) => (
              <Link className="category-card" href="/#generator" key={idea}>
                <span className="category-glyph" aria-hidden="true">{["⌖", "♛", "✧", "⚔", "✦", "◈"][index]}</span>
                <h3>{idea}</h3><span>Try this style ↗</span>
              </Link>
            ))}
          </div>
        </section>
        <div className="gaming-link-grid">
          <article className="gaming-link-card">
            <h2>For PUBG and BGMI names</h2>
            <p>Use a short tag, then test it with bold, full-width, or bracketed styles. Decorative marks can help a name stand out, but game naming rules and character limits change, so verify your final choice in the game.</p>
            <Link className="text-link" href="/#generator">Style a gaming name <span aria-hidden="true">↗</span></Link>
          </article>
          <article className="gaming-link-card">
            <h2>For Discord profiles</h2>
            <p>Use the font library to preview bold, monospace, or decorated text for a display name or server profile. Keep important details easy for friends and screen readers to recognize.</p>
            <Link className="text-link" href="/fonts">Browse text styles <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
        <div className="callout">
          <p>Ready to make your own version? Type a name once and browse the results live.</p>
          <Link className="primary-button" href="/#generator">Open the generator <span aria-hidden="true">↗</span></Link>
        </div>
        <article className="content-copy">
          <h2>Choose a gamer name that stays readable</h2>
          <p>Unicode styles can add personality, but the most useful gaming name is still one teammates can recognize and remember. Check the result on your device, keep the spelling easy to share and confirm your game accepts those characters before committing to a change.</p>
        </article>
      </div>
    </div>
  );
}