"use client";

import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { categoryById, productById } from "@/lib/catalogue";
import { QuoteRequest } from "./quote-request";
import { useQuote } from "./quote-store";

export function QuoteScreen({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const { lines, increase, remove } = useQuote();
  const rows = lines.flatMap((line) => {
    const product = productById(line.id);
    if (!product) return [];
    const category = categoryById(product.category);
    return [{ line, product, category }];
  });

  return (
    <section id="quote" className="border-t border-ink bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="display text-4xl md:text-5xl">{copy.quoteTitle}</h2>
        <p className="mt-4 max-w-xl text-sm text-steel-deep">{copy.quoteNote}</p>
        {rows.length === 0 ? (
          <p className="mt-8 text-lg">{copy.quoteEmpty}</p>
        ) : (
          <ul className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {rows.map(({ line, product, category }) => {
              const name = lang === "en" ? product.en : product.pl;
              const group = category
                ? lang === "en"
                  ? category.en
                  : category.pl
                : "";
              return (
                <li
                  key={line.id}
                  className="grid items-center gap-4 py-5 sm:grid-cols-[7rem_1fr_auto]"
                >
                  <div className="relative aspect-[4/3] bg-paper">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="kicker">{group}</p>
                    <p className="mt-1 text-lg font-semibold">{name}</p>
                    <p className="mt-2 text-sm">
                      {copy.quantity}: {line.qty}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-line"
                      onClick={() => increase(line.id)}
                      aria-label={copy.increase}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn-line"
                      onClick={() => remove(line.id)}
                    >
                      {copy.remove}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Link href="/equipment#katalog" className="mt-6 inline-block text-sm font-semibold underline">
          {copy.continueBrowsing}
        </Link>
        <div className="mt-12">
          <QuoteRequest lang={lang} />
        </div>
      </div>
    </section>
  );
}
