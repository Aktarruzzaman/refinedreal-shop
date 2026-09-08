import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ name, image, count }) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(name)}`}
      className="group relative flex aspect-[3/4] shrink-0 w-[65vw] snap-start overflow-hidden rounded-md sm:w-auto"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 65vw, 22vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="relative mt-auto p-4">
        <h3 className="font-serif text-lg text-white">{name}</h3>
        {typeof count === "number" && (
          <p className="mt-0.5 text-[12.5px] text-white/75">
            {count} {count === 1 ? "product" : "products"}
          </p>
        )}
      </div>
    </Link>
  );
}
