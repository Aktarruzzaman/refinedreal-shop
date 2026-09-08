"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-accent disabled:opacity-30"
      >
        <Minus size={15} strokeWidth={2} />
      </button>
      <span className="w-8 text-center text-[14.5px] font-medium text-ink" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-accent disabled:opacity-30"
      >
        <Plus size={15} strokeWidth={2} />
      </button>
    </div>
  );
}
