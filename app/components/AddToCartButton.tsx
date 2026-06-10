"use client";

import { useState } from "react";
import { useCart } from "../context";

export default function AddToCartButton({ product }: any) {
  const { cart, setCart } = useCart();
  const [added, setAdded] = useState(false);

  const whatsappNumber = "201044034465"; // حط رقمك هنا

  const whatsappMessage = `السلام عليكم
أريد طلب:

${product.name}

السعر: ${product.price} EGP`;

  return (
    <div className="mt-8 flex flex-col gap-3">
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

          setAdded(true);

          setTimeout(() => {
            setAdded(false);
          }, 2000);
        }}
        className="rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black"
      >
        {added
          ? "✓ Added To Cart"
          : "Add To Cart"}
      </button>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        className="rounded-xl border border-green-500 px-8 py-4 text-center font-bold text-green-500 transition hover:bg-green-500 hover:text-white"
      >
        Buy On WhatsApp
      </a>
    </div>
  );
}