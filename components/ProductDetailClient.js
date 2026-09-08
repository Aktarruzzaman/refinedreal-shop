"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingBag, Zap, CheckCircle2, XCircle } from "lucide-react";
import StarRating from "./StarRating";
import ProductGrid from "./ProductGrid";
import QuantitySelector from "./QuantitySelector";
import { formatPrice, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailClient({ product, related }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const images = product.images?.length ? product.images : [product.image];
  const discount = getDiscountPercent(product);

  function handleAddToCart() {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product, quantity);
    router.push("/checkout");
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-[13px] text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <ChevronRight size={13} />
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <ChevronRight size={13} />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
          {product.category}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-paper">
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {discount && (
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-white">
                -{discount}% off
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 w-20 overflow-hidden rounded-md border ${
                    activeImage === idx ? "border-accent" : "border-border"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[12.5px] uppercase tracking-wide text-muted">{product.category}</p>
          <h1 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{product.name}</h1>

          <div className="mt-3">
            <StarRating rating={product.rating} reviews={product.reviews} size={15} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-medium text-accent">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[15px] text-muted line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-5 flex items-center gap-2 text-[13.5px]">
            {product.inStock ? (
              <>
                <CheckCircle2 size={16} className="text-accent" strokeWidth={2} />
                <span className="text-ink">In stock, ready to ship</span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-muted" strokeWidth={2} />
                <span className="text-muted">Currently out of stock</span>
              </>
            )}
          </div>

          <div className="mt-7 flex items-center gap-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <span className="text-[13.5px] text-muted">
              Subtotal: <span className="text-ink">{formatPrice(product.price * quantity)}</span>
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14.5px] font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag size={16} strokeWidth={2} />
              {justAdded ? "Added to cart" : "Add to Cart"}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Zap size={16} strokeWidth={2} />
              Buy Now
            </button>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <h2 className="font-serif text-[16px] text-ink">Product information</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{product.details}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl text-ink">You may also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
