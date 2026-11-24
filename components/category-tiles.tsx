import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

export function CategoryTiles({ lang }: { lang: Lang }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {categories.map((category, index) => {
        const name = lang === "en" ? category.en : category.pl;
        const lead = index === 0;
        return (
          <li key={category.id} className={lead ? "col-span-2" : undefined}>
            <Link href={`/equipment/${category.id}`} className="block">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes={lead ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-contain p-3"
                />
              </div>
              <span className={lead ? "mt-2 block text-2xl font-semibold tracking-tight" : "mt-2 block text-sm font-semibold"}>
                {name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
