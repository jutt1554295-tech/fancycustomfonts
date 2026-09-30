import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { SymbolBrowser } from "@/components/symbol-browser";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Copy and Paste Cool Symbols",
  description: "Browse and copy useful Unicode stars, hearts, arrows, brackets, gaming symbols and decorative marks.",
  alternates: { canonical: "/symbols" },
  openGraph: { title: "Cool Symbols to Copy and Paste | FancyCustomFonts", description: "Browse copy-ready Unicode symbols by category.", url: `${siteUrl}/symbols` },
};

export default function SymbolsPage() {
  return (
    <div className="page-width">
      <PageHeading current="Symbols" href="/symbols" title="Symbols to copy and paste" description="A tidy collection of stars, hearts, arrows, brackets and gaming marks. Choose a symbol to copy it, then paste it into a username, bio, message or caption." />
      <div className="page-content">
        <SymbolBrowser />
        <p className="tools-note">Symbols are Unicode characters. Their shape and availability can vary between fonts, devices and apps.</p>
      </div>
    </div>
  );
}