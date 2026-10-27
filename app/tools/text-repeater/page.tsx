import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { TextRepeater } from "@/components/text-repeater";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Text Repeater – Repeat Words Online",
  description:
    "Repeat words and sentences online, choose a Unicode text style, select a separator and copy your result instantly.",

  alternates: {
    canonical: "/tools/text-repeater",
  },

  openGraph: {
    title: "Text Repeater | FancyCustomFonts",
    description:
      "Repeat text, choose a stylish Unicode format and copy your result.",
    url: `${siteUrl}/tools/text-repeater`,
  },

  twitter: {
    card: "summary_large_image",
    title: "Text Repeater | FancyCustomFonts",
    description:
      "Repeat words online with custom counts, separators and stylish Unicode text.",
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
  <h2>How to use the text repeater</h2>
  <ol>
    <li>Enter the word, phrase, or sentence you want to repeat.</li>
    <li>Choose a repeat count from 1 to 100.</li>
    <li>Select an available Unicode text style or keep the original text.</li>
    <li>Choose a separator and copy your generated result.</li>
  </ol>

  <h2>Example: repeat text three times</h2>
  <p>
    Enter <strong>Hello</strong>, set the repeat count to three
    and choose a space separator. The result will be:
  </p>
  <p>
    <code>Hello Hello Hello</code>
  </p>

  <h2>Choose how repeated text is separated</h2>
  <ul>
    <li><strong>Space:</strong> Hello Hello Hello</li>
    <li><strong>New line:</strong> Each copy appears on a separate line.</li>
    <li><strong>Comma:</strong> Hello, Hello, Hello</li>
    <li><strong>No separator:</strong> HelloHelloHello</li>
    <li><strong>Custom separator:</strong> Add your own symbol or text between copies.</li>
  </ul>

  <h2>Change the text style</h2>
  <p>
    Choose an available Unicode style before copying the repeated
    result. Different styles can make words look bold, decorative
    or distinctive. Character support and appearance vary across
    apps and devices, so check the result before sharing it.
  </p>

  <h2>What is the text repeater limit?
  </h2>
  <p>
    This version supports up to 100 repetitions and 500 input
    characters. For very long text, check the generated result
    before copying it into another app.
  </p>
</article>
      </div>
    </div>
  );
}