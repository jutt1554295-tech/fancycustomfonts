
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | FancyCustomFonts",
  description:
    "Learn how to use stylish Unicode text, copy-and-paste symbols, creative usernames and text tools for social media and gaming.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "FancyCustomFonts Blog",
    description:
      "Guides, ideas and tips for stylish text, Unicode symbols and creative usernames.",
    type: "website",
    url: "/blog",
  },
};

const posts = [
  {
    category: "Unicode Basics",
    title: "What Is Fancy Text? A Guide to Unicode Text Styles",
    description:
      "Learn how fancy text works, how Unicode characters differ from ordinary text and how to copy and paste stylish text.",
    slug: "fancy-text-generator-guide",
    readTime: "5 min read",
  },
  {
    category: "Social Media",
    title: "How to Create Stylish Text for an Instagram Bio",
    description:
      "Explore decorative letters, symbols and practical ways to make your social media profile stand out.",
    slug: "instagram-fonts-for-bio",
    readTime: "5 min read",
  },
  {
    category: "Gaming",
    title: "Stylish Gaming Names and Symbols: A Practical Guide",
    description:
      "Find ideas for creative gaming usernames and learn how to copy special characters for your profiles.",
    slug: "stylish-gaming-names",
    readTime: "5 min read",
  },
  {
    category: "Symbols",
    title: "Unicode Symbols to Copy and Paste",
    description:
      "Discover useful decorative symbols, stars, arrows, hearts and other characters for messages and profiles.",
    slug: "unicode-symbols-copy-and-paste",
    readTime: "4 min read",
  },
  {
    category: "Online Tools",
    title: "How to Repeat Text Online",
    description:
      "Learn how to repeat words or phrases and use line breaks to format repeated text for different purposes.",
    slug: "repeat-text-online",
    readTime: "4 min read",
  },
  {
    category: "Text Styles",
    title: "Unicode Text Styles Explained",
    description:
      "Understand bold, italic, double-struck, full-width, circled and other Unicode-inspired text styles.",
    slug: "unicode-text-styles-explained",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <section className="mb-14 text-center sm:mb-16">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: "var(--accent)" }}
        >
          The FancyCustomFonts Journal
        </p>

        <h1
          className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--ink)" }}
        >
          Discover the World of

          <span className="mt-2 block">
            <span
              className="font-serif italic"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--accent), var(--accent-alt))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontFamily: "var(--display)",
              }}
            >
              Fancy Fonts
            </span>

            <span style={{ color: "var(--ink)" }}>
              {" "}&amp; Stylish Text
            </span>
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg"
          style={{ color: "var(--muted)" }}
        >
          Discover Unicode text styles, copy-and-paste symbols, creative
          usernames and practical tips for social media and gaming.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/fonts"
            className="rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur-xl transition hover:opacity-80"
            style={{
              borderColor: "var(--accent-border)",
              background: "var(--glass-background)",
              color: "var(--ink)",
            }}
          >
            Explore Text Styles
          </Link>

          <Link
            href="/symbols"
            className="rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur-xl transition hover:opacity-80"
            style={{
              borderColor: "var(--accent-border)",
              background: "var(--glass-background)",
              color: "var(--ink)",
            }}
          >
            Browse Symbols
          </Link>
        </div>
      </section>

      <section aria-labelledby="latest-articles">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Learn Something New
            </p>

            <h2
              id="latest-articles"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "var(--ink)" }}
            >
              Guides and Articles
            </h2>
          </div>

          <p
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            Text styles, Symbols and Useful Tools
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col rounded-3xl border p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
              style={{
                borderColor: "var(--glass-border)",
                background: "var(--glass-background)",
                color: "var(--ink)",
              }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: "var(--accent-border)",
                    background:
                      "color-mix(in srgb, var(--accent) 10%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  {post.category}
                </span>

                <span
                  className="text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {post.readTime}
                </span>
              </div>

              <h3
                className="text-xl font-semibold leading-snug"
                style={{ color: "var(--ink)" }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="outline-none transition hover:opacity-75 focus-visible:underline"
                  style={{ color: "var(--ink)" }}
                >
                  {post.title}
                </Link>
              </h3>

              <p
                className="mt-4 flex-1 text-sm leading-6"
                style={{ color: "var(--muted)" }}
              >
                {post.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
                style={{ color: "var(--accent)" }}
              >
                Read article
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mt-14 rounded-3xl border p-7 text-center shadow-sm backdrop-blur-xl sm:mt-20 sm:p-10"
        style={{
          borderColor: "var(--glass-border)",
          background: "var(--glass-background)",
        }}
      >
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Ready to create your own style?
        </h2>

        <p
          className="mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base"
          style={{ color: "var(--muted)" }}
        >
          Try our text styles and symbols, then copy your favourites for
          usernames, bios, messages and more.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-85"
          style={{
            background:
              "linear-gradient(110deg, var(--accent), var(--accent-soft))",
            borderColor: "var(--accent-border)",
            color: "var(--accent-contrast)",
          }}
        >
          Open Text Generator
        </Link>
      </section>
    </main>
  );
}
