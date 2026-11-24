"use client";

import { useState } from "react";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { checkPeriod } from "@/lib/rental";
import { AvailabilityCheck } from "./availability-check";
import { MAX_QTY, useQuote } from "./quote-store";

export function RentalPanel({ id, lang }: { id: string; lang: Lang }) {
  const copy = t(lang);
  const { start, end, setPeriod, add, lines } = useQuote();
  const line = lines.find((item) => item.id === id);
  const [qty, setQty] = useState(String(line?.qty ?? 1));
  const [error, setError] = useState("");
  const period = checkPeriod(start, end);

  function onAdd(event: React.FormEvent) {
    event.preventDefault();
    const check = checkPeriod(start, end);
    if (check.state === "missing") {
      setError(copy.availabilityMissing);
      return;
    }
    if (check.state === "invalid") {
      setError(copy.dateOrder);
      return;
    }
    const next = Number(qty);
    if (!Number.isFinite(next) || next < 1) return;
    add(id, next);
    setError("");
  }

  return (
    <form className="mt-6 max-w-md" onSubmit={onAdd}>
      <p className="text-sm text-steel-deep">{copy.onePeriod}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="field">
          {copy.rentalStart}
          <input
            type="date"
            value={start}
            onChange={(event) => setPeriod(event.target.value, end)}
            required
          />
        </label>
        <label className="field">
          {copy.rentalEnd}
          <input
            type="date"
            value={end}
            onChange={(event) => setPeriod(start, event.target.value)}
            required
          />
        </label>
      </div>
      <p className="mt-2 text-sm text-steel-deep">{copy.inclusiveNote}</p>
      {period.state === "set" ? (
        <p className="mt-2 text-sm font-semibold">
          {copy.hireDays}: {period.days}
        </p>
      ) : null}
      <AvailabilityCheck start={start} end={end} lang={lang} />
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="field w-28">
          {copy.quantity}
          <input
            type="number"
            min={1}
            max={MAX_QTY}
            inputMode="numeric"
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn">
          {copy.add}
        </button>
      </div>
      {line ? (
        <p className="mt-3 text-sm font-semibold">
          {copy.inQuote}: {line.qty}
        </p>
      ) : null}
      {error ? (
        <p className="mt-3 text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
