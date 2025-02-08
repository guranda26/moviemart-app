import React from "react";
import FetchMovies from "@/utils/supabase/lib/FetchMovies";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";
import { MovieTypeParams } from "@/Types/types";
import Image from "next/image";

export default async function MovieType({ params }: {params: MovieTypeParams}) {
  const { type } = await params; 
  const { locale } = await params;
  const isKa = locale === "ka";

  const movies = await FetchMovies();
  const upperType = type.toUpperCase();
  const filteredMovies = movies.filter((movie) => {
    const movieType = movie?.type?.toLowerCase();
        if(movieType) return movieType.includes(type.toLowerCase());
  })

  const movieKa = movies.find((movie) => movie.type && movie.type.toLowerCase() === type.toLowerCase())?.type_ka || type;
  const displayType = isKa ? movieKa : upperType;

  const i18nNameSpaces = ["common", "products", "home"];
  const { resources } = await initTranslations(locale, i18nNameSpaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="min-h-screen p-8">
      <div className="flex items-center justify-center gap-4 mb-8">
      <Image src={"/assets/popcorn-movie.svg"} alt="popcorn img" width={50} height={50} className="text-white" />
        <h1 className="text-4xl font-bold">
          { displayType }
        </h1>
      </div>
      <ul className="px-4 grid grid-cols-2 movie-card md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredMovies.map(
            ({
              id,
              imageSrc,
              title,
              title_ka,
              rating,
            }) => (
              <li
                key={id}
                className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition relative overflow-hidden hover:scale-105 fade-in min-h-[300px]"
              >
              <Link href={`/movies/${id}`} className="block relative group">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-[300px] object-cover rounded-md"
                  />                    
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                      ⭐ {rating}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white font-bold text-center text-md xs:text-xl">{isKa ? title_ka : title}</h3>
                    </div>
                </Link>
              </li>
            )
          )}
        </ul>
      </section>
    </TranslationsProvider>
  );
}