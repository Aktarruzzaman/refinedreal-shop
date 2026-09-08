"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import { getCategories } from "@/lib/products";

const categories = getCategories();

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="RefinedReal home">
          <Image src="/images/logo.png" alt="RefinedReal" width={140} height={117} className="h-9 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="rounded-full px-3.5 py-2 text-[14.5px] text-ink/85 transition-colors hover:bg-surface hover:text-ink">
              {link.label}
            </Link>
          ))}
          <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <button type="button"
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] text-ink/85 transition-colors hover:bg-surface hover:text-ink"
              aria-expanded={categoriesOpen}>
              Categories
              <ChevronDown size={14} strokeWidth={2} />
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full w-52 pt-2">
                <div className="overflow-hidden rounded-md border border-border bg-surface shadow-soft-lg">
                  {categories.map((cat) => (
                    <Link key={cat} href={`/shop?category=${encodeURIComponent(cat)}`}
                      className="block px-4 py-2.5 text-[14px] text-ink/85 transition-colors hover:bg-paper hover:text-accent">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block"><SearchBar variant="inline" /></div>
          <div className="md:hidden"><SearchBar variant="icon" /></div>
          <CartButton />
          <ThemeToggle className="hidden sm:inline-flex" />

          <button type="button" aria-label="Open menu" onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink lg:hidden">
            <Menu size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 bg-paper p-5 shadow-soft-lg animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <Image src="/images/logo.png" alt="RefinedReal" width={120} height={100} className="h-8 w-auto" />
              <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink">
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-[15.5px] text-ink transition-colors hover:bg-surface">
                {link.label}
              </Link>
            ))}

            <p className="mt-3 px-3 text-xs font-medium uppercase tracking-wide text-muted">Categories</p>
            {categories.map((cat) => (
              <Link key={cat} href={`/shop?category=${encodeURIComponent(cat)}`} onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-[15px] text-ink/85 transition-colors hover:bg-surface">
                {cat}
              </Link>
            ))}

            <div className="mt-4 border-t border-border pt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
