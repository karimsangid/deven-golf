# DEVEN — inventory tracker

Single source of truth for live stock + automatic low-stock email alerts.

- **`inventory.json`** — current stock per SKU/size. Seeded with the 107-unit
  launch inventory (1 hoodie · 4 colours · 2 logo styles).
- **`stock.mjs`** — the engine. Decrements stock on an order, emails an alert
  when any size drops to/below the threshold, and a small CLI for manual use.

## CLI

```bash
node stock.mjs status                  # full stock table + total units
node stock.mjs low                     # just the low / out-of-stock sizes
node stock.mjs order <sku> <size> [n]  # record a sale (decrements + alerts)
node stock.mjs restock <sku> <size> n  # add units back
node stock.mjs check                   # email a low-stock report right now
```

SKU ids: `yellow-shoulder`, `yellow-chest`, `gray-shoulder`, `gray-chest`,
`light-blue-shoulder`, `light-blue-chest`, `navy-shoulder`, `navy-chest`.

## Low-stock email

Set these env vars (otherwise the alert just prints to the console):

| var | meaning | default |
|---|---|---|
| `RESEND_API_KEY` | Resend API key | — (prints if unset) |
| `STOCK_ALERT_TO` | where alerts go | `info@devonbrand.shop` |
| `STOCK_ALERT_FROM` | verified sender | `DEVEN <info@devonbrand.shop>` |

The threshold lives in `inventory.json` → `lowStockThreshold` (default 3).

## Wiring it to checkout

`recordOrder([{ sku, size, qty }])` is the integration point. Call it from the
order/checkout webhook once payment succeeds:

```js
import { recordOrder } from "./inventory/stock.mjs";
// in your Stripe / GoDaddy / checkout webhook handler:
await recordOrder(lineItems); // throws if a line can't be fulfilled → flag the order
```

It validates the whole order first (all-or-nothing), decrements, persists, and
emails the alert automatically if anything went low.

## Production note

On Vercel's serverless runtime the filesystem is ephemeral, so `inventory.json`
won't persist across requests there. For the live store, point `load()` /
`save()` at a real datastore (Vercel KV / Postgres / Supabase). The rest of the
engine — validation, decrement, thresholds, email — stays exactly the same.
This is the piece that hooks into whichever order backend we settle on.
