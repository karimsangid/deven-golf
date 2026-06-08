"use client";

// ─────────────────────────────────────────────────────────────────────────
// DEVEN — the bag.
//
// TWO MODES, picked automatically from the environment:
//
//  • SHOPIFY (a Storefront token is configured) — the bag mirrors a real Shopify
//    cart: several pieces, any quantity, ONE secure checkout. Every change is
//    synced to Shopify and we surface the single `checkoutUrl`. Card entry runs
//    on Shopify's brand-themed checkout (PCI stays with Shopify).
//
//  • PAY-LINK (no Shopify token — the current live state) — the bag holds several
//    pieces, but payment runs on GoDaddy Pay Links, one product per payment, so
//    each line checks out on its own link. Identical to the shipping behaviour.
//
// State is mirrored to localStorage so the bag survives a refresh / PDP hop. In
// Shopify mode the `checkoutUrl` is always re-derived (never persisted): on load
// the saved items re-sync to a fresh Shopify cart.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  buildCart,
  shopifyEnabled,
  variantSku,
  type ShopifyMoney,
} from "@/lib/shopify";

export type BagItem = {
  id: string; // `${slug}__${size}` — line identity for merge / update / remove
  slug: string;
  name: string; // colourway name, e.g. "Silver Oak"
  styleLabel: string; // "Madison Collection" | "Big Chest Logo" | "Small Shoulder Logo"
  colorLabel: string; // customer-facing colour, e.g. "Silver Oak"
  size: string; // "S" | "M" | "L" | "XL"
  qty: number;
  price: number;
  image: string;
  payLink: string; // the SKU's GoDaddy Pay Link (pay-link mode fallback)
  sku: string; // `${slug}-${size}` — the Shopify variant SKU (shopify mode)
};

export type CartMode = "shopify" | "paylink";

type CartContextValue = {
  items: BagItem[];
  isOpen: boolean;
  mode: CartMode;
  count: number; // total units across all lines (for the nav badge)
  subtotal: number; // sum of line totals (informational)
  addItem: (item: Omit<BagItem, "id" | "qty" | "sku"> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  // ── Shopify mode ──
  /** The single unified Shopify checkout URL (null while empty / syncing). */
  checkoutUrl: string | null;
  /** True while the Shopify cart is being (re)built. */
  syncing: boolean;
  /** SKUs in the bag that aren't set up in Shopify yet (honest gap surface). */
  missingSkus: string[];
  // ── Pay-link mode ──
  /** The GoDaddy Pay Link a single line checks out through (size + qty appended). */
  checkoutHref: (item: BagItem) => string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "deven-bag-v2";
const MAX_QTY = 10;
const SYNC_DEBOUNCE_MS = 300;

const lineId = (slug: string, size: string) => `${slug}__${size}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Shopify-mode cart state (unused in pay-link mode).
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [shopSubtotal, setShopSubtotal] = useState<ShopifyMoney | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [missingSkus, setMissingSkus] = useState<string[]>([]);

  const mode: CartMode = shopifyEnabled ? "shopify" : "paylink";

  // Restore a saved bag on first mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as BagItem[]);
      }
    } catch {
      /* ignore corrupt / unavailable storage */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so the empty initial state doesn't wipe storage.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (items.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  // ── Shopify sync ──────────────────────────────────────────────────────────
  // On any bag change (after hydration), rebuild the Shopify cart and capture
  // the fresh checkout URL + live subtotal. Debounced so rapid qty taps coalesce
  // into one request. A stale-guard drops out-of-order responses.
  const syncSeq = useRef(0);
  useEffect(() => {
    if (mode !== "shopify" || !hydrated) return;

    if (items.length === 0) {
      setCheckoutUrl(null);
      setShopSubtotal(null);
      setMissingSkus([]);
      setSyncing(false);
      return;
    }

    const seq = ++syncSeq.current;
    setSyncing(true);
    const timer = setTimeout(async () => {
      try {
        const lines = items.map((it) => ({ sku: it.sku, quantity: it.qty }));
        const { cart, missingSkus: missing } = await buildCart(lines);
        if (seq !== syncSeq.current) return; // superseded
        setCheckoutUrl(cart?.checkoutUrl ?? null);
        setShopSubtotal(cart?.subtotal ?? null);
        setMissingSkus(missing);
      } catch {
        if (seq !== syncSeq.current) return;
        setCheckoutUrl(null); // surfaces as a soft "try again" in the drawer
      } finally {
        if (seq === syncSeq.current) setSyncing(false);
      }
    }, SYNC_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [items, mode, hydrated]);

  const addItem = useCallback(
    (next: Omit<BagItem, "id" | "qty" | "sku"> & { qty?: number }) => {
      const id = lineId(next.slug, next.size);
      const sku = variantSku(next.slug, next.size);
      const addQty = next.qty ?? 1;
      setItems((cur) => {
        const existing = cur.find((it) => it.id === id);
        if (existing) {
          return cur.map((it) =>
            it.id === id
              ? { ...it, qty: Math.min(MAX_QTY, it.qty + addQty) }
              : it
          );
        }
        return [...cur, { ...next, id, sku, qty: Math.min(MAX_QTY, addQty) }];
      });
      setIsOpen(true);
    },
    []
  );

  const setQty = useCallback((id: string, qty: number) => {
    setItems((cur) =>
      cur.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : it
      )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((cur) => cur.filter((it) => it.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const checkoutHref = useCallback(
    (item: BagItem) =>
      `${item.payLink}?size=${encodeURIComponent(item.size)}&quantity=${item.qty}`,
    []
  );

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );
  // Local subtotal is the instant figure; in Shopify mode the live cart subtotal
  // (taxes/discounts aside) replaces it once the sync resolves.
  const localSubtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const subtotal =
    mode === "shopify" && shopSubtotal ? shopSubtotal.amount : localSubtotal;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        mode,
        count,
        subtotal,
        addItem,
        setQty,
        removeItem,
        clear,
        open,
        close,
        checkoutUrl,
        syncing,
        missingSkus,
        checkoutHref,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
