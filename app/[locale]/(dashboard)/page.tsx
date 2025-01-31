import React from "react";
import FetchMovies from "@/utils/supabase/lib/FetchMovies";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";
import SearchInput from "@/components/SearchInput";
import AddToCartButton from "@/components/button/AddToCartBtn";
import Image from "next/image";
import createClient from "@/utils/supabase/server";
import { checkSubscriptionStatus } from "@/components/SubscriptionStatus";

type Params = Promise<{ locale: string; productId?: string }>;


const MainPage = async ({ params, searchParams}: { params: Params; searchParams?: Promise<{ q?: string }> }) => {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams?.q || "";
 
  const supabaseClient = await createClient();
  const { data: user } = await supabaseClient.auth.getUser();

  const userId= user?.user?.id ?? "";
  const isPremium = userId && await checkSubscriptionStatus(userId);
  const movies = await FetchMovies(searchQuery);
  const i18nNameSpaces = ["common", "products", "home", "movie_details", "common_placeholder"];
  const { t, resources } = await initTranslations(locale, i18nNameSpaces);
  const isKa = locale === "ka";

  const categories = [
    "Animation",
    "Action",
    "Drama",
    "Sci-Fi",
    "Biography",
    "Adventure",
    "Fantasy",
    "Comedy",
    "Horror",
    "Romance",
    "Thriller",
    "History",
  ];

  const movieTypes = ["Movie", "Series", "Animation"];

  const sweetHomeMovie = movies.filter((movie) => movie.title === "Sweet Home");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="min-h-screen p-8">

        <div className="flex gap-6 mb-8 relative">
        {/* <SearchInput initialSearchQuery={searchQuery} /> */}
          {sweetHomeMovie.map((movie) => (
            <div key={movie.id} className="w-screen relative">
              <img
                src={movie.bannerImg}
                alt={movie.title}
                className="w-full rounded-lg sm:h-auto h-[500px] sm:max-h-[500px] overflow-hidden object-fill sm:object-cover"
              />

            <div className="flex">
              <div className="absolute inset-0 flex sm:items-baseline justify-end pb-20 sm:pb-0 sm:justify-evenly md:justify-center lg:justify-normal gap-5 lg:items-center lg:flex-row flex-col-reverse lg:gap-5 bg-opacity-50 p-6 text-white text-center bg-yellow-400">
                  <div className="w-[400px] flex flex-col items-start sm:items-center gap-3">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold lg:mb-4 md:leading-[3rem] lg:leading-[4rem]">
                      {t("movie_details:watch")} <span className="block text-[#931f1f]">{t("movie_details:with_us")}</span>
                    </h2>
                    <Link
                      href="/subscribe"
                      className="rounded-lg border border-solid border-redButton transition-colors flex items-center justify-center bg-darkBtn text-textCol gap-2 hover:bg-hoverDarkBtn text-sm sm:text-base h-10 sm:h-12 px-2 xs:px-8 sm:px-10 lg:w-full max-w-[200px] text-white"
                    >
                      {t("home:subscribe_btn")}
                    </Link>
                  </div>
                  <SearchInput initialSearchQuery={searchQuery} />
              </div>
            </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">{t("products:categories")}</h2>
        <div className="flex flex-wrap gap-4 mb-8">
          <h3>{t("movie_details:explore_genre")}</h3>
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.replace(/,/g, "").toLowerCase()}`}>
              <div className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                {category}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <h3>{t("movie_details:explore_type")}</h3>
          {movieTypes.map((type, index) => (
            <Link key={index} href={`/movie-type/${type.replace(/,/g, "").toLowerCase()}`}>
              <div className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                {type === "Series" ? "Tv series" : type}
              </div>
            </Link>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4">{t("products:movie_list")}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.length > 0 ? filteredMovies.map(
            ({
              id,
              imageSrc,
              title,
              title_ka,
              rating,
              category,
              category_ka,
              price,
            }) => (
              <li
                key={id}
                className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <Link href={`/movies/${id}`} className="flex flex-col gap-2" data-cy='product-item'
                >
                  <Image
                    src={imageSrc}
                    alt={title}
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover rounded-md"
                  />
                  <h3 className="text-black font-bold">{isKa ? title_ka : title}</h3>
                  <h4 className="text-gray-600">{rating}</h4>
                  <p className="text-gray-500">{price}</p>
                  <p className="text-gray-500">
                    {t("products:genre")} {isKa ? category_ka : category}
                  </p>
                </Link>
                <div className="flex sm:flex-col gap-3">
                  {!isPremium && 
                  <AddToCartButton
                    userId={userId}
                    productId={id}
                    productName={title}
                    productPrice={price}
                  />
                }
                  </div>
              </li>
            )
          )
          :           
          <div className="flex items-center justify-center h-full w-screen">
            <h2 className="bg-red-800 text-xl p-4">{t("movie_details:no_movies")}</h2>
          </div> 
          }
        </ul>
      </section>
    </TranslationsProvider>
  );
};

export default MainPage;