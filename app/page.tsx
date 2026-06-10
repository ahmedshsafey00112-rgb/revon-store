"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./context";
import { products } from "./data/products";

import { db } from "./firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function Home() {
  const { cart, setCart } = useCart();

  const [search, setSearch] = useState("");
  const [adminProducts, setAdminProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "products")
        );

        const firebaseProducts = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setAdminProducts(firebaseProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const allProducts = [
    ...products,
    ...adminProducts,
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between border-b border-zinc-800 px-10 py-5">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-yellow-500">
            REVON
          </h2>

          <Link
            href="/cart"
            className="relative rounded-full bg-zinc-800 px-5 py-2 text-sm"
          >
            Cart

            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-black">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Search perfumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm outline-none focus:border-yellow-500"
          />

          <Link href="/">Home</Link>
          <Link href="/">Shop</Link>
          <a href="#">About</a>
        </div>
      </nav>

      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 tracking-[6px] text-yellow-500">
          LUXURY PERFUMES
        </span>

        <h1 className="mb-6 text-7xl font-bold">
          REVON
        </h1>

        <p className="max-w-2xl text-xl text-zinc-300">
          Discover premium fragrances crafted for confidence,
          elegance and unforgettable presence.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black">
            Shop Collection
          </button>

          <button className="rounded-full border border-yellow-500 px-8 py-4">
            Explore
          </button>
        </div>
      </section>

      <section className="px-10 py-20">
        <h2 className="mb-10 text-center text-4xl font-bold text-yellow-500">
          Best Sellers
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {allProducts
            .filter((product) =>
              product.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-yellow-500"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-4 h-64 w-full rounded-xl bg-zinc-800 object-contain"
                />

                <h3 className="text-xl font-semibold">
                  {product.name}
                </h3>

                <p className="mt-2 text-zinc-400">
                  {product.category}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-yellow-500">
                    {product.price} EGP
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      const exists = cart.find(
                        (item: any) =>
                          item.id === product.id
                      );

                      if (exists) {
                        setCart(
                          cart.map((item: any) =>
                            item.id === product.id
                              ? {
                                  ...item,
                                  quantity:
                                    (item.quantity || 1) + 1,
                                }
                              : item
                          )
                        );
                      } else {
                        setCart([
                          ...cart,
                          {
                            ...product,
                            quantity: 1,
                          },
                        ]);
                      }
                    }}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-black"
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}