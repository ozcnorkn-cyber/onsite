"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { catalogueMatches } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";

export function CatalogSearch({ lang, id }: { lang: Lang; id: string }) {
  const copy = t(lang);
  const router = useRouter();
  const params = useSearchParams();
  const qParam = params.get("q") ?? "";
  const [override, setOverride] = useState<string | null>(null);
  if (override !== null && override.trim() === qParam) setOverride(null);
  const draft = override ?? qParam;
  const timer = useRef<number | null>(null);
  const trimmed = draft.trim();
  const { categories, products } = catalogueMatches(trimmed);
  const open = trimmed.length > 0;

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function commit(value: string) {
    const next = value.trim();
    const href = next ? `/equipment?q=${encodeURIComponent(next)}` : "/equipment";
    router.replace(href, { scroll: false });
  }

  function onChange(value: string) {
    setOverride(value);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => commit(value), 250);
  }

  return (
    <div className="relative min-w-0 flex-1">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (timer.current !== null) window.clearTimeout(timer.current);
          commit(draft);
        }}
      >
        <label className="sr-only" htmlFor={id}>
          {copy.searchLabel}
        </label>
        <input
          id={id}
          type="search"
          value={draft}
          autoComplete="off"
          placeholder={copy.searchPlaceholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full min-w-0 border border-ink bg-white px-3 py-2 text-sm text-ink"
        />
      </form>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-96 overflow-auto border border-ink bg-white">
          {categories.length === 0 && products.length === 0 ? (
            <p className="px-3 py-3 text-sm">{copy.noResults}</p>
          ) : (
            <ul>
              {categories.map((category) => {
                const name = lang === "en" ? category.en : category.pl;
                return (
                  <li key={category.id} className="border-b border-ink/10">
                    <Link href={`/equipment/${category.id}`} className="block px-3 py-2 text-sm font-semibold">
                      {name}
                    </Link>
                  </li>
                );
              })}
              {products.map((product) => {
                const name = lang === "en" ? product.en : product.pl;
                const size = lang === "en" ? product.sizeEn : product.sizePl;
                return (
                  <li key={product.id} className="border-b border-ink/10 last:border-b-0">
                    <Link
                      href={`/equipment/${product.category}/${product.id}`}
                      className="block px-3 py-2 text-sm"
                    >
                      <span className="font-semibold">{name}</span>
                      {size ? <span className="mt-0.5 block text-steel-deep">{size}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
