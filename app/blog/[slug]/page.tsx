
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
        className="mb-8 text-sm text-slate-500"
      >
        <Link href="/" className="hover:text-violet-700 hover:underline">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link
          href="/blog"
          className="hover:text-violet-700 hover:underline"
        >
          Blog
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-700">{post.category}</span>
      </nav>

      <article>
        <header className="rounded-3xl border border-white/70 bg-white/65 p-7 shadow-sm backdrop-blur-xl sm:p-10">
          <span className="inline-flex rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            {post.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            {post.description}
          </p>

          <p className="mt-5 text-sm text-slate-500">
            {post.readTime} · FancyCustomFonts Editorial Guide
          </p>
        </header>

        <div className="mt-8 space-y-10">
          {post.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border border-white/70 bg-white/55 p-6 shadow-sm backdrop-blur-xl sm:p-8"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {section.heading}
              </h2>

              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.heading}-${index}`}
                    className="text-base leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.points && (
                <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700 marker:text-violet-600">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-violet-100 bg-violet-50/70 p-7 sm:p-9">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Try It on FancyCustomFonts
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-700">
            Put this guide into practice with a relevant text tool.
            Preview your result and check that the selected characters
            work in the app where you plan to use them.
          </p>

          
<Link
  href={post.relatedHref}
  style={{ color: "#ffffff", backgroundColor: "#111827" }}
  className="mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
>
  {post.relatedLabel}
</Link>

        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 divide-y divide-slate-200 rounded-3xl border border-white/70 bg-white/60 px-6 shadow-sm backdrop-blur-xl">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="py-5">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-base leading-7 text-slate-700">
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
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          More Guides You May Find Useful
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="rounded-2xl border border-white/70 bg-white/60 p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md"
            >
              <span className="text-xs font-medium text-violet-700">
                {related.category}
              </span>
              <h3 className="mt-2 font-semibold leading-6 text-slate-900">
                {related.title}
              </h3>
              <span className="mt-3 inline-block text-sm font-semibold text-violet-700">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <div className="mt-10 text-sm">
        <Link href="/blog" className="font-semibold text-violet-700 hover:underline">
          ← Back to all blog guides
        </Link>
      </div>
    </main>
  );
}
