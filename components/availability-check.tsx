"use client";

import { useState } from "react";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { checkPeriod } from "@/lib/rental";

export function AvailabilityCheck({ start, end, lang }: { start: string; end: string; lang: Lang }) {
  const copy = t(lang);
  const [checked, setChecked] = useState<string | null>(null);
  const stamp = `${start}|${end}`;
  const result = checked === stamp ? checkPeriod(start, end) : null;
  const message =
    result?.state === "missing"
      ? copy.availabilityMissing
      : result?.state === "invalid"
        ? copy.dateOrder
        : result?.state === "set"
          ? copy.availabilityUnchecked
          : "";

  return (
    <div className="mt-3">
      <button type="button" className="btn-line" onClick={() => setChecked(stamp)}>
        {copy.checkDates}
      </button>
      {message ? (
        <p className="mt-3 max-w-xl text-sm" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
