import Image from "next/image";
import React from "react";
import FetchMovies from "@/utils/supabase/lib/FetchMovies";
import Link from "next/link";
import { Params } from "next/dist/server/request/params";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";
// import Button from "@/components/Button";
import BuyProductButton from "@/components/BuyProductButton";

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
      <section className="min-h-screen p-8">
        <Image src={"/assets/logo2.png"} alt="logo" width={70} height={80} />
        <h3>Movie title</h3>
        <ul className="flex gap-3">
          {movies.map(
            ({
              id,
              imageSrc,
              title,
              title_ka,
              rating,
              category,
              category_ka,
              price,
              description,
            }) => (
              <li key={id} className="border border-purple-500">
                <Link href={`/movies/${id}`} className="flex flex-col gap-2">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-[200px] h-auto"
                  />
                  <h3 className="text-black">{isKa ? title_ka : title}</h3>
                  <h3>{rating}</h3>
                  <p>{price}</p>
                  <h3>
                    {t("products:genre")} {isKa ? category_ka : category}
                  </h3>
                </Link>
                <button className="bg-redButton hover:bg-hoverRedBtn border border-[#7e1313] text-white px-4 py-2 rounded-lg transition">
                  {t("products:buy_now")}
                </button>
                <BuyProductButton
                  productId={id}
                  productName={title}
                  productImage={imageSrc}
                  productDescription={description}
                  productPrice={price}
                />
              </li>
            )
          )}
        </ul>
      </section>
    </TranslationsProvider>
  );
};

export default MainPage;
