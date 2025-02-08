import React from "react";
import FetchMovies from "@/utils/supabase/lib/FetchMovies";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";
type CategoryParams = Promise<{category: string; locale?: string;}>

export default async function CategoryPage({ params }: {params: CategoryParams}) {
  const { category } = await params; 
  const { locale } = await params;

  const movies = await FetchMovies();

  const filteredMovies = movies.filter((movie) => {
    const movieCategories = movie.category.split(",").map((cat) => cat.trim().toLowerCase());
    console.log('movieCategories', movieCategories);
    
    return movieCategories.includes(category.toLowerCase());
  })

  const categoryToUpperCase = category.charAt(0).toUpperCase() + category.slice(1);

  const isKa = locale === "ka";

  const categoryKa = movies
  .flatMap((movie) => {
    const categories = movie.category.split(",").map((cat) => cat.trim().toLowerCase());
    const index = categories.indexOf(category.toLowerCase());

    if (index !== -1 && movie.category_ka) {
      const categoriesKa = movie.category_ka.split(",").map((catKa) => catKa.trim());
      return categoriesKa[index];
    }

    return null;
  })
  .filter((catKa) => catKa !== null)[0] || categoryToUpperCase;

const displayCategory = isKa ? categoryKa : categoryToUpperCase;

  const i18nNameSpaces = ["common", "products", "home"];
  const { resources } = await initTranslations(locale, i18nNameSpaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {displayCategory}
        </h1>
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