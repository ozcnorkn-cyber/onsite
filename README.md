# ON SITE

Public event-rental catalogue. Polish is the default language. English is a cookie switch (`onsite-lang`).

The catalogue has no prices and no checkout. The quote list and request form live on the equipment page. A submitted request stays in the browser. It is not sent, because no company email is published.

Warehouse category names that exist in the Dyżurek schema are marked in `lib/catalogue.ts`. Named products that are not in that inventory are marked there as catalogue placeholders. Those labels are not shown on the page. Product photos are generic catalogue images, not photographs of owned stock.

```bash
npm run dev
npm run lint
node scripts/check-claims.mjs
```
