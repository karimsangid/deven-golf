"use client";

// ─────────────────────────────────────────────────────────────────────────
// DEVEN — multi-item bag.
//
// The bag can hold several different pieces (any colour / style / size). Each
// distinct piece is its own line (same SKU + same size = same line, quantity
// bumps; a different size or colour is a new line).
//
// ⚠️ CHECKOUT REALITY: payment runs on GoDaddy Pay Links, and a Pay Link is a
// single fixed-price product checkout — it CANNOT ring up a mixed cart in one
// payment. So checkout is PER LINE: each piece opens its own Pay Link and is
// paid separately. (A true one-payment multi-item cart needs the full GoDaddy
// Online Store — the planned swap to devenbrand.shop. See cart UI for the note.)
//
// State is mirrored to localStorage so the bag survives a refresh / PDP hop.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  payLink: string; // the SKU's GoDaddy Pay Link
};

type CartContextValue = {
  items: BagItem[];
  isOpen: boolean;
  count: number; // total units across all lines (for the nav badge)
  subtotal: number; // sum of line totals (informational)
  addItem: (item: Omit<BagItem, "id" | "qty"> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  /** The GoDaddy Pay Link a single line checks out through (size + qty appended). */
  checkoutHref: (item: BagItem) => string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "deven-bag-v2";
const MAX_QTY = 10;

const lineId = (slug: string, size: string) => `${slug}__${size}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

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

  const addItem = useCallback(
    (next: Omit<BagItem, "id" | "qty"> & { qty?: number }) => {
      const id = lineId(next.slug, next.size);
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
        return [...cur, { ...next, id, qty: Math.min(MAX_QTY, addQty) }];
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
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        count,
        subtotal,
        addItem,
        setQty,
        removeItem,
        clear,
        open,
        close,
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
