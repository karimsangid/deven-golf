#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// DEVEN — inventory tracker
//
// One source of truth for live stock (inventory.json). When an order comes in
// it decrements the right SKU/size, and when any size drops to or below the
// low-stock threshold it emails an alert so you can restock before you sell
// out. The order-recording function is provider-agnostic: call recordOrder()
// from a Stripe / checkout webhook, a GoDaddy order hook, or the CLI below.
//
// USAGE (CLI)
//   node stock.mjs status                 → full stock table + total units
//   node stock.mjs low                    → just the low / out-of-stock sizes
//   node stock.mjs order <sku> <size> <n> → record a sale (decrements + alerts)
//   node stock.mjs check                  → email a low-stock report now
//   node stock.mjs restock <sku> <size> <n> → add units back
//
// EMAIL (low-stock alerts) — set these env vars:
//   RESEND_API_KEY   your Resend API key
//   STOCK_ALERT_TO   where alerts go        (default info@devonbrand.shop)
//   STOCK_ALERT_FROM verified sender        (default DEVEN <info@devonbrand.shop>)
// Without RESEND_API_KEY the alert is logged to the console instead of sent.
// ─────────────────────────────────────────────────────────────────────────

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const DB = join(HERE, "inventory.json");

const ALERT_TO = process.env.STOCK_ALERT_TO || "info@devonbrand.shop";
const ALERT_FROM = process.env.STOCK_ALERT_FROM || "DEVEN <info@devonbrand.shop>";

// ── storage ────────────────────────────────────────────────────────────────
export async function load() {
  return JSON.parse(await readFile(DB, "utf8"));
}

export async function save(inv) {
  inv.updatedAt = new Date().toISOString().slice(0, 10);
  await writeFile(DB, JSON.stringify(inv, null, 2) + "\n");
}

// ── queries ──────────────────────────────────────────────────────────────
export function totalUnits(inv) {
  let n = 0;
  for (const sku of Object.values(inv.skus))
    for (const q of Object.values(sku.sizes)) n += q;
  return n;
}

// Sizes at or below the threshold (qty 0 included → "OUT").
export function lowStock(inv) {
  const t = inv.lowStockThreshold ?? 3;
  const out = [];
  for (const [id, sku] of Object.entries(inv.skus)) {
    for (const [size, qty] of Object.entries(sku.sizes)) {
      if (qty <= t)
        out.push({ id, name: sku.name, style: sku.style, size, qty });
    }
  }
  return out.sort((a, b) => a.qty - b.qty);
}

// ── mutations ──────────────────────────────────────────────────────────────
// items: [{ sku, size, qty }]. Decrements stock; throws if a line can't be
// fulfilled (insufficient or unknown SKU/size) — caller should treat a throw as
// "do not capture payment / flag the order". Returns the low-stock sizes that
// resulted, so the caller can decide to alert.
export async function recordOrder(items) {
  const inv = await load();

  // validate everything first — all-or-nothing
  for (const { sku, size, qty } of items) {
    const s = inv.skus[sku];
    if (!s) throw new Error(`Unknown SKU: ${sku}`);
    const have = s.sizes[size] ?? 0;
    if (qty <= 0) throw new Error(`Invalid qty for ${sku}/${size}: ${qty}`);
    if (have < qty)
      throw new Error(
        `Insufficient stock for ${sku} ${size}: need ${qty}, have ${have}`
      );
  }

  for (const { sku, size, qty } of items) {
    inv.skus[sku].sizes[size] -= qty;
  }
  await save(inv);

  const t = inv.lowStockThreshold ?? 3;
  const triggered = [];
  for (const { sku, size } of items) {
    const qty = inv.skus[sku].sizes[size];
    if (qty <= t)
      triggered.push({
        id: sku,
        name: inv.skus[sku].name,
        style: inv.skus[sku].style,
        size,
        qty,
      });
  }
  if (triggered.length) await sendLowStockEmail(triggered, inv);
  return { inventory: inv, lowStock: triggered };
}

export async function restock(sku, size, qty) {
  const inv = await load();
  const s = inv.skus[sku];
  if (!s) throw new Error(`Unknown SKU: ${sku}`);
  s.sizes[size] = (s.sizes[size] ?? 0) + qty;
  await save(inv);
  return inv;
}

// ── email ────────────────────────────────────────────────────────────────
export async function sendLowStockEmail(items, inv) {
  const t = (inv ?? (await load())).lowStockThreshold ?? 3;
  const rows = items
    .map(
      (i) =>
        `  • ${i.name} — ${i.style} — size ${i.size}: ${
          i.qty === 0 ? "OUT OF STOCK" : `${i.qty} left`
        }`
    )
    .join("\n");
  const subject =
    items.some((i) => i.qty === 0)
      ? "DEVEN — item OUT OF STOCK"
      : "DEVEN — low stock alert";
  const text =
    `These sizes are at or below the alert threshold (${t}):\n\n${rows}\n\n` +
    `Restock soon. — DEVEN inventory tracker`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`\n[low-stock] (RESEND_API_KEY not set — printing instead)`);
    console.log(`To: ${ALERT_TO}\nSubject: ${subject}\n\n${text}\n`);
    return { sent: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: ALERT_FROM, to: ALERT_TO, subject, text }),
  });
  if (!res.ok)
    throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
  return { sent: true };
}

// ── CLI ────────────────────────────────────────────────────────────────────
function printStatus(inv) {
  for (const [id, sku] of Object.entries(inv.skus)) {
    const sizes = Object.entries(sku.sizes);
    const line = sizes.length
      ? sizes.map(([s, q]) => `${s}:${q}`).join("  ")
      : "(sold out)";
    console.log(`${id.padEnd(20)} ${sku.name} · ${sku.style}`);
    console.log(`  ${line}`);
  }
  console.log(`\nTotal units: ${totalUnits(inv)}`);
  console.log(`Low-stock threshold: ${inv.lowStockThreshold}`);
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  try {
    if (!cmd || cmd === "status") {
      printStatus(await load());
    } else if (cmd === "low") {
      const low = lowStock(await load());
      if (!low.length) return console.log("Nothing low. ✓");
      for (const i of low)
        console.log(
          `${i.qty === 0 ? "OUT " : String(i.qty).padStart(3)} · ${i.name} ${i.style} ${i.size}`
        );
    } else if (cmd === "order") {
      const [sku, size, qty] = args;
      if (!sku || !size) throw new Error("usage: order <sku> <size> [qty=1]");
      const { lowStock: low } = await recordOrder([
        { sku, size, qty: Number(qty) || 1 },
      ]);
      console.log(`Recorded. ${low.length ? `Low now: ${low.map((i) => `${i.id}/${i.size}=${i.qty}`).join(", ")}` : "Stock healthy."}`);
    } else if (cmd === "restock") {
      const [sku, size, qty] = args;
      if (!sku || !size || !qty) throw new Error("usage: restock <sku> <size> <qty>");
      await restock(sku, size, Number(qty));
      console.log("Restocked.");
    } else if (cmd === "check") {
      const low = lowStock(await load());
      if (!low.length) return console.log("Nothing low — no email sent. ✓");
      const r = await sendLowStockEmail(low);
      console.log(r.sent ? `Alert emailed to ${ALERT_TO}.` : "Printed (no API key).");
    } else {
      console.log("commands: status | low | order <sku> <size> [qty] | restock <sku> <size> <qty> | check");
    }
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
}

// run as CLI only (not when imported)
if (process.argv[1] && process.argv[1].endsWith("stock.mjs")) main();
