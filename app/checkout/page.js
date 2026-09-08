"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import EmptyState from "@/components/EmptyState";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState(null);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill in your name, phone, and address.");
      return;
    }

    setSubmitting(true);
    try {
      // Temporary frontend-only checkout.
      // MongoDB/order saving is disabled for this deployment.
      await new Promise((resolve) => setTimeout(resolve, 500));
      const demoOrderId = `DEMO-${Date.now()}`;
      setPlacedOrderId(demoOrderId);
      clearCart();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placedOrderId) {
    return (
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <CheckCircle2 size={40} className="mx-auto text-accent" strokeWidth={1.5} />
          <h1 className="mt-5 font-serif text-2xl text-ink">Order placed</h1>
          <p className="mt-2 text-[14.5px] text-muted">
            Thank you — your order has been received. We'll reach out on the
            phone number you provided to confirm delivery details.
          </p>
          <p className="mt-4 text-[13px] text-muted">
            Order reference: <span className="text-ink">{placedOrderId}</span>
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Nothing to check out yet"
          description="Add a few products to your cart before heading to checkout."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
            >
              Browse Products
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl text-ink">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-serif text-lg text-ink">Customer information</h2>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-[13.5px] text-muted">
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-[14.5px] text-ink focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-[13.5px] text-muted">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-[14.5px] text-ink focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-[13.5px] text-muted">
              Delivery address
            </label>
            <textarea
              id="address"
              required
              rows={3}
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full resize-none rounded-md border border-border bg-surface px-4 py-2.5 text-[14.5px] text-ink focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="notes" className="mb-1.5 block text-[13.5px] text-muted">
              Order notes <span className="text-muted/70">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="w-full resize-none rounded-md border border-border bg-surface px-4 py-2.5 text-[14.5px] text-ink focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-md bg-accent-soft px-4 py-3 text-[13.5px] text-accent-deep">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-accent py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep disabled:opacity-60 lg:hidden"
          >
            {submitting ? "Placing order…" : `Place Order · ${formatPrice(subtotal)}`}
          </button>
        </form>

        <div className="h-fit rounded-md border border-border bg-surface p-6">
          <h2 className="font-serif text-lg text-ink">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-[14px]">
                <span className="text-ink/85">
                  {item.name} <span className="text-muted">× {item.quantity}</span>
                </span>
                <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-[16px] font-medium">
            <span className="text-ink">Total</span>
            <span className="font-serif text-accent">{formatPrice(subtotal)}</span>
          </div>
          <button
            type="submit"
            form="checkout-form"
            disabled={submitting}
            className="mt-6 hidden w-full rounded-full bg-accent py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep disabled:opacity-60 lg:block"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
