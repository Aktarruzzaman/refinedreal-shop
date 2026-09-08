"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import QuantitySelector from "@/components/QuantitySelector";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, hydrated } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Explore the shop to find something you'll love."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
            >
              Continue Shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl text-ink">Your Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-5">
              <Link
                href={`/products/${item.id}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-paper"
              >
                <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.id}`}
                  className="line-clamp-2 text-[14.5px] font-medium text-ink hover:text-accent"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-[13.5px] text-muted">{formatPrice(item.price)} each</p>
                <div className="mt-3 sm:hidden">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(q) => updateQuantity(item.id, q)}
                  />
                </div>
              </div>

              <div className="hidden sm:block">
                <QuantitySelector
                  value={item.quantity}
                  onChange={(q) => updateQuantity(item.id, q)}
                />
              </div>

              <div className="w-24 shrink-0 text-right font-serif text-[16px] text-ink">
                {formatPrice(item.price * item.quantity)}
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="shrink-0 rounded-full p-2 text-muted transition-colors hover:text-accent"
              >
                <Trash2 size={17} strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-md border border-border bg-surface p-6">
          <h2 className="font-serif text-lg text-ink">Order Summary</h2>
          <div className="mt-4 space-y-2.5 text-[14.5px]">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-ink">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span className="text-ink">Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-[16px] font-medium">
            <span className="text-ink">Total</span>
            <span className="font-serif text-accent">{formatPrice(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-accent py-3.5 text-center text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="mt-3 flex items-center justify-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
