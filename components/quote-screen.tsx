"use client";

import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { productById } from "@/lib/catalogue";
import { QuoteRequest } from "./quote-request";
import { MAX_QTY, useQuote } from "./quote-store";

export function QuoteScreen({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const { lines, setQty, remove } = useQuote();
  const rows = lines.flatMap((line) => {
    const product = productById(line.id);
    if (!product) return [];
    return [{ line, product }];
  });

  return (
    <section id="quote" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-6 md:px-5">
      <h1 className="text-4xl font-medium tracking-tight">{copy.quoteTitle}</h1>
      <p className="mt-3 max-w-xl text-sm text-steel-deep">{copy.quoteNote}</p>
      {rows.length === 0 ? (
        <p className="mt-10 text-2xl">{copy.quoteEmpty}</p>
      ) : (
        <ul className="mt-10 max-w-3xl">
          {rows.map(({ line, product }) => {
            const name = lang === "en" ? product.en : product.pl;
            return (
              <li key={line.id} className="mt-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <Link
                    href={`/equipment/${product.category}/${product.id}`}
                    className="piece-name"
                  >
                    {name}
                  </Link>
                  <div className="flex flex-wrap items-end gap-2">
                    <label className="field w-28">
                      {copy.quantity}
                      <input
                        type="number"
                        min={1}
                        max={MAX_QTY}
                        inputMode="numeric"
                        value={line.qty}
                        onChange={(event) => {
                          const next = Number(event.target.value);
                          if (Number.isFinite(next) && next >= 1) setQty(line.id, next);
                        }}
                      />
                    </label>
                    <button type="button" className="btn-line" onClick={() => remove(line.id)}>
                      {copy.remove}
                    </button>
                  </div>
                </div>
                <div className="relative mt-2 h-24 w-44">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="176px"
                    className="plate object-contain object-left"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <Link href="/equipment#katalog" className="mt-8 inline-block text-lg">
        {copy.continueBrowsing}
      </Link>
      <div className="mt-12 max-w-xl">
        <QuoteRequest lang={lang} />
      </div>
    </section>
  );
}
