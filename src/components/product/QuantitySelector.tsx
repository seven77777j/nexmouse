"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/format";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-12";
  return (
    <div className={cn("inline-flex items-center rounded-full border border-white/12 bg-white/[0.02]", h)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn("grid place-items-center text-white/60 transition hover:text-white disabled:opacity-30", size === "sm" ? "w-9" : "w-12")}
        aria-label="Reducir cantidad"
      >
        <Minus size={14} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.max(min, Math.min(max, n)));
        }}
        className="w-8 bg-transparent text-center text-sm tabular-nums text-white focus:outline-none"
        aria-label="Cantidad"
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn("grid place-items-center text-white/60 transition hover:text-white disabled:opacity-30", size === "sm" ? "w-9" : "w-12")}
        aria-label="Aumentar cantidad"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
