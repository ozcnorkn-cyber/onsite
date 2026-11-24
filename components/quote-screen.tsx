"use client";

import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { productById } from "@/lib/catalogue";
import { checkPeriod, type DeliveryId } from "@/lib/rental";
import { AvailabilityCheck } from "./availability-check";
import { QuoteRequest } from "./quote-request";
import { MAX_QTY, useQuote } from "./quote-store";

export function QuoteScreen({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const { lines, setQty, remove, start, end, setPeriod, delivery, setDelivery } = useQuote();
  const rows = lines.flatMap((line) => {
    const product = productById(line.id);
    if (!product) return [];
    return [{ line, product }];
  });
  const period = checkPeriod(start, end);
  const chosen = copy.options.find((option) => option.id === delivery);

  return (
    <section id="quote" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-6 md:px-5">
      <h1 className="text-4xl font-medium tracking-tight">{copy.quoteTitle}</h1>
      <p className="mt-3 max-w-xl text-sm text-steel-deep">{copy.quoteNote}</p>
      {rows.length === 0 ? (
        <p className="mt-10 text-2xl">{copy.quoteEmpty}</p>
      ) : (
        <>
          <div className="mt-8 max-w-xl">
            <p className="text-sm text-steel-deep">{copy.onePeriod}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="field">
                {copy.rentalStart}
                <input type="date" value={start} onChange={(event) => setPeriod(event.target.value, end)} />
              </label>
              <label className="field">
                {copy.rentalEnd}
                <input type="date" value={end} onChange={(event) => setPeriod(start, event.target.value)} />
              </label>
            </div>
            <p className="mt-2 text-sm text-steel-deep">{copy.inclusiveNote}</p>
            {period.state === "set" ? (
              <p className="mt-2 text-sm font-semibold">
                {copy.hireDays}: {period.days}
              </p>
            ) : null}
            <AvailabilityCheck start={start} end={end} lang={lang} />
          </div>

          <ul className="mt-10 max-w-3xl">
            {rows.map(({ line, product }) => {
              const name = lang === "en" ? product.en : product.pl;
              return (
                <li key={line.id} className="mt-8 border-t border-ink pt-4">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <Link href={`/equipment/${product.category}/${product.id}`} className="piece-name">
                      {name}
                    </Link>
                    <div className="flex flex-wrap items-end gap-2">
                      <label className="field w-28">
                        {copy.quantity}
                        <input
                          type="number"
                          min={1}
                          max={MAX_QTY}
                          inputMode="numeric"
                          value={line.qty}
                          onChange={(event) => {
                            const next = Number(event.target.value);
                            if (Number.isFinite(next) && next >= 1) setQty(line.id, next);
                          }}
                        />
                      </label>
                      <button type="button" className="btn-line" onClick={() => remove(line.id)}>
                        {copy.remove}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">
                    <span className="text-steel-deep">{copy.rentalCharge}</span>
                    <span className="mt-1 block font-semibold">{copy.pricePreparing}</span>
                  </p>
                  <div className="relative mt-2 h-24 w-44">
                    <Image src={product.image} alt="" fill sizes="176px" className="plate object-contain object-left" />
                  </div>
                </li>
              );
            })}
          </ul>

          <fieldset className="mt-10 max-w-xl border-0 p-0">
            <legend className="text-lg font-semibold">{copy.optionsTitle}</legend>
            <div className="mt-3 grid gap-2">
              {copy.options.map((option) => (
                <label key={option.id} className="flex items-start gap-3 border border-ink/20 p-3">
                  <input
                    type="radio"
                    name="delivery"
                    className="mt-1"
                    checked={delivery === option.id}
                    onChange={() => setDelivery(option.id as DeliveryId)}
                  />
                  <span>
                    <span className="font-semibold">{option.title}</span>
                    <span className="mt-1 block text-sm">{option.body}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <dl className="mt-8 max-w-xl border-t border-ink">
            <Charge term={copy.rentalCharge} detail={copy.pricePreparing} />
            <Charge
              term={chosen ? chosen.title : copy.deliveryChoose}
              detail={chosen ? copy.pricePreparing : ""}
            />
            <Charge term={copy.depositLabel} detail={copy.depositPreparing} />
          </dl>
          <p className="mt-3 max-w-xl text-sm text-steel-deep">{copy.depositAside}</p>

          <div className="mt-12 max-w-xl">
            <QuoteRequest lang={lang} />
          </div>
        </>
      )}
      <Link href="/equipment#katalog" className="mt-8 inline-block text-lg">
        {copy.continueBrowsing}
      </Link>
    </section>
  );
}

function Charge({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink py-3">
      <dt className="font-semibold">{term}</dt>
      {detail ? <dd>{detail}</dd> : null}
    </div>
  );
}
