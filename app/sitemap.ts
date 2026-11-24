import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return ["", "/equipment", "/about", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${origin}${path}`,
    }),
  );
}
