import CategoryCard from "./CategoryCard";
import { getAllProducts, getCategories } from "@/lib/products";

export default function FeaturedCategories() {
  const products = getAllProducts();
  const categories = getCategories();

  const cards = categories.map((name) => {
    const inCategory = products.filter((p) => p.category === name);
    const representative =
      inCategory.find((p) => p.featured) || inCategory[0];
    return {
      name,
      count: inCategory.length,
      image: representative?.image,
    };
  });

  return (
    <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Shop by category</h2>
      </div>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-thin sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {cards.map((c) => (
          <CategoryCard key={c.name} name={c.name} image={c.image} count={c.count} />
        ))}
      </div>
    </section>
  );
}
