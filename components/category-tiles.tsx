import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

export function CategoryTiles({ lang }: { lang: Lang }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((category) => {
        const name = lang === "en" ? category.en : category.pl;
        return (
          <li key={category.id}>
            <Link href={`/equipment/${category.id}`} className="block">
              <div className="relative aspect-square bg-white">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain p-4"
                />
              </div>
              <span className="mt-2 block text-base font-medium">{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
