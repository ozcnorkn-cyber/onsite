"use client";

import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { categories, categoryById, productsIn } from "@/lib/catalogue";
import { QuoteControls } from "./quote-controls";

export function Catalogue({ lang }: { lang: Lang }) {
  const copy = t(lang);

  return (
    <div id="katalog">
      {categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="border-b border-ink/15"
        >
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="display text-3xl md:text-4xl">
              {lang === "en" ? category.en : category.pl}
            </h2>
            <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {productsIn(category.id).map((product) => {
                const group = categoryById(product.category);
                const name = lang === "en" ? product.en : product.pl;
                const groupName = group
                  ? lang === "en"
                    ? group.en
                    : group.pl
                  : "";
                return (
                  <li key={product.id}>
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={product.image}
                        alt={name}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="kicker mt-4">{groupName}</p>
                    <h3 className="mt-1 text-xl font-semibold">{name}</h3>
                    <div className="mt-4">
                      <QuoteControls id={product.id} lang={lang} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
      <p className="sr-only">{copy.equipmentTitle}</p>
    </div>
  );
}
