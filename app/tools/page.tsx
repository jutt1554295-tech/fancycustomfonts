import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { tools } from "@/data/tools";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Text Styling Tools",
  description: "Explore text styling tools for Instagram, TikTok, Discord, gaming names, Unicode text, small caps and copy-ready symbols.",
  alternates: { canonical: "/tools" },
  openGraph: { title: "Text Styling Tools | FancyCustomFonts", description: "Find the right text styling tool for your profile or game.", url: `${siteUrl}/tools` },
};

export default function ToolsPage() {
  return (
    <div className="page-width">
      <PageHeading current="Tools" href="/tools" title="Text styling tools" description="A growing toolkit for giving your words a little more character. Start with the live generator, or browse styles and symbols for the platform you have in mind." />
      <div className="page-content">
        <div className="directory-grid">
          {tools.map((tool) => (
            <article className="directory-card" key={tool.title}>
              <span className="tool-icon" aria-hidden="true">{tool.icon}</span>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              <Link className="text-link" href={tool.href}>{tool.status} <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
        <p className="tools-note">The text generator and copy-ready symbol browser are available now. Platform-specific pages are planned; until then, the font library provides styles that you can try across apps.</p>
      </div>
    </div>
  );
}