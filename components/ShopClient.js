"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { getAllProducts, getCategories, queryProducts } from "@/lib/products";

const allProducts = getAllProducts();
const categories = ["All", ...getCategories()];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep the URL in sync so filters are shareable / back-button friendly.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "All") params.set("category", category);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  const filtered = useMemo(
    () =>
      queryProducts({
        query,
        category,
        minPrice: minPrice === "" ? undefined : minPrice,
        maxPrice: maxPrice === "" ? undefined : maxPrice,
        sort,
      }),
    [query, category, minPrice, maxPrice, sort]
  );

  const maxCatalogPrice = useMemo(
    () => Math.max(...allProducts.map((p) => p.price)),
    []
  );

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
  };

  const hasActiveFilters =
    query || category !== "All" || minPrice !== "" || maxPrice !== "";

  const FilterFields = (
    <div className="space-y-7">
      <div>
        <h3 className="text-[13px] font-medium uppercase tracking-wide text-muted">
          Category
        </h3>
        <div className="mt-3 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`block w-full rounded-md px-3 py-2 text-left text-[14px] transition-colors ${
                category === cat
                  ? "bg-accent-soft text-accent-deep"
                  : "text-ink/85 hover:bg-paper"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase tracking-wide text-muted">
          Price range
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            aria-label="Minimum price"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-[14px] text-ink focus:outline-none"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            aria-label="Maximum price"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-[14px] text-ink focus:outline-none"
          />
        </div>
        <p className="mt-2 text-[12.5px] text-muted">
          Catalog ranges up to ৳{maxCatalogPrice.toLocaleString("en-US")}
        </p>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-[13.5px] text-accent transition-colors hover:text-accent-deep"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Shop</h1>
        <p className="mt-2 text-[14.5px] text-muted">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, categories…"
          aria-label="Search products"
          className="w-full max-w-sm rounded-full border border-border bg-surface px-4 py-2.5 text-[14px] text-ink placeholder:text-muted focus:outline-none sm:max-w-md"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
          className="ml-auto hidden rounded-full border border-border bg-surface px-4 py-2.5 text-[14px] text-ink focus:outline-none sm:block"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[14px] text-ink lg:hidden"
        >
          <SlidersHorizontal size={15} strokeWidth={1.75} />
          Filters
        </button>
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        aria-label="Sort products"
        className="mb-6 block w-full rounded-full border border-border bg-surface px-4 py-2.5 text-[14px] text-ink focus:outline-none sm:hidden"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{FilterFields}</aside>

        <ProductGrid products={filtered} />
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-paper p-5 shadow-soft-lg animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-lg text-ink">Filters</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>
            {FilterFields}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full rounded-full bg-ink py-3 text-[14.5px] font-medium text-paper"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
