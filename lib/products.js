import products from "@/data/products.json";

/** Return the full product catalog. */
export function getAllProducts() {
  return products;
}

/** Look up a single product by its numeric id or slug. */
export function getProductById(id) {
  const numericId = Number(id);
  return products.find(
    (p) => p.id === numericId || p.slug === String(id)
  );
}

/** Distinct category names, derived from the catalog. */
export function getCategories() {
  const set = new Set(products.map((p) => p.category));
  return Array.from(set);
}

/** Products flagged as featured, for the homepage. */
export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

/**
 * Filter, search, and sort the catalog.
 * options: { query, category, minPrice, maxPrice, sort }
 */
export function queryProducts(options = {}) {
  const { query, category, minPrice, maxPrice, sort } = options;
  let result = [...products];

  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter((p) =>
      [p.name, p.category, p.description]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
    result = result.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => b.id - a.id);
      break;
    default:
      // "featured" / default order
      result.sort((a, b) => (b.featured === true) - (a.featured === true));
  }

  return result;
}

/** Discount percentage, rounded, or null if there's no oldPrice. */
export function getDiscountPercent(product) {
  if (!product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
}

/** Simple currency formatter for BDT-style pricing used in the catalog. */
export function formatPrice(amount) {
  return `৳${Number(amount).toLocaleString("en-US")}`;
}
