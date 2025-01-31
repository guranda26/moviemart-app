import React from "react";
import Link from "next/link";
import ".././globals.css";
import Image from "next/image";
import ReturnBackButton from "@/components/ReturnBack";

export default function NotFoundPage() {
  const movieImg = "/assets/movie.png";

  return (
    <section className="h-screen bg-bg-gradient">
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 fade-in">
        <Image
          src={movieImg}
          width={200}
          height={200}
          alt="movie"
          className="animated-image"
        />
        <h1 className="text-4xl font-bold text-white mb-4 fade-in">
          Oops! Page Not Found
        </h1>
        <p className="text-lg mb-6 text-white fade-in">
          The page you are looking for does not exist.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Link
            href="/"
            className="bg-gray-900 border border-white text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Explore Movies
          </Link>
          <ReturnBackButton />
        </div>
        <footer className="absolute bottom-4 w-full text-center text-sm text-gray-400">
          © 2025 MovieMart. All Rights Reserved.
        </footer>
      </div>
    </section>
  );
}
