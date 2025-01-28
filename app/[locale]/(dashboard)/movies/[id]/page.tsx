import NotFoundPage from "@/app/[locale]/not-found";
import { Params } from "next/dist/server/request/params";
import initTranslations from "@/utils/i18n";
import React from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
import ReturnLink from "@/components/ReturnLink";

const MovieDetailsPage = async ({ params }: { params: Params }) => {
  const i18nNameSpaces = ["common", "products"];
  const { id, locale } = await params;

  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

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
        </div>
      </section>
    </TranslationsProvider>
  );
};

export default MovieDetailsPage;
