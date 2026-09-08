import Link from "next/link";
import ProductGrid from "./ProductGrid";
import { getFeaturedProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Featured products</h2>
        <Link
          href="/shop"
          className="shrink-0 text-[14px] text-accent transition-colors hover:text-accent-deep"
        >
          View all
        </Link>
      </div>
      <ProductGrid products={featured} />
    </section>
  );
}
