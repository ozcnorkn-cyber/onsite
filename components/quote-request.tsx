"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { productById } from "@/lib/catalogue";
import { useQuote } from "./quote-store";

const STORE = "onsite-enquiries";

export function QuoteRequest({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const { lines } = useQuote();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [copied, setCopied] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const customerType = String(data.get("customerType") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const start = String(data.get("start") ?? "").trim();
    const end = String(data.get("end") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !customerType || !start || !end || !location) {
      setError(copy.required);
      setSaved("");
      return;
    }
    if (lines.length === 0 && !message) {
      setError(copy.messageHint);
      setSaved("");
      return;
    }
    if (end < start) {
      setError(copy.dateOrder);
      setSaved("");
      return;
    }

    const items = lines.flatMap((line) => {
      const product = productById(line.id);
      if (!product) return [];
      return [
        {
          id: product.id,
          name: lang === "en" ? product.en : product.pl,
          qty: line.qty,
        },
      ];
    });
    const record = {
      at: new Date().toISOString(),
      name,
      email,
      customerType,
      company,
      phone,
      start,
      end,
      location,
      message,
      items,
      sent: false,
    };
    const previous = window.localStorage.getItem(STORE);
    const list = previous ? (JSON.parse(previous) as unknown[]) : [];
    list.push(record);
    window.localStorage.setItem(STORE, JSON.stringify(list));
    const text = [
      name,
      email,
      customerType,
      company,
      phone,
      `${start} – ${end}`,
      location,
      message,
      ...items.map((item) => `${item.qty} × ${item.name}`),
    ]
      .filter(Boolean)
      .join("\n");
    setSaved(text);
    setError("");
    setCopied(false);
    form.reset();
  }

  async function copyText() {
    await navigator.clipboard.writeText(saved);
    setCopied(true);
  }

  return (
    <div>
      <h3 className="display text-2xl">{copy.requestTitle}</h3>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <label className="field">
          {copy.fullName}
          <input name="name" autoComplete="name" required />
        </label>
        <label className="field">
          {copy.email}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          {copy.customerType}
          <select name="customerType" required defaultValue="">
            <option value="" disabled>
              {copy.customerType}
            </option>
            {copy.types.map((type) => (
              <option key={type.id} value={type.label}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          {copy.companyName} ({copy.optional})
          <input name="company" autoComplete="organization" />
        </label>
        <label className="field">
          {copy.phone} ({copy.optional})
          <input name="phone" type="text" autoComplete="tel" />
        </label>
        <label className="field">
          {copy.deliveryLocation}
          <input name="location" required />
        </label>
        <label className="field">
          {copy.rentalStart}
          <input name="start" type="date" required />
        </label>
        <label className="field">
          {copy.rentalEnd}
          <input name="end" type="date" required />
        </label>
        <label className="field md:col-span-2">
          {copy.message}
          <span className="text-steel-deep"> {copy.messageHint}</span>
          <textarea name="message" rows={4} />
        </label>
        {error ? (
          <p className="text-sm md:col-span-2" role="alert">
            {error}
          </p>
        ) : null}
        <div className="md:col-span-2">
          <button type="submit" className="btn">
            {copy.submit}
          </button>
        </div>
      </form>
      {saved ? (
        <div className="mt-8 border border-ink p-5">
          <p className="font-semibold">{copy.notSentTitle}</p>
          <p className="mt-2 text-sm">{copy.notSentBody}</p>
          <pre className="mt-4 whitespace-pre-wrap text-sm">{saved}</pre>
          <button type="button" className="btn-line mt-4" onClick={copyText}>
            {copied ? copy.copied : copy.copyRequest}
          </button>
        </div>
      ) : null}
    </div>
  );
}
