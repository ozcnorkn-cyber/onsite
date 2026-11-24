import type { MetadataRoute } from "next";
import { navCategories, products } from "@/lib/catalogue";
import { siteOrigin } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  const paths = [
    "",
    "/equipment",
    "/quote",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...navCategories().map((category) => `/equipment/${category.id}`),
    ...products.map((product) => `/equipment/${product.category}/${product.id}`),
  ];
  return paths.map((path) => ({ url: `${origin}${path}` }));
}
