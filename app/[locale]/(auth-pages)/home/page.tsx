import AuthFooter from "@/components/footer/AuthFooter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthHeader from "@/components/header/AuthHeader";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/utils/i18n";
import { LocaleParams } from "@/Interfaces/Locale";

const HomePage = async ({ params }: LocaleParams) => {
  const { locale } = await params;

  const i18nNameSpace = ["home"];
  const { t, resources } = await initTranslations(locale, i18nNameSpace);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNameSpace}
    >
      <section className="flex flex-col items-center justify-between bg-background max-h-screen relative">
        <section className="flex flex-col items-center justify-center bg-black-700 bg-hero-background bg-cover bg-center bg-no-repeat h-screen w-full text-[#e5e5e5] sm:text-4xl text-2xl font-bold relative">
          <AuthHeader />
          <div className="absolute inset-0 bg-overlay"></div>
          <div className="relative z-10 flex flex-col items-center justify-center mx-auto mt-auto mb-2 px-4 gap-3">
            <div className="flex flex-col gap-4 items-center mb-4">
              <div className="text-center">
                <div className="inline-block rounded-full">
                  <Image
                    src={"/assets/logo.png"}
                    alt="logo"
                    width={70}
                    height={70}
                    className="text-center"
                  />
                </div>
                <h1 className="sm:text-6xl xs:text-4xl text-2xl">MovieMart</h1>
              </div>
              <h2 className="text-center">{t("home:heading")}</h2>
              <p className="text-[1rem] text-[#c6c6c6] text-center">
                {t("home:paragraph")}
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Link
                href="/sign-in"
                className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-redButton text-textCol gap-2 hover:bg-hoverRedBtn text-sm sm:text-base h-10 sm:h-12 px-4 xs:px-8 sm:px-10 w-full text-white"
                rel="noopener noreferrer"
              >
                {t("home:login_btn")}
              </Link>
              <Link
                href="/subscribe"
                className="rounded-lg border border-solid border-redButton transition-colors flex items-center justify-center bg-darkBtn text-textCol gap-2 hover:bg-hoverDarkBtn text-sm sm:text-base h-10 sm:h-12 px-4 xs:px-8 sm:px-10 w-full text-white"
              >
                {t("home:subscribe_btn")}
              </Link>
            </div>
          </div>
        </section>
        <section className="h-full py-3">
          <AuthFooter />
        </section>
      </section>
    </TranslationsProvider>
  );
};

export default HomePage;
