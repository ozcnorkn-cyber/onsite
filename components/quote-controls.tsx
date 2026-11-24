"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { MAX_QTY, useQuote } from "./quote-store";

export function QuoteControls({
  id,
  lang,
  fullWidth = false,
}: {
  id: string;
  lang: Lang;
  fullWidth?: boolean;
}) {
  const copy = t(lang);
  const { lines, add } = useQuote();
  const line = lines.find((item) => item.id === id);
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? String(line?.qty ?? 1);

  function commit(raw: string) {
    const qty = Number(raw);
    if (!Number.isFinite(qty) || qty < 1) return;
    add(id, qty);
    setDraft(null);
  }

  return (
    <form
      className={fullWidth ? "flex flex-col items-stretch gap-2" : "flex flex-wrap items-end gap-3"}
      onSubmit={(event) => {
        event.preventDefault();
        commit(shown);
      }}
    >
      <label className={fullWidth ? "field" : "field w-28"}>
        {copy.quantity}
        <input
          type="number"
          min={1}
          max={MAX_QTY}
          inputMode="numeric"
          value={shown}
          onChange={(event) => setDraft(event.target.value)}
          required
        />
      </label>
      <button type="submit" className={fullWidth ? "btn w-full" : "btn"}>
        {copy.add}
      </button>
      {line ? (
        <Link href="/quote" className="pb-3 text-sm font-semibold text-ink underline">
          {copy.inQuote}: {line.qty}
        </Link>
      ) : null}
    </form>
  );
}
