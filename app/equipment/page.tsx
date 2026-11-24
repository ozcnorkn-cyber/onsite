import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function EquipmentPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <div>
      <header className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="kicker">{copy.brand}</p>
          <h1 className="display mt-4 text-4xl md:text-6xl">{copy.equipmentTitle}</h1>
          <p className="mt-5 max-w-xl text-lg">{copy.equipmentIntro}</p>
        </div>
      </header>
      <ul id="katalog" className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const name = lang === "en" ? category.en : category.pl;
          return (
            <li key={category.id}>
              <Link href={`/equipment/${category.id}`} className="block">
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-lg font-semibold uppercase tracking-wide">{name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
