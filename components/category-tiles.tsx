import Image from "next/image";
import Link from "next/link";
import { navCategories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

function Tile({
  category,
  lang,
  current,
  dense,
  wide,
}: {
  category: NonNullable<ReturnType<typeof navCategories>[number]>;
  lang: Lang;
  current?: string;
  dense: boolean;
  wide?: boolean;
}) {
  const name = lang === "en" ? category.en : category.pl;
  const active = category.id === current;
  return (
    <Link href={`/equipment/${category.id}`} className="block" aria-current={active ? "page" : undefined}>
      <div className={`clip-frame bg-white ${wide ? "aspect-[4/3] md:aspect-[8/3]" : "aspect-[4/3]"} ${active ? "ring-2 ring-ink" : ""}`}>
        {category.image ? (
          <Image
            src={category.image}
            alt=""
            fill
            sizes={wide ? "(min-width: 768px) 50vw, 100vw" : dense ? "140px" : "(min-width: 768px) 25vw, 50vw"}
            className="object-contain"
          />
        ) : null}
      </div>
      <span className={dense ? "mt-1.5 block text-xs font-semibold leading-tight" : "mt-2 block text-lg font-semibold tracking-tight"}>
        {name}
      </span>
    </Link>
  );
}

export function CategoryTiles({
  lang,
  ids,
  current,
  dense = false,
  compact = false,
  home = false,
}: {
  lang: Lang;
  ids?: string[];
  current?: string;
  dense?: boolean;
  /** Inner pages: the menu's small tile, in a grid that fits a phone. */
  compact?: boolean;
  /** Homepage: the first tile is twice as wide and centred, the rest share one row. */
  home?: boolean;
}) {
  const available = navCategories();
  const wanted = ids ?? available.map((category) => category.id);
  const tiles = wanted
    .map((id) => available.find((category) => category.id === id))
    .filter((category) => category !== undefined);

  if (home && tiles.length > 1) {
    const [lead, ...rest] = tiles;
    return (
      <div>
        <div className="mx-auto w-full md:w-1/2">
          <Tile category={lead} lang={lang} current={current} dense={false} wide />
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
          {rest.map((category) => (
            <li key={category.id}>
              <Tile category={category} lang={lang} current={current} dense={false} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const small = dense || compact;
  const grid = dense
    ? "grid grid-cols-5 gap-2"
    : compact
      ? "grid grid-cols-3 gap-x-3 gap-y-4 md:grid-cols-5"
      : "grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4";

  return (
    <ul className={grid}>
      {tiles.map((category) => (
        <li key={category.id}>
          <Tile category={category} lang={lang} current={current} dense={small} />
        </li>
      ))}
    </ul>
  );
}
