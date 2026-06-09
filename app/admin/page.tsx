"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("adminProducts") || "[]"
    );

    setProductsList(savedProducts);
  }, []);

  const addProduct = () => {
  if (!name || !price || !category || !image) {
    alert("Please fill all fields");
    return;
  }

  if (editingId) {
    const updatedProducts = productsList.map(
      (product) =>
        product.id === editingId
          ? {
              ...product,
              name,
              price: Number(price),
              category,
              image,
            }
          : product
    );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setProductsList(updatedProducts);
    setEditingId(null);
  } else {
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
      image,
    };

    const updatedProducts = [
      ...productsList,
      newProduct,
    ];

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setProductsList(updatedProducts);
  }

  setName("");
  setPrice("");
  setCategory("");
  setImage("");

  alert("Saved Successfully");
};

  const deleteProduct = (id: number) => {
    const updatedProducts = productsList.filter(
      (product) => product.id !== id
    );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setProductsList(updatedProducts);
  };

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold text-yellow-500">
        Admin Panel
      </h1>

      <div className="max-w-xl space-y-4 rounded-xl bg-zinc-900 p-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  }}
  className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
/>
{image && (
  <img
    src={image}
    alt="preview"
    className="h-40 w-full rounded-xl object-contain bg-zinc-800 p-2"
  />
)}

        <button
          onClick={addProduct}
          className="w-full rounded-xl bg-yellow-500 p-4 font-bold text-black"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className="mt-10 max-w-xl">
        <h2 className="mb-4 text-2xl font-bold text-yellow-500">
          Added Products
        </h2>

        <div className="space-y-3">
          {productsList.length === 0 ? (
            <div className="rounded-xl bg-zinc-900 p-4 text-zinc-400">
              No products added yet
            </div>
          ) : (
            productsList.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
              >
                <div>
                  <h3 className="font-bold">
                    {product.name}
                  </h3>

                  <p className="text-zinc-400">
                    {product.price} EGP
                  </p>
                </div>

                <div className="flex gap-2">
  <button
    onClick={() => {
      setEditingId(product.id);
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setImage(product.image);
    }}
    className="rounded-lg bg-blue-600 px-4 py-2"
  >
    Edit
  </button>

  <button
    onClick={() =>
      deleteProduct(product.id)
    }
    className="rounded-lg bg-red-600 px-4 py-2"
  >
    Delete
  </button>
</div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}