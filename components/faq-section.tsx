export const faqItems = [
  {
    question: "What is a fancy text generator?",
    answer:
      "It converts your text into stylish Unicode characters. Choose a style and copy it.",
  },
  {
    question: "Are these real fonts?",
    answer:
      "No. These are Unicode characters that look like different text styles, not installed fonts.",
  },
  {
    question: "Does every style work everywhere?",
    answer:
      "No. Support varies by app and device, so check your text before using it.",
  },
  {
    question: "Is FancyCustomFonts free?",
    answer:
      "Yes. You can browse styles, generate text and copy results without an account.",
  },
  {
    question: "Can I use fancy text on Instagram?",
    answer:
      "Yes. Try supported styles in your bio, captions or profile name.",
  },
  {
    question: "Can I use fancy text on TikTok?",
    answer:
      "Yes. Copy a style and try it in your bio, captions or display name.",
  },
  {
    question: "Can I use fancy text on Discord?",
    answer:
      "Yes. Paste supported styles into messages or profile fields.",
  },
  {
    question: "Can I use fancy text on WhatsApp?",
    answer:
      "Yes. Try supported styles in messages, statuses or profile details.",
  },
  {
    question: "Do styles work in PUBG and BGMI?",
    answer:
      "Some do, but games restrict certain characters and name lengths. Test your name first.",
  },
  {
    question: "What is Gun & Rifles?",
    answer:
      "It's a gaming text-art tool with nine gun-inspired designs and copy-ready names.",
  },
    {
    question: "Can I put my name inside a gun design?",
    answer:
      "Yes. Enter your name to update the designs, then copy your favourite.",
  },
    {
    question: "Will gun designs look the same in every game?",
    answer:
      "Not always. Character support varies, so test the copied design in your game.",
  },
  {
    question: "Can I use these styles in bios?",
    answer:
      "Yes. Try them in supported usernames, bios, captions and messages.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "Text conversion runs in your browser and is not sent to a FancyCustomFonts API or database.",
  },
  {
    question: "Does the generator work on mobile?",
    answer:
      "Yes. You can type, preview and copy styles using your mobile browser.",
  },
  {
    question: "How do I copy generated text?",
    answer:
      "Select Copy beside a style. If copying fails, check browser permissions or copy the text manually.",
  },
  {
    question: "Why do some characters stay unchanged?",
    answer:
      "Not every letter or symbol has a styled Unicode equivalent, so unsupported characters remain unchanged.",
  },
  {
    question: "Why does text look different on devices?",
    answer:
      "Devices and apps render Unicode characters differently. Some may show boxes or missing characters.",
  },
    {
  question: "How can I repeat a word or sentence multiple times?",
  answer:
    "Enter your text in the Text Repeater, choose how many times to repeat it, select a separator and copy the generated result.",
},
  {
    question: "Can I change the text style before repeating it?",
    answer:
      "Yes. Choose an available Unicode text style in the Text Repeater, select your repeat count and separator, then copy the result.",
  },
];

export function FaqSection() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section className="faq-section" id="faq">
      <div className="center-heading">
        <span className="eyebrow">Good to know</span>
        <h2>Frequently Asked Questions</h2>
        <p>Quick answers about fonts and text styling</p>
      </div>

      <div className="faq-list">
        {faqItems.map(({ question, answer }) => (
          <details key={question}>
            <summary>
              <span className="faq-question">{question}</span>
            </summary>
            <div className="faq-answer">
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </section>
  );
}