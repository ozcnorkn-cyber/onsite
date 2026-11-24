"use client";

import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { useQuote } from "./quote-store";

export function QuoteControls({ id, lang }: { id: string; lang: Lang }) {
  const copy = t(lang);
  const { lines, add } = useQuote();
  const line = lines.find((item) => item.id === id);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className="btn" onClick={() => add(id)}>
        {copy.add}
      </button>
      {line ? (
        <span className="text-sm text-steel-deep">
          {copy.inQuote}: {line.qty}
        </span>
      ) : null}
    </div>
  );
}
