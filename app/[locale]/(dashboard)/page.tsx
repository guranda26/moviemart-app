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
import { redirect } from "next/dist/server/api-utils";

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


  const movieTypeKa = movieTypes.map((type) => {
    const matchingMovie = movies.find((movie) => movie.type === type.toLowerCase());
    
    return matchingMovie ? matchingMovie.type_ka : null; 
  });
  
  const categories_ka = [
    "ანიმაცია",
    "მძაფრსიუჟეტიანი",
    "დრამა",
    "სამეცნიერო ფანტასტიკა",
    "ბიოგრაფია",
    "სათავგადასავლო",
    "ფანტასტიკა",
    "კომედია",
    "საშინელებათა",
    "რომანტიკა",
    "თრილერი",
    "ისტორიული",
  ];

  
  const movieLocale = isKa ? movieTypeKa : movieTypes
  const movieCategoryLocale = isKa ? categories_ka : categories
  console.log('movieLocale:', movieLocale);
  
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="min-h-screen p-2 md:p-8 max-w-screen">
        <div className="flex gap-6 mb-8 relative mx-auto">
        {searchQuery ? (
            <SearchInput initialSearchQuery={searchQuery} /> 
          ) : null}
          {sweetHomeMovie.map((movie) => (
            <div key={movie.id} className="w-screen relative">
              <img
                src={movie.bannerImg}
                alt={movie.title}
                className="w-full rounded-lg sm:h-auto h-[400px] sm:max-h-[500px] overflow-hidden sm:object-cover"
              />

            <div className="flex">
              <div className="absolute inset-0 flex sm:items-baseline justify-between pb-20 sm:pb-0 sm:justify-evenly md:justify-center lg:justify-normal gap-5 lg:items-center lg:flex-row flex-col-reverse lg:gap-5 bg-opacity-50 p-6 text-white text-center bg-bannerbg">
                  <div className="max-w-[200px] sm:w-[300px] sm:max-w-full flex flex-col items-start sm:items-center gap-3">
                    <h2 className="text-2xl lg:text-3xl font-bold lg:mb-4 sm:leading-[3rem] lg:leading-[4rem]">
                      {t("movie_details:watch")} <span className="block text-[#af1918]">{t("movie_details:with_us")}</span>
                    </h2>
                    <Link
                      href="/subscribe"
                      className="rounded-lg border border-solid border-redButton transition-colors flex items-center justify-center bg-darkBtn text-textCol gap-2 hover:bg-[#212121] text-sm sm:text-base h-10 sm:h-12 px-2 xs:px-8 sm:px-10 lg:w-full max-w-[200px] text-white mx-auto"
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
        <div className="flex flex-wrap gap-4 mb-8">
          <h2 className="text-2xl ">{t("movie_details:explore_genre")}</h2>
          <div className="w-full p-4">
          <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.replace(/,/g, "").toLowerCase()}`}>
                <div className="bg-categoryBg border rounded-md aspect-square flex flex-col items-center justify-center hover:bg-hoverCategory hover:scale-105 transition">
                  <div className="w-1/2 h-1/2 rounded-full bg-[#f8ede3] flex items-center justify-center mb-2">
                    <Image
                      src={`/assets/categories/category-${index+1}.svg`}
                      alt={category}
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className="text-white text-center">{movieCategoryLocale[index]}</div>
                </div>
              </Link>
            ))}
          </div>
          </div>
            </div>
              <div className="gap-4 mb-12">
                <h3 className="mb-5 text-xl mb-6">{t("movie_details:explore_type")}</h3>
                <div className="flex gap-4">
                {movieTypes.map((type, index) => (
                  <Link key={index} href={`/movie-type/${type.replace(/,/g, "").toLowerCase()}`}>
                      <div className="max-w-[120px] sm:w-[120px] max-h-auto bg-black border rounded-md aspect-square flex flex-col items-center justify-center hover:bg-hoverCategory hover:scale-105 transition">
                        <div className="w-1/2 h-1/2 rounded-full bg-[#f8ede3] flex items-center justify-center mb-2">
                          <Image
                            src={`/assets/movie-types/type-${index+1}.svg`}
                            alt={type}
                            width={45}
                            height={45}
                          />
                        </div>
                        <div className="text-white text-center">{ movieLocale[index]}</div>
                    </div>
                  </Link>
                ))}
                </div>
              </div>

        <h3 className="text-xl font-semibold mb-8">{t("movie_details:movie_list")}</h3>
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