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

  const i18nNameSpaces = ["common", "products", "home"];
  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">
          {t("home:movies_in_category", { category })}
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map(
            ({
              id,
              imageSrc,
              title,
              title_ka,
              rating,
              category: movieCategory,
              category_ka,
              price,
            }) => (
              <li
                key={id}
                className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <Link href={`/movies/${id}`} className="flex flex-col gap-2">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-[200px] object-cover rounded-md"
                  />
                  <h3 className="text-black font-bold">
                    {locale === "ka" ? title_ka : title}
                  </h3>
                  <h4 className="text-gray-600">{rating}</h4>
                  <p className="text-gray-500">{price}</p>
                  <p className="text-gray-500">
                    {t("products:genre")}:{" "}
                    {locale === "ka" ? category_ka : movieCategory}
                  </p>
                </Link>
              </li>
            )
          )}
        </ul>
      </section>
    </TranslationsProvider>
  );
}