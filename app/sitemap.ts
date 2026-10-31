
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { blogPosts } from "@/data/blog-posts";

const existingRoutes = [
  "",
  "/fonts",
  "/tools",
  "/tools/text-repeater",
  "/symbols",
  "/gaming",
  "/about",
  "/privacy",
  "/terms",
];

const blogRoutes = [
  "/blog",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

const routes = [...existingRoutes, ...blogRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/blog" ? 0.8 : 0.7,
  }));
}
