import Link from "next/link";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

export function CategoryIndex({ lang }: { lang: Lang }) {
  return (
    <ul className="border-t border-ink">
      {categories.map((category, index) => {
        const name = lang === "en" ? category.en : category.pl;
        const lead = index === 0;
        return (
          <li key={category.id} className="border-b border-ink">
            <Link href={`/equipment/${category.id}`} className="block py-3 md:py-4">
              <span className={lead ? "text-4xl font-medium tracking-tight md:text-6xl" : "text-lg md:text-2xl"}>
                {name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
