import Image from "next/image";
import Link from "next/link";
import { navCategories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

export function CategoryTiles({
  lang,
  ids,
  current,
  dense = false,
}: {
  lang: Lang;
  ids?: string[];
  current?: string;
  dense?: boolean;
}) {
  const available = navCategories();
  const wanted = ids ?? available.map((category) => category.id);
  const tiles = wanted
    .map((id) => available.find((category) => category.id === id))
    .filter((category) => category !== undefined);

  return (
    <ul className={dense ? "grid grid-cols-5 gap-2" : "grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4"}>
      {tiles.map((category) => {
        const name = lang === "en" ? category.en : category.pl;
        const active = category.id === current;
        return (
          <li key={category.id}>
            <Link
              href={`/equipment/${category.id}`}
              className="block"
              aria-current={active ? "page" : undefined}
            >
              <div className={`clip-frame aspect-[4/3] bg-white ${active ? "ring-2 ring-ink" : ""}`}>
                {category.image ? (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes={dense ? "140px" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-contain"
                  />
                ) : null}
              </div>
              <span className={dense ? "mt-1.5 block text-xs font-semibold leading-tight" : "mt-2 block text-base font-semibold tracking-tight"}>
                {name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
