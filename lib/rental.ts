/**
 * Hire period for the basket. `set` means the dates are a real inclusive range.
 * It is not a stock result and it must not be shown as free or reserved.
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export const deliveryIds = ["wynajem", "dostawa", "montaz"] as const;

export type DeliveryId = (typeof deliveryIds)[number];

export function isDeliveryId(value: string): value is DeliveryId {
  return (deliveryIds as readonly string[]).includes(value);
}

function civilUtc(value: string): number | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = Date.UTC(year, month - 1, day);
  const back = new Date(utc);
  if (
    back.getUTCFullYear() !== year ||
    back.getUTCMonth() !== month - 1 ||
    back.getUTCDate() !== day
  ) {
    return null;
  }
  return utc;
}

/** Inclusive civil-day count. The start and the end both count. */
export function inclusiveDays(start: string, end: string): number | null {
  const from = civilUtc(start);
  const to = civilUtc(end);
  if (from === null || to === null || to < from) return null;
  return (to - from) / 86_400_000 + 1;
}

export type PeriodCheck =
  | { state: "missing" }
  | { state: "invalid" }
  | { state: "set"; days: number };

export function checkPeriod(start: string, end: string): PeriodCheck {
  if (!start.trim() || !end.trim()) return { state: "missing" };
  const days = inclusiveDays(start, end);
  if (days === null) return { state: "invalid" };
  return { state: "set", days };
}
