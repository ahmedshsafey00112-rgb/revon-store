import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold text-yellow-500">
        404
      </h1>

      <p className="mt-4">
        Page Not Found
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 text-black"
      >
        Back Home
      </Link>
    </div>
  );
}