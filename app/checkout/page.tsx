"use client";

import { useState } from "react";
import { useCart } from "../context";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price,
    0
  );

  const sendOrder = () => {
    const products = cart
      .map(
        (item: any) =>
          `- ${item.name} (${item.price} EGP)`
      )
      .join("\n");

    const message =
`New Order

Name: ${name}
Phone: ${phone}
Address: ${address}

Products:
${products}

Total: ${total} EGP`;
window.open(
  `https://wa.me/201044034465?text=${encodeURIComponent(message)}`
);

setCart([]);
setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Checkout
      </h1>

      <div className="max-w-2xl space-y-4">
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4 h-32"
        />
{success && (
  <div className="rounded-xl bg-green-600 p-4 text-center">
    Order Sent Successfully
  </div>
)}
        <button
          onClick={sendOrder}
          className="w-full rounded-xl bg-yellow-500 p-4 text-black font-bold"
        >
          Send Order On WhatsApp
        </button>
        {success && (
  <div className="rounded-xl border border-green-500 bg-green-500/10 p-4 text-green-400">
    Order sent successfully!
  </div>
)}
      </div>
    </main>
  );
}