
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
      "Guides, ideas and tips for stylish Unicode text, symbols and creative usernames.",
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
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-violet-600">
          The FancyCustomFonts Journal
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Ideas, Guides and Inspiration for Stylish Text
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Discover Unicode text styles, copy-and-paste symbols, creative
          usernames and practical tips for social media and gaming.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/fonts"
            className="rounded-full border border-white/60 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-xl transition hover:bg-white"
          >
            Explore Text Styles
          </Link>

          <Link
            href="/symbols"
            className="rounded-full border border-white/60 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-xl transition hover:bg-white"
          >
            Browse Symbols
          </Link>
        </div>
      </section>

      <section aria-labelledby="latest-articles">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Learn Something New
            </p>

            <h2
              id="latest-articles"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Guides and Articles
            </h2>
          </div>

          <p className="text-sm text-slate-500">
            Text styles, Symbols and Useful Tools
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col rounded-3xl border border-white/70 bg-white/65 p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5 sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  {post.category}
                </span>

                <span className="text-xs text-slate-500">
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-xl font-semibold leading-snug text-slate-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="outline-none transition group-hover:text-violet-700 focus-visible:underline"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                {post.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition group-hover:gap-3"
              >
                Read article
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-white/70 bg-white/55 p-7 text-center shadow-sm backdrop-blur-xl sm:mt-20 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Ready to create your own style?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          Try our text styles and symbols, then copy your favourites for
          usernames, bios, messages and more.
        </p>

        
<Link
  href="/"
  style={{ color: "#ffffff" }}
  className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold transition hover:bg-slate-700"
>
  Open Text Generator
</Link>
      </section>
    </main>
  );
}
