import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { TextRepeater } from "@/components/text-repeater";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Text Repeater – Repeat Words Online",
  description:
    "Repeat words and sentences online, choose a Unicode text style, select a separator, and copy your result instantly.",

  alternates: {
    canonical: "/tools/text-repeater",
  },

  openGraph: {
    title: "Text Repeater | FancyCustomFonts",
    description:
      "Repeat text, choose a stylish Unicode format, and copy your result.",
    url: `${siteUrl}/tools/text-repeater`,
  },

  twitter: {
    card: "summary_large_image",
    title: "Text Repeater | FancyCustomFonts",
    description:
      "Repeat words online with custom counts, separators, and stylish Unicode text.",
  },
};

export default function TextRepeaterPage() {
  return (
    <div className="page-width">
      <PageHeading
        current="Text Repeater"
        href="/tools/text-repeater"
        title="Text Repeater"
        description="Repeat any word or sentence, choose a text style and copy the result. Create repeated text for messages, bios, captions and more."
      />

      <div className="page-content">
        <TextRepeater />

        <article className="content-copy">
          <h2>How to repeat text online</h2>
          <ol>
            <li>Enter the word or sentence you want to repeat.</li>
            <li>Choose how many times to repeat it.</li>
            <li>Select a Unicode text style or keep the original text.</li>
            <li>Choose a separator, preview the result and copy it.</li>
          </ol>

          <h2>Choose a text style</h2>
          <p>
            Use the available Unicode styles to give repeated words a
            different appearance. Character support varies between apps
            and devices, so check the result before sharing it.
          </p>
        </article>
      </div>
    </div>
  );
}