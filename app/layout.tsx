import "./globals.css";
import { CartProvider } from "./context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REVON Perfumes",
  description:
    "Luxury perfumes crafted for confidence, elegance and unforgettable presence.",
  keywords: [
    "Perfumes",
    "Luxury Perfumes",
    "Fragrances",
    "REVON",
    "Egypt Perfumes",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}