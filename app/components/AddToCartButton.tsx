"use client";

import { useState } from "react";
import { useCart } from "../context";

export default function AddToCartButton({ product }: any) {
  const { cart, setCart } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        const exists = cart.find(
          (item: any) => item.id === product.id
        );

        if (exists) {
          setCart(
            cart.map((item: any) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: (item.quantity || 1) + 1,
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

        setAdded(true);

        setTimeout(() => {
          setAdded(false);
        }, 2000);
      }}
      className="mt-8 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black"
    >
      {added ? "✓ Added To Cart" : "Add To Cart"}
    </button>
  );
}