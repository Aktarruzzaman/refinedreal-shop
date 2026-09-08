"use client";

import { ThemeProvider } from "@/lib/theme-context";
import { CartProvider } from "@/lib/cart-context";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
