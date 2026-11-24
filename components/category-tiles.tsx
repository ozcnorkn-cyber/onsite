"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navCategories, type Category } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

function shiftFrom(event: React.MouseEvent<HTMLAnchorElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const box = event.currentTarget.getBoundingClientRect();
  return {
    x: ((event.clientX - box.left) / box.width - 0.5) * 12,
    y: ((event.clientY - box.top) / box.height - 0.5) * 8,
  };
}

function Tile({ category, lang }: { category: Category; lang: Lang }) {
  const name = lang === "en" ? category.en : category.pl;
  const [shift, setShift] = useState({ x: 0, y: 0 });
  return (
    <Link
      href={`/equipment/${category.id}`}
      className="block"
      onMouseMove={(event) => {
        const next = shiftFrom(event);
        if (next) setShift(next);
      }}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
    >
      <div className="clip-frame aspect-[4/3] bg-paper">
        {category.image ? (
          <Image
            src={category.image}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
            style={{
              transform: `translate3d(${shift.x}px, ${shift.y}px, 0) scale(1.08)`,
              transition: "transform 180ms ease-out",
              objectPosition: category.imagePosition ?? "center",
            }}
          />
        ) : null}
      </div>
      <span className="mt-2 block text-base font-semibold leading-tight tracking-tight">{name}</span>
    </Link>
  );
}

function PhotoCredit({ lang }: { lang: Lang }) {
  const bins = "https://commons.wikimedia.org/wiki/File:Three_Metal_Trash_Cans_-_DeKalb_County,_Tennessee_-_June_24,_2014.jpg";
  const heater = "https://commons.wikimedia.org/wiki/File:Oil_heater_135940.jpg";
  const by = "https://creativecommons.org/licenses/by/4.0/";
  const bysa = "https://creativecommons.org/licenses/by-sa/4.0/";
  if (lang === "en") {
    return (
      <p className="mt-4 text-xs leading-5 text-steel-deep">
        Category photos: Pexels. Tent: rawpixel, CC0. Bins:{" "}
        <a className="underline" href={bins}>
          Lee Ann Ratledge
        </a>
        ,{" "}
        <a className="underline" href={by}>
          CC BY 4.0
        </a>
        . Heater crop:{" "}
        <a className="underline" href={heater}>
          لا روسا
        </a>
        ,{" "}
        <a className="underline" href={bysa}>
          CC BY-SA 4.0
        </a>
        .
      </p>
    );
  }
  return (
    <p className="mt-4 text-xs leading-5 text-steel-deep">
      Zdjęcia kategorii: Pexels. Namiot: rawpixel, CC0. Kosze:{" "}
      <a className="underline" href={bins}>
        Lee Ann Ratledge
      </a>
      ,{" "}
      <a className="underline" href={by}>
        CC BY 4.0
      </a>
      . Kadr grzejnika:{" "}
      <a className="underline" href={heater}>
        لا روسا
      </a>
      ,{" "}
      <a className="underline" href={bysa}>
        CC BY-SA 4.0
      </a>
      .
    </p>
  );
}

/** Homepage only. Four equal tiles, then three of the same width, centred. */
export function CategoryTiles({ lang }: { lang: Lang }) {
  const tiles = navCategories();
  const last = tiles.length - 1;
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 md:hidden">
        {tiles.map((category, index) => (
          <li key={category.id} className={index === last ? "col-span-2 flex justify-center" : undefined}>
            <div className={index === last ? "w-[calc((100%-1rem)/2)]" : "w-full"}>
              <Tile category={category} lang={lang} />
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden md:block">
        <ul className="grid grid-cols-4 gap-4">
          {tiles.slice(0, 4).map((category) => (
            <li key={category.id}>
              <Tile category={category} lang={lang} />
            </li>
          ))}
        </ul>
        {tiles.length > 4 ? (
          <ul className="mt-4 flex justify-center gap-4">
            {tiles.slice(4).map((category) => (
              <li key={category.id} className="w-[calc((100%-3rem)/4)]">
                <Tile category={category} lang={lang} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <PhotoCredit lang={lang} />
    </div>
  );
}

export function CategoryBar({ lang, current }: { lang: Lang; current?: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {navCategories().map((category) => {
        const name = lang === "en" ? category.en : category.pl;
        const active = category.id === current;
        return (
          <li key={category.id}>
            <Link
              href={`/equipment/${category.id}`}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "inline-block border border-ink bg-ink px-3 py-1 text-sm font-semibold text-white"
                  : "inline-block border border-ink/30 px-3 py-1 text-sm font-semibold"
              }
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
