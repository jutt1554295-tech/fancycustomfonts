export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fancycustomfonts.com").replace(/\/+$/, "");

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Fonts", href: "/fonts" },
  { label: "Tools", href: "/tools" },
  { label: "Symbols", href: "/symbols" },
  { label: "Gaming", href: "/gaming" },
  { label: "FAQ", href: "/#faq" },
] as const;