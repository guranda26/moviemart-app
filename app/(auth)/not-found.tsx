import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition duration-300"
      >
        Go back home
      </Link>
    </div>
  );
}
