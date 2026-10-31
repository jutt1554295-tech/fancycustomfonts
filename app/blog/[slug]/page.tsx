
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | FancyCustomFonts",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: "FancyCustomFonts",
    },
  };
}

export default async function BlogArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter(
    (item) => item.slug !== post.slug
  ).slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-sm"
        style={{ color: "var(--muted)" }}
      >
        <Link
          href="/"
          className="transition hover:opacity-75 hover:underline"
          style={{ color: "var(--accent)" }}
        >
          Home
        </Link>

        <span className="mx-2" aria-hidden="true">/</span>

        <Link
          href="/blog"
          className="transition hover:opacity-75 hover:underline"
          style={{ color: "var(--accent)" }}
        >
          Blog
        </Link>

        <span className="mx-2" aria-hidden="true">/</span>

        <span style={{ color: "var(--ink)" }}>
          {post.category}
        </span>
      </nav>

      <article>
        <header
          className="rounded-3xl border p-7 shadow-sm backdrop-blur-xl sm:p-10"
          style={{
            borderColor: "var(--glass-border)",
            background: "var(--glass-background)",
          }}
        >
          <span
            className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
            style={{
              borderColor: "var(--accent-border)",
              background:
                "color-mix(in srgb, var(--accent) 10%, transparent)",
              color: "var(--accent)",
            }}
          >
            {post.category}
          </span>

          <h1
            className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "var(--ink)" }}
          >
            {post.title}
          </h1>

          <p
            className="mt-5 text-base leading-8 sm:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {post.description}
          </p>

          <p
            className="mt-5 text-sm"
            style={{ color: "var(--muted)" }}
          >
            {post.readTime} · FancyCustomFonts Editorial Guide
          </p>
        </header>

        <div className="mt-8 space-y-10">
          {post.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border p-6 shadow-sm backdrop-blur-xl sm:p-8"
              style={{
                borderColor: "var(--glass-border)",
                background: "var(--glass-background)",
              }}
            >
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--ink)" }}
              >
                {section.heading}
              </h2>

              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.heading}-${index}`}
                    className="text-base leading-8"
                    style={{ color: "var(--muted)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.points && (
                <ul
                  className="mt-5 list-disc space-y-2 pl-6 text-base leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section
          className="mt-10 rounded-3xl border p-7 sm:p-9"
          style={{
            borderColor: "var(--accent-border)",
            background:
              "color-mix(in srgb, var(--accent) 7%, var(--glass-background))",
          }}
        >
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            Try It on FancyCustomFonts
          </h2>

          <p
            className="mt-3 text-base leading-7"
            style={{ color: "var(--muted)" }}
          >
            Put this guide into practice with a relevant text tool.
            Preview your result and check that the selected characters
            work in the app where you plan to use them
          </p>

          <Link
            href={post.relatedHref}
            className="mt-6 inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-85"
            style={{
              background:
                "linear-gradient(110deg, var(--accent), var(--accent-soft))",
              borderColor: "var(--accent-border)",
              color: "var(--accent-contrast)",
            }}
          >
            {post.relatedLabel}
          </Link>
        </section>

        <section className="mt-12">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            Frequently Asked Questions
          </h2>

          <div
            className="mt-5 rounded-3xl border px-6 shadow-sm backdrop-blur-xl"
            style={{
              borderColor: "var(--glass-border)",
              background: "var(--glass-background)",
            }}
          >
            {post.faqs.map((faq) => (
              <details
                key={faq.question}
                className="border-b py-5 last:border-b-0"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <summary
                  className="cursor-pointer font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {faq.question}
                </summary>

                <p
                  className="mt-3 text-base leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </article>

      <aside className="mt-14" aria-labelledby="related-guides">
        <h2
          id="related-guides"
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          More Guides You May Find Useful
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              style={{
                borderColor: "var(--glass-border)",
                background: "var(--glass-background)",
              }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                {related.category}
              </span>

              <h3
                className="mt-2 font-semibold leading-6"
                style={{ color: "var(--ink)" }}
              >
                {related.title}
              </h3>

              <span
                className="mt-3 inline-block text-sm font-semibold"
                style={{ color: "var(--accent)" }}
              >
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <div className="mt-10 text-sm">
        <Link
          href="/blog"
          className="font-semibold transition hover:opacity-75"
          style={{ color: "var(--accent)" }}
        >
          ← Back to all blog guides
        </Link>
      </div>
    </main>
  );
}
