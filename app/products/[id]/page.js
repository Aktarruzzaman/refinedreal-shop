import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const product = getProductById(params.id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
