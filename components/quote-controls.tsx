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
  compact = false,
}: {
  id: string;
  lang: Lang;
  fullWidth?: boolean;
  compact?: boolean;
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
      className={
        compact
          ? "flex flex-wrap items-end gap-2 [&_input]:px-2 [&_input]:py-1.5"
          : fullWidth
            ? "flex flex-col items-stretch gap-2"
            : "flex flex-wrap items-end gap-3"
      }
      onSubmit={(event) => {
        event.preventDefault();
        commit(shown);
      }}
    >
      <label className={compact ? "field w-[4.25rem] text-xs" : fullWidth ? "field" : "field w-28"}>
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
      <button
        type="submit"
        className={
          compact
            ? "btn min-h-0 flex-1 px-2 py-2 text-[0.68rem]"
            : fullWidth
              ? "btn w-full"
              : "btn"
        }
      >
        {compact ? copy.addShort : copy.add}
      </button>
      {line ? (
        <Link
          href="/quote"
          className={
            compact
              ? "basis-full text-xs font-semibold underline"
              : "pb-3 text-sm font-semibold text-ink underline"
          }
        >
          {copy.inQuote}: {line.qty}
        </Link>
      ) : null}
    </form>
  );
}
