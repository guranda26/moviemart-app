import NotFoundPage from "@/app/[locale]/not-found";
import initTranslations from "@/utils/i18n";
import React from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
import ReturnLink from "@/components/ReturnLink";
import createClient from "@/utils/supabase/server";
import { checkSubscriptionStatus } from "@/components/SubscriptionStatus";
import MovieComponent from "@/components/MovieWindow";
import { checkPurchaseStatus } from "@/utils/supabase/checkPurchaseStatus";
import BuyProductButton from "@/components/button/BuyProductButton";
import { BlogParams } from "@/Types/types";

const MovieDetailsPage = async ({ params }: { params: BlogParams }) => {
    const supabaseClient = await createClient();
    const { data: user } = await supabaseClient.auth.getUser();
  
  const i18nNameSpaces = ["common", "products", "movie_details"];
  const { id, locale } = await params;
  const numericID = Number(id)
  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

  const dataId= user?.user ? user.user.id : null;
  const safeDataId = JSON.parse(JSON.stringify(dataId));

  const isPremium = dataId ? await checkSubscriptionStatus(dataId) : false;
  if (!id) {
    return <NotFoundPage />;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`
  );

  if (!response.ok) {
    return <NotFoundPage />;
  }

  const movie = await response.json();

  const isPurchased = await checkPurchaseStatus(safeDataId, movie.id);

  if (!movie || !movie.id) {
    return <NotFoundPage />;
  }

  const isKa = locale == "ka";

  const {
    imageSrc,
    title,
    title_ka,
    rating,
    category,
    category_ka,
    description,
    description_ka,
    director,
    director_ka,
    writer,
    writer_ka,
    year,
    movie_url,
    runtime,
    awards,
    awards_ka,
    language,
    language_ka,
    actors,
    actors_ka,
    price,
    sessions
  } = movie;

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNameSpaces}>
      <section className="max-w-5xl mx-auto p-10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start animate-slide-in relative">
                <ReturnLink href="/" className="inline-block absolute mt-4 px-4 py-2 text-white rounded-lg" />
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full max-w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 object-cover"
              />
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{isKa ? title_ka : title}</h3>
                    <p className="p-2 text-detailsCol"><strong>IMDB: </strong><span className="text-xl font-semibold text-[#ffd2a0]">{rating}</span></p>
                    <h3 className="text-lg font-semibold">{t("products:genre")} {isKa ? category_ka : category}</h3>
                    <p className="text-gray-[#ffd2a0]">{isKa ? description_ka : description}</p>
                    <p className="text-detailsCol">{t("products:release_date")}: {year}</p>
                    <p className="text-detailsCol">{t("movie_details:director")}: {isKa ? director_ka : director}</p>
                    <p className="text-detailsCol">{t("movie_details:writers")}: {isKa ? writer_ka : writer}</p>
                    <p className="text-detailsCol">{t("movie_details:runtime")}: {runtime}</p>
                    <p className="text-detailsCol">{t("movie_details:language")}: {isKa ? language_ka : language}</p>
                    <p className="text-detailsCol">{t("movie_details:awards")}: {isKa ? awards_ka : awards}</p>
                    <p className="text-detailsCol">{t("movie_details:actors")}: {isKa ? actors_ka : actors}</p>
                    {sessions && <p className="text-detailsCol">{t("products:sessions")}: {sessions.join(", ")}</p>}
                    <p className="text-detailsCol font-bold">{t("products:price")}: ${price}</p>
                    {isPurchased || isPremium ? (
                        <MovieComponent src={movie_url} />
                    ) : (
                        <BuyProductButton
                            userId={dataId || ""}
                            productId={numericID}
                            productName={title}
                            productImage={imageSrc}
                            productDescription={description}
                            productPrice={price}
                        />
                    )}
                </div>
            </div>
        </section>
    </TranslationsProvider>
);
};

export default MovieDetailsPage;
