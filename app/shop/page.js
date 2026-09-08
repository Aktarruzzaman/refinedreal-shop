import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata = {
  title: "Shop",
  description: "Browse the full RefinedReal catalog — audio, desk setup, and lifestyle gadgets.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopClient />
    </Suspense>
  );
}
