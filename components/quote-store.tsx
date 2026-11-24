"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { isDeliveryId, type DeliveryId } from "@/lib/rental";

const KEY = "onsite-quote";
const EVENT = "onsite-quote";

export type Line = { id: string; qty: number };

export type OrderDraft = {
  lines: Line[];
  start: string;
  end: string;
  delivery: DeliveryId | "";
};

const emptyOrder: OrderDraft = { lines: [], start: "", end: "", delivery: "" };

export const MAX_QTY = 999;

export function clamp(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.floor(qty)));
}

function parseLines(value: unknown): Line[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (line): line is Line =>
        !!line &&
        typeof line === "object" &&
        typeof (line as Line).id === "string" &&
        typeof (line as Line).qty === "number",
    )
    .map((line) => ({ id: line.id, qty: clamp(line.qty) }));
}

function parse(raw: string): OrderDraft {
  if (!raw) return emptyOrder;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return { ...emptyOrder, lines: parseLines(parsed) };
    if (!parsed || typeof parsed !== "object") return emptyOrder;
    const record = parsed as Partial<OrderDraft>;
    const delivery = typeof record.delivery === "string" && isDeliveryId(record.delivery) ? record.delivery : "";
    return {
      lines: parseLines(record.lines),
      start: typeof record.start === "string" ? record.start : "",
      end: typeof record.end === "string" ? record.end : "",
      delivery,
    };
  } catch {
    return emptyOrder;
  }
}

let cacheRaw = "";
let cacheOrder: OrderDraft = emptyOrder;

function read(): OrderDraft {
  if (typeof window === "undefined") return emptyOrder;
  const raw = window.localStorage.getItem(KEY) ?? "";
  if (raw === cacheRaw) return cacheOrder;
  cacheRaw = raw;
  cacheOrder = parse(raw);
  return cacheOrder;
}

function write(order: OrderDraft) {
  const raw = JSON.stringify(order);
  cacheRaw = raw;
  cacheOrder = order;
  window.localStorage.setItem(KEY, raw);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onStoreChange: () => void) {
  const notify = () => onStoreChange();
  window.addEventListener(EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

type QuoteApi = {
  lines: Line[];
  start: string;
  end: string;
  delivery: DeliveryId | "";
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  setPeriod: (start: string, end: string) => void;
  setDelivery: (delivery: DeliveryId | "") => void;
  count: number;
};

const QuoteContext = createContext<QuoteApi | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const order = useSyncExternalStore(subscribe, read, () => emptyOrder);
  const add = useCallback((id: string, qty: number) => {
    const next = clamp(qty);
    const current = read();
    const found = current.lines.find((line) => line.id === id);
    const lines = found
      ? current.lines.map((line) => (line.id === id ? { ...line, qty: next } : line))
      : [...current.lines, { id, qty: next }];
    write({ ...current, lines });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    const current = read();
    write({
      ...current,
      lines: current.lines.map((line) => (line.id === id ? { ...line, qty: clamp(qty) } : line)),
    });
  }, []);
  const remove = useCallback((id: string) => {
    const current = read();
    write({ ...current, lines: current.lines.filter((line) => line.id !== id) });
  }, []);
  const setPeriod = useCallback((start: string, end: string) => {
    write({ ...read(), start, end });
  }, []);
  const setDelivery = useCallback((delivery: DeliveryId | "") => {
    write({ ...read(), delivery });
  }, []);
  const count = order.lines.reduce((sum, line) => sum + line.qty, 0);
  const value = useMemo(
    () => ({
      lines: order.lines,
      start: order.start,
      end: order.end,
      delivery: order.delivery,
      add,
      setQty,
      remove,
      setPeriod,
      setDelivery,
      count,
    }),
    [order, add, setQty, remove, setPeriod, setDelivery, count],
  );
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("QuoteProvider is missing");
  return value;
}
