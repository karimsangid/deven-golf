"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "deven-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only surface the banner if the visitor hasn't decided yet.
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage blocked (private mode) — show the banner regardless.
      setVisible(true);
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore — visitor still gets the banner dismissed for this session */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-deven-gold/25 bg-deven-black/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between">
        <p className="max-w-2xl text-center text-xs font-light leading-relaxed tracking-wide text-deven-cream/80 sm:text-left">
          We use cookies to enhance your experience, remember your cart, and
          understand how the collection is browsed. By continuing, you accept
          our use of cookies.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-deven-cream/60 uppercase transition-colors hover:text-deven-cream"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="border border-deven-gold bg-deven-gold px-7 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-deven-black uppercase transition-all hover:bg-transparent hover:text-deven-gold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
