import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-paper sm:text-3xl">
          Upgrade your everyday essentials.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] text-paper/70">
          New pieces are added often — refined, simple, and built to last
          longer than the trend that sold them to you.
        </p>
        <Link
          href="/shop"
          className="mt-7 inline-flex items-center rounded-full bg-accent px-7 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
}
