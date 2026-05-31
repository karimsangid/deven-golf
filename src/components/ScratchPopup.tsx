"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Scratch-to-win welcome offer. Shows once per visitor (localStorage), a few
// seconds after landing. The shopper scratches the gold foil to reveal a flat
// 10% OFF code. The code is copyable; honouring it at checkout is wired on the
// commerce backend.
// ─────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "deven_scratch_seen_v1";
const CODE = "DEVEN10";

export default function ScratchPopup() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Show once, shortly after load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  // Paint the scratch-off foil once the card is open.
  useEffect(() => {
    if (!open || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    // Use clientWidth/Height (layout content-box) — unlike getBoundingClientRect
    // it ignores the card's pop-in scale() transform, so the foil isn't locked
    // a few % small (which left it off-centre).
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    // Lock the *display* size too. A canvas with only width/height attributes is
    // a replaced element, so `inset:0` won't stretch it on a hi-dpi / scaled
    // (125–150%) PC display — it renders oversized + clipped, which is why the
    // scratch landed off-centre. Pinning the CSS size makes the foil cover the
    // panel exactly and the scratch land under the cursor.
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);

    // gold foil
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#caa257");
    grad.addColorStop(0.5, "#e6c982");
    grad.addColorStop(1, "#b8893f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(10,10,10,0.55)";
    ctx.font = "600 12px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH HERE", w / 2, h / 2);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let drawing = false;
    let last: { x: number; y: number } | null = null;

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      // Normalise to the canvas's logical (CSS-pixel) space so the scratch lands
      // exactly under the cursor regardless of display scaling.
      return {
        x: (e.clientX - r.left) * (w / r.width),
        y: (e.clientY - r.top) * (h / r.height),
      };
    };

    const clearedPct = () => {
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      // sample every 40th pixel's alpha for speed
      for (let i = 3; i < img.length; i += 160) {
        if (img[i] === 0) clear++;
      }
      return clear / (img.length / 160);
    };

    const scratch = (p: { x: number; y: number }) => {
      ctx.beginPath();
      if (last) {
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
      ctx.fill();
      last = p;
    };

    let moves = 0;
    const maybeReveal = () => {
      if (clearedPct() > 0.45) setRevealed(true);
    };

    const down = (e: PointerEvent) => {
      drawing = true;
      last = null;
      scratch(pos(e));
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const move = (e: PointerEvent) => {
      // On a PC the foil scratches itself as the mouse trails over it — no need
      // to hold the button down. Touch still needs a press-and-drag (no hover).
      const hovering = e.pointerType === "mouse";
      if (!drawing && !hovering) return;
      scratch(pos(e));
      if (++moves % 6 === 0) maybeReveal();
    };
    const up = () => {
      drawing = false;
      last = null;
      maybeReveal();
    };
    // Reset the trail when the cursor leaves so re-entry doesn't draw one long
    // line across the panel.
    const leave = () => {
      drawing = false;
      last = null;
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [open, revealed]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — code is visible anyway */
    }
  };

  if (!open) return null;

  return (
    <div
      className="scratch-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome offer"
    >
      <div className="scratch-card">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-2 p-2 text-2xl leading-none text-deven-gray transition-colors hover:text-deven-black"
        >
          &times;
        </button>

        <span className="text-[10px] font-semibold tracking-[0.4em] text-deven-gold uppercase">
          Welcome to DEVEN
        </span>
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-light text-deven-black">
          Scratch &amp; Save
        </h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-deven-gray">
          {revealed
            ? "Here's your code — use it at checkout."
            : "Scratch the panel to reveal a welcome discount on your first order."}
        </p>

        <div className="scratch-area">
          <div className="scratch-prize">
            <span className="text-[10px] font-semibold tracking-[0.35em] text-deven-gold uppercase">
              10% Off
            </span>
            <span className="mt-1 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[0.15em] text-deven-black">
              {CODE}
            </span>
            <span className="mt-1 text-[10px] font-light tracking-wide text-deven-gray">
              First order · one use
            </span>
          </div>
          {!revealed && <canvas ref={canvasRef} />}
        </div>

        {revealed ? (
          <button
            type="button"
            onClick={copy}
            className="mt-5 w-full bg-deven-black py-3.5 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-deven-gold hover:text-deven-black"
          >
            {copied ? "Copied" : "Copy Code"}
          </button>
        ) : (
          <button
            type="button"
            onClick={dismiss}
            className="mt-5 text-xs font-light tracking-wide text-deven-gray underline-offset-4 hover:underline"
          >
            No thanks
          </button>
        )}
      </div>
    </div>
  );
}
