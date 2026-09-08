import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-20 lg:px-8">
        <div className="max-w-xl">
          <h1 className="font-serif text-[2.6rem] leading-[1.08] tracking-tight text-ink sm:text-[3.2rem] lg:text-[3.4rem]">
            Refined essentials for everyday life.
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">
            Quality audio, desk setup, and lifestyle gadgets, chosen with
            care and presented without the noise. This is shopping the way
            it should feel.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-[14.5px] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Explore Products
            </Link>
          </div>
        </div>

        <div className="relative mx-auto h-[340px] w-full max-w-md sm:h-[420px] lg:h-[460px]">
          <div className="absolute right-[8%] top-0 h-[78%] w-[62%] overflow-hidden rounded-lg border border-border bg-surface shadow-soft-lg">
            <Image
              src="/products/gaming-headset-white.jpg"
              alt="Premium over-ear headset from RefinedReal"
              fill
              sizes="35vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 h-[56%] w-[54%] overflow-hidden rounded-lg border border-border bg-surface shadow-soft-lg">
            <Image
              src="/products/wireless-earbuds-pro-white.jpg"
              alt="Wireless earbuds from RefinedReal"
              fill
              sizes="28vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
