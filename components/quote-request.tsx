"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { productById } from "@/lib/catalogue";
import { checkPeriod } from "@/lib/rental";
import { useQuote } from "./quote-store";

const STORE = "onsite-enquiries";

export function QuoteRequest({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const { lines, start, end, delivery } = useQuote();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [copied, setCopied] = useState(false);
  const chosen = copy.options.find((option) => option.id === delivery);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const customerType = String(data.get("customerType") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const period = checkPeriod(start, end);

    if (!name || !email || !customerType || !location) {
      setError(copy.required);
      setSaved("");
      return;
    }
    if (period.state === "missing") {
      setError(copy.availabilityMissing);
      setSaved("");
      return;
    }
    if (period.state === "invalid") {
      setError(copy.dateOrder);
      setSaved("");
      return;
    }
    if (!chosen) {
      setError(copy.deliveryChoose);
      setSaved("");
      return;
    }

    const items = lines.flatMap((line) => {
      const product = productById(line.id);
      if (!product) return [];
      return [{ id: product.id, name: lang === "en" ? product.en : product.pl, qty: line.qty }];
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
      days: period.days,
      delivery: chosen.id,
      location,
      message,
      items,
      rentalCharge: null,
      deposit: null,
      sent: false,
      reserves: false,
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
      chosen.title,
      location,
      message,
      ...items.map((item) => `${item.qty} × ${item.name}`),
      `${copy.rentalCharge}: ${copy.pricePreparing}`,
      `${copy.depositLabel}: ${copy.depositPreparing}`,
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
      <h2 className="text-2xl font-medium tracking-tight">{copy.requestTitle}</h2>
      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
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
        <label className="field sm:col-span-2">
          {copy.message}
          <textarea name="message" rows={4} />
        </label>
        {error ? (
          <p className="text-sm sm:col-span-2" role="alert">
            {error}
          </p>
        ) : null}
        <div className="sm:col-span-2">
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
