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
            <div key={movie.id} className="w-screen relative animate-slide-in">
              <img
                src={movie.bannerImg}
                alt={movie.title}
                className="w-full rounded-lg sm:h-auto h-[400px] sm:max-h-[500px] overflow-hidden sm:object-cover"
              />

            <div className="flex justify-center">
              <div className="absolute inset-0 flex sm:items-baseline justify-between pb-5 xs:pb-20 sm:pb-0 sm:justify-evenly md:justify-center lg:justify-normal gap-8 lg:items-center lg:flex-row flex-col-reverse lg:gap-5 bg-opacity-50 p-6 text-white text-center bg-bannerbg">
                  <div className="max-w-[250px] sm:w-[300px] md:w-[350px] sm:max-w-full flex flex-col items-start sm:items-center gap-3 md:mr-8 fade-in">
                    <h2 className="text-2xl lg:text-3xl font-bold lg:mb-4 leading-[2.5rem] leading-normal xs:leading-[3rem] lg:leading-[4rem] break-all xs:break-normal">
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
          <h2 className="text-2xl fade-in">{t("movie_details:explore_genre")}</h2>
          <div className="w-full p-4">
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 break-all overflox-hidden category-cart">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.replace(/,/g, "").toLowerCase()}`}>
                <div className="bg-categoryBg border rounded-md aspect-square flex flex-col items-center justify-center hover:bg-hoverCategory hover:scale-105 transition animate-circle">
                  <div className="w-1/2 h-1/2 rounded-full bg-[#f8ede3] flex items-center justify-center mb-2 p-1 animate-circle">
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
                <h3 className="mb-5 text-xl mb-6 fade-in">{t("movie_details:explore_type")}</h3>
                <div className="flex flex-wrap items-center gap-4 p-4 w-max-content">
                {movieTypes.map((type, index) => (
                  <Link key={index} href={`/movie-type/${type.replace(/,/g, "").toLowerCase()}`}>
                      <div className="w-[100px] xs:w-[120px] max-h-auto bg-black border rounded-md aspect-square flex flex-col items-center justify-center hover:bg-hoverCategory hover:scale-105 transition fade-in-circle">
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
              <ul className="px-4 grid grid-cols-2 movie-card md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map(({ id, imageSrc, title, title_ka, rating, price }) => (
                    <li key={id} className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition relative overflow-hidden hover:scale-105 fade-in">
                      <Link href={`/movies/${id}`} className="block relative group">
                        <div className="relative">
                          <Image src={imageSrc} alt={title} width={300} height={200} className="w-full h-[350px] object-cover rounded-md" />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                            ⭐ {rating}
                          </div>
                          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                            <h3 className="text-white font-bold text-center text-md xs:text-xl">{isKa ? title_ka : title}</h3>
                          </div>
                        </div>
                      </Link>
                      <div className="p-4 text-center text-textCol">
                        <p className="font-semibold my-2">💰 {price}</p>
                        {!isPremium && (
                          <AddToCartButton userId={userId} productId={id} productName={title} productPrice={price} />
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full w-screen fade-in">
                    <h2 className="bg-red-800 text-xl p-4">{t("movie_details:no_movies")}</h2>
                  </div>
                )}
              </ul>
      </section>
    </TranslationsProvider>
  );
};

export default MainPage;