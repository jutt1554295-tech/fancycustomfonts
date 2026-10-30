
import type { Metadata } from "next";
import { GunRiflesGenerator } from "@/components/gun-rifles-generator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gun & Rifles Name Generator",
  description:
    "Create gaming names with nine different gun-inspired text designs. Enter your name, preview the styles and copy your favourite.",
  alternates: {
    canonical: "/tools/gun-rifles",
  },
  openGraph: {
    title: "Gun & Rifles Name Generator | FancyCustomFonts",
    description:
      "Create and copy decorative gun-inspired text designs for gaming names.",
    url: `${siteUrl}/tools/gun-rifles`,
  },
};

export default function GunRiflesPage() {
  return (
    <div className="page-width">
      <div className="page-content">
        <GunRiflesGenerator />
      </div>
    </div>
  );
}
