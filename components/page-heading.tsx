import { Breadcrumb } from "@/components/breadcrumb";

type PageHeadingProps = {
  current: string;
  href: string;
  title: string;
  description: string;
};

export function PageHeading({ current, href, title, description }: PageHeadingProps) {
  return (
    <header className="page-intro">
      <Breadcrumb current={current} href={href} />
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}