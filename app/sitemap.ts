import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = ["", "/fonts", "/tools", "/symbols", "/gaming", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.7,
  }));
}