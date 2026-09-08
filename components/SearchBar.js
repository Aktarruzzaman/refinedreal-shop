"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

/**
 * variant "inline": always-visible input (used in the desktop navbar).
 * variant "icon": icon that expands into a full-width overlay input (mobile).
 */
export default function SearchBar({ variant = "inline", onClose }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  function submit(e) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    if (onClose) onClose();
    setOpen(false);
  }

  if (variant === "icon" && !open) {
    return (
      <button
        type="button"
        aria-label="Search products"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <Search size={17} strokeWidth={1.75} />
      </button>
    );
  }

  const isOverlay = variant === "icon" && open;

  return (
    <form
      onSubmit={submit}
      className={
        isOverlay
          ? "fixed inset-x-0 top-0 z-50 flex items-center gap-2 border-b border-border bg-paper px-4 py-3"
          : "flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2"
      }
    >
      <Search size={16} strokeWidth={1.75} className="shrink-0 text-muted" />
      <input
        autoFocus={isOverlay}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products, categories…"
        aria-label="Search products"
        className="w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
      />
      {isOverlay && (
        <button
          type="button"
          aria-label="Close search"
          onClick={() => {
            setOpen(false);
            if (onClose) onClose();
          }}
          className="shrink-0 text-muted transition-colors hover:text-ink"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      )}
    </form>
  );
}
