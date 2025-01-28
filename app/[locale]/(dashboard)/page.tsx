import Image from "next/image";
import React from "react";
import FetchMovies from "@/utils/supabase/lib/FetchMovies";
import Link from "next/link";
import { Params } from "next/dist/server/request/params";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";

const MainPage = async ({ params }: { params: Params }) => {
  const movies = await FetchMovies();

  const i18nNameSpaces = ["common", "products"];
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNameSpaces);
  const isKa = locale === "ka";

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="min-h-screen">
        <Image src={"/assets/logo2.png"} alt="logo" width={70} height={80} />
        <h3>Movie title</h3>
        <ul>
          <li>
            {movies.map(
              ({
                id,
                imageSrc,
                title,
                title_ka,
                rating,
                category,
                category_ka,
              }) => (
                <Link href={`/movies/${id}`} key={id}>
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-[200px] h-auto"
                  />
                  <h3 className="text-black">{isKa ? title_ka : title}</h3>
                  <h3>{rating}</h3>
                  <h3>
                    {t("products:genre")} {isKa ? category_ka : category}
                  </h3>
                </Link>
              )
            )}
          </li>
        </ul>
      </section>
    </TranslationsProvider>
  );
};

export default MainPage;
