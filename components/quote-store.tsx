"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const KEY = "onsite-quote";
const EVENT = "onsite-quote";

export type Line = { id: string; qty: number };

const empty: Line[] = [];
let cacheRaw = "";
let cacheLines: Line[] = empty;

export const MAX_QTY = 999;

export function clamp(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.floor(qty)));
}

function parse(raw: string): Line[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is Line =>
          !!line &&
          typeof line === "object" &&
          typeof (line as Line).id === "string" &&
          typeof (line as Line).qty === "number",
      )
      .map((line) => ({
        id: line.id,
        qty: clamp(line.qty),
      }));
  } catch {
    return [];
  }
}

function read(): Line[] {
  if (typeof window === "undefined") return empty;
  const raw = window.localStorage.getItem(KEY) ?? "";
  if (raw === cacheRaw) return cacheLines;
  cacheRaw = raw;
  cacheLines = parse(raw);
  return cacheLines;
}

function write(lines: Line[]) {
  const raw = JSON.stringify(lines);
  cacheRaw = raw;
  cacheLines = lines;
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
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  count: number;
};

const QuoteContext = createContext<QuoteApi | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, read, () => empty);
  const add = useCallback((id: string, qty: number) => {
    const next = clamp(qty);
    const current = read();
    const found = current.find((line) => line.id === id);
    if (found) {
      write(current.map((line) => (line.id === id ? { ...line, qty: next } : line)));
      return;
    }
    write([...current, { id, qty: next }]);
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    const next = clamp(qty);
    write(read().map((line) => (line.id === id ? { ...line, qty: next } : line)));
  }, []);
  const remove = useCallback((id: string) => {
    write(read().filter((line) => line.id !== id));
  }, []);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const value = useMemo(
    () => ({ lines, add, setQty, remove, count }),
    [lines, add, setQty, remove, count],
  );
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("QuoteProvider is missing");
  return value;
}
