import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

const order = ["meble", "scena", "namioty", "efekty", "klimat", "lacznosc", "zasilanie"] as const;

const span: Record<(typeof order)[number], string> = {
  meble: "md:col-span-7 md:row-span-2",
  scena: "md:col-span-5",
  namioty: "md:col-span-5",
  efekty: "md:col-span-3",
  klimat: "md:col-span-3",
  lacznosc: "md:col-span-3",
  zasilanie: "md:col-span-3",
};

export function CategoryTiles({ lang }: { lang: Lang }) {
  const byId = new Map(categories.map((category) => [category.id, category]));

  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-12">
      {order.map((id) => {
        const category = byId.get(id);
        if (!category) return null;
        const name = lang === "en" ? category.en : category.pl;
        const lead = id === "meble";
        return (
          <li key={id} className={span[id]}>
            <Link href={`/equipment/${id}`} className="flex h-full flex-col">
              <div
                className={
                  lead
                    ? "relative h-80 bg-white md:h-auto md:min-h-[520px] md:flex-1"
                    : "relative h-64 bg-white md:h-72"
                }
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes={lead ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
                  className="object-contain p-6"
                />
              </div>
              <span className="bg-ink px-3 py-3 text-base font-semibold text-white">{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
