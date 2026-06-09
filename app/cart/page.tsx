"use client";

import { useCart } from "../context";
import Link from "next/link";

export default function CartPage() {
  const { cart, setCart } = useCart();

  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item: any) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(
      cart
        .map((item: any) =>
          item.id === id
            ? {
                ...item,
                quantity: (item.quantity || 1) - 1,
              }
            : item
        )
        .filter((item: any) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-5xl font-bold text-yellow-500">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="mt-6 text-zinc-400">
          No products added yet.
        </p>
      ) : (
        <>
          <div className="mt-10 space-y-4">
            {cart.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg bg-zinc-800 object-contain"
                />

                <div className="flex w-full items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-zinc-400">
                      {item.price} EGP
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="rounded bg-red-600 px-3 py-1"
                      >
                        -
                      </button>

                      <span className="text-yellow-500 font-bold">
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="rounded bg-green-600 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setCart(
                        cart.filter(
                          (p: any) => p.id !== item.id
                        )
                      )
                    }
                    className="rounded-lg bg-red-600 px-4 py-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                Total
              </h2>

              <span className="text-3xl font-bold text-yellow-500">
                {total} EGP
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full rounded-xl bg-yellow-500 p-4 text-center font-bold text-black"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}