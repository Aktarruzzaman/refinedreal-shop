"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import StarRating from "./StarRating";
import { formatPrice, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = getDiscountPercent(product);

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-shadow hover:shadow-soft">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-paper"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-[13px] font-medium text-white">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[12px] uppercase tracking-wide text-muted">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-serif text-[19px] font-medium text-accent">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[13px] text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => addItem(product, 1)}
            disabled={!product.inStock}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2.5 text-[13.5px] font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag size={14} strokeWidth={2} />
            Add to Cart
          </button>
          <Link
            href={`/products/${product.id}`}
            className="rounded-full border border-border px-3 py-2.5 text-[13.5px] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
