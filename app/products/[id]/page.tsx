"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton";
import { products } from "@/app/data/products";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const adminProducts = JSON.parse(
      localStorage.getItem("adminProducts") || "[]"
    );

    const allProducts = [
      ...products,
      ...adminProducts,
    ];

    const foundProduct = allProducts.find(
      (item) => String(item.id) === String(params.id)
    );

    setProduct(foundProduct);
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-3xl bg-zinc-900 p-6"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="mt-4 text-zinc-400">
            {product.category}
          </p>

          <h2 className="mt-8 text-4xl font-bold text-yellow-500">
            {product.price} EGP
          </h2>

          <p className="mt-6 text-zinc-300">
            Premium fragrance crafted for elegance,
            confidence and unforgettable presence.
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}