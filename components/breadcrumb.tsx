import Link from "next/link";
import { siteUrl } from "@/lib/site";

type BreadcrumbProps = { current: string; href: string };

export function Breadcrumb({ current, href }: BreadcrumbProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: current, item: `${siteUrl}${href}` },
    ],
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </>
  );
}