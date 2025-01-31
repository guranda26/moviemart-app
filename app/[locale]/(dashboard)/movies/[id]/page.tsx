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
  
  const i18nNameSpaces = ["common", "products"];
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
    year,
    movie_url,
    price
  } = movie;

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section>
        <div className="relative animate-slide-in">
          <h3>{isKa ? title_ka : title}</h3>
          <img
            src={imageSrc}
            alt={title}
            className="transform hover:scale-105 transition-transform duration-500"
          />
          <span>{rating}</span>
          <h3>
            {t("products:genre")}
            {isKa ? category_ka : category}
          </h3>
          <p>{isKa ? description_ka : description}</p>
          <p>
            {t("products:release_date")}{" "}
            <strong>{t("products:author")}:</strong> {year}
          </p>
          <ReturnLink href={"/"} className="left-0" />
          {isPurchased || isPremium ? <MovieComponent src={movie_url} /> : (
          <BuyProductButton
          userId={safeDataId ? safeDataId : ""}
          productId={numericID}
          productName={title}
          productImage={imageSrc}
          productDescription={description}
          productPrice={price}
        />
          )}
        </div>
      </section>
    </TranslationsProvider>
  );
};

export default MovieDetailsPage;
