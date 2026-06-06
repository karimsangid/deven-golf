"use client";

// ─────────────────────────────────────────────────────────────────────────
// DEVEN — custom single-item bag.
//
// The site keeps its own branded checkout experience; payment itself runs on
// GoDaddy. Each SKU is its own GoDaddy Pay Link (a single fixed-price product
// checkout), so the bag holds ONE configured piece at a time — pick a colour /
// style / size, review it in the branded drawer, then "Checkout" hands off to
// that piece's GoDaddy Pay Link. Adding a different piece replaces the current
// selection (one item = one payment — Pay Links can't combine a multi-item
// cart into a single payment).
//
// State is mirrored to localStorage so the bag survives a refresh / PDP hop.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type BagItem = {
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
  item: BagItem | null;
  isOpen: boolean;
  /** Build the GoDaddy Pay Link the Checkout button opens (size + qty appended). */
  checkoutHref: string | null;
  addItem: (item: Omit<BagItem, "qty"> & { qty?: number }) => void;
  setQty: (qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "deven-bag-v1";
const MAX_QTY = 10;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<BagItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore a saved selection on first mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItem(JSON.parse(raw) as BagItem);
    } catch {
      /* ignore corrupt / unavailable storage */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so the empty initial state doesn't wipe storage.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (item) localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [item, hydrated]);

  const addItem = useCallback(
    (next: Omit<BagItem, "qty"> & { qty?: number }) => {
      setItem({ qty: 1, ...next });
      setIsOpen(true);
    },
    []
  );

  const setQty = useCallback((qty: number) => {
    setItem((cur) =>
      cur ? { ...cur, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : cur
    );
  }, []);

  const clear = useCallback(() => setItem(null), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const checkoutHref = item
    ? `${item.payLink}?size=${encodeURIComponent(item.size)}&quantity=${item.qty}`
    : null;

  return (
    <CartContext.Provider
      value={{ item, isOpen, checkoutHref, addItem, setQty, clear, open, close }}
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
