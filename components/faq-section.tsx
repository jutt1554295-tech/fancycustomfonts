export const faqItems = [
  {
    question: "What is a fancy text generator?",
    answer: "It turns the text you type into alternate Unicode characters that resemble styles such as bold, script or circled text. Preview options as you type, then copy a result to use in an app that supports those characters.",
  },
  {
    question: "Are these actual fonts?",
    answer: "Not exactly. FancyCustomFonts does not install or generate font files; it maps supported characters to Unicode characters with different visual forms. You can often copy and paste them without installing a font, though the destination app must support them.",
  },
  {
    question: "What are Unicode characters and do all styles work everywhere?",
    answer: "Unicode is a standard that assigns identifiers to characters used across writing systems and symbols. FancyCustomFonts maps supported letters and numbers to related Unicode characters that look different, but not every app or device supports every character. The result is text, not a font effect applied by a website, so check it in the app where you plan to use it.",
  },
  {
    question: "Is FancyCustomFonts free and do I need an account?",
    answer: "The generator, font library and symbol browser are free to use. You do not need an account to preview or copy text.",
  },
  {
    question: "Can I use fancy text on Instagram?",
    answer: "Many Unicode styles work in Instagram bios, captions and profile names. Copy a preview and paste it into the field you want to update. Instagram may limit certain characters or lengths, so check the result before saving.",
  },
  {
    question: "Can I use fancy text on TikTok?",
    answer: "You can try copied styles in TikTok bios, display names and captions. Support can vary by field and by the characters in a style. Preview your profile after pasting to make sure it displays as expected.",
  },
  {
    question: "Can I use fancy text on Discord?",
    answer: "Unicode text can be pasted into supported Discord messages, display names and profile fields. Discord may restrict some characters and screen readers may pronounce decorative text differently. Keep important names and information easy to recognize.",
  },
  {
    question: "Can I use fancy text on WhatsApp?",
    answer: "You can paste supported Unicode styles into WhatsApp messages, statuses and profile details. The recipient's device and app determine how each character appears. Send a test message if the exact appearance matters.",
  },
  {
    question: "Can I use fancy text for PUBG or BGMI names?",
    answer: "Some generated characters may work in PUBG or BGMI names, but each game can restrict its accepted characters and name length. Try the name in the game's rename flow before using a rename card. Follow the game's naming rules and avoid characters that make your name hard to read.",
  },
  {
    question: "Can I use these styles in usernames and bios?",
    answer: "Yes, you can copy a style and try it in usernames, bios, captions or messages wherever Unicode text is accepted. Some services limit unusual characters or make decorative text harder to search. Check the final version in the app where you plan to use it.",
  },
  {
    question: "Why does a style look different on another device?",
    answer: "Apps and operating systems use different fonts to draw Unicode characters. A character may look slightly different, appear as a box or be missing if the device has no matching glyph. The text itself stays the same even when its appearance changes.",
  },
  {
    question: "Why do some characters stay unchanged?",
    answer: "Unicode does not provide a styled equivalent for every letter, punctuation mark or symbol, so unsupported characters stay as they are. This fallback keeps your text readable instead of replacing characters with unrelated ones. Support for combining marks can also vary by app.",
  },
  {
    question: "Is my text uploaded to a server?",
    answer: "No. Text conversion runs in your browser and does not send your entered text to a FancyCustomFonts API or database. As with any website, the hosting provider may process ordinary connection details, but the text you type is not included in those requests.",
  },
  {
    question: "Does the generator work on mobile?",
    answer: "Yes. You can type, browse previews and copy styles from a mobile browser. The controls adapt to smaller screens, so you can use the generator without installing an app.",
  },
  {
    question: "How do I copy generated text?",
    answer: "Choose a style and select its Copy button to put the preview on your clipboard. Your browser may ask for clipboard permission or require a secure connection. If copying is unavailable, you can select the preview text and copy it using your device's usual controls.",
  },
];

export function FaqSection() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section className="faq-section" id="faq">
      <div className="center-heading">
        <span className="eyebrow">Good to know</span>
        <h2>Frequently Asked Questions</h2>
        <p>The useful details about Unicode text styling</p>
      </div>
      <div className="faq-list">
        {faqItems.map(({ question, answer }) => (
          <details key={question}>
            <summary><span className="faq-question">{question}</span></summary>
            <div className="faq-answer"><p>{answer}</p></div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </section>
  );
}