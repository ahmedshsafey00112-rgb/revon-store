"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [productsList, setProductsList] = useState<any[]>([]);

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");

    if (adminAuth === "true") {
      setIsLoggedIn(true);
      fetchProducts();
    }
  }, []);

  const login = () => {
    if (password === "revon123") {
      localStorage.setItem("adminAuth", "true");
      setIsLoggedIn(true);
      fetchProducts();
    } else {
      alert("Wrong Password");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    location.reload();
  };
const fetchProducts = async () => {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setProductsList(products);
};
  const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));

    await fetchProducts();

    alert("Product Deleted Successfully");
  } catch (error) {
    console.error(error);
  }
};

  const addProduct = async () => {
    if (!name || !price || !category || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        category,
        image,
        createdAt: Date.now(),
      });
      const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));

    await fetchProducts();

    alert("Product Deleted Successfully");
  } catch (error) {
    console.error(error);
  }
};

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      setFile(null);

      await fetchProducts();

      alert("Product Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Error Adding Product");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black p-6">
        <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8">
          <h1 className="mb-6 text-center text-4xl font-bold text-yellow-500">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="mb-4 w-full rounded-xl bg-zinc-800 p-4 text-white outline-none"
          />

          <button
            onClick={login}
            className="w-full rounded-xl bg-yellow-500 p-4 font-bold text-black"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold text-yellow-500">
          Admin Panel
        </h1>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-5 py-3 font-bold"
        >
          Logout
        </button>
      </div>

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
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile =
              e.target.files?.[0];

            if (selectedFile) {
              setFile(selectedFile);

              const reader = new FileReader();

              reader.onloadend = () => {
                setImage(
                  reader.result as string
                );
              };

              reader.readAsDataURL(
                selectedFile
              );
            }
          }}
          className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
        />

        {image && (
          <img
            src={image}
            alt="preview"
            className="h-40 w-full rounded-xl bg-zinc-800 p-2 object-contain"
          />
        )}

        <button
          onClick={addProduct}
          className="w-full rounded-xl bg-yellow-500 p-4 font-bold text-black"
        >
          Add Product
        </button>
      </div>

      <div className="mt-10 max-w-xl">
        <h2 className="mb-4 text-2xl font-bold text-yellow-500">
          Added Products
        </h2>

        <div className="space-y-3">
          {productsList.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-zinc-800 p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex w-full items-center justify-between">
  <div>
    <h3 className="font-bold">
      {product.name}
    </h3>

    <p className="text-zinc-400">
      {product.price} EGP
    </p>

    <p className="text-zinc-500">
      {product.category}
    </p>
  </div>

  <button
    onClick={() => deleteProduct(product.id)}
    className="rounded-lg bg-red-600 px-4 py-2 font-bold"
  >
    Delete
  </button>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}