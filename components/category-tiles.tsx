import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

export function CategoryTiles({ lang, ids }: { lang: Lang; ids?: string[] }) {
  const wanted = ids ?? categories.map((category) => category.id);
  const tiles = wanted
    .map((id) => categories.find((category) => category.id === id))
    .filter((category) => category !== undefined);

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
      {tiles.map((category) => {
        const name = lang === "en" ? category.en : category.pl;
        return (
          <li key={category.id}>
            <Link href={`/equipment/${category.id}`} className="block">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-contain p-6"
                />
              </div>
              <span className="mt-3 block text-lg font-semibold tracking-tight">{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
