"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";

export function LanguageSwitch({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const router = useRouter();

  function choose(next: Lang) {
    document.cookie = `onsite-lang=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
      <button
        type="button"
        onClick={() => choose("pl")}
        className={lang === "pl" ? "text-ink" : "text-steel"}
        aria-pressed={lang === "pl"}
      >
        {copy.langPl}
      </button>
      <span className="text-steel">/</span>
      <button
        type="button"
        onClick={() => choose("en")}
        className={lang === "en" ? "text-ink" : "text-steel"}
        aria-pressed={lang === "en"}
      >
        {copy.langEn}
      </button>
    </div>
  );
}
