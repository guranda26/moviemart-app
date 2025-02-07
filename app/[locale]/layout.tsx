import type { Metadata } from "next";
import initTranslations from "../../utils/i18n";
import TranslationsProvider from "../../components/TranslationsProvider";
import i18nConfig from "../../configs/i18ncofig";
import "./globals.css";
import Providers from "@/components/Providers";
import { Locale } from "@/Types/types";

export const metadata: Metadata = {
  title: "Moviemart Platform",
  description: "Watch movies and series exclusively on Moviemart",
};

type LocaleParams = {
  locale: Locale;
  [key: string]: string | number | undefined;
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}>) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { resources } = await initTranslations(locale, [
    "header",
    "products",
    "contact",
    "auth",
    "common",
    "checkout",
    "subscription",
    "wishlist",
    "common_placeholder",
    "edit_form",
    "movie_details",
    "about_us",
    "privacy_policy",
    "terms_conditions",
  ]);
  return (
        <TranslationsProvider
          resources={resources}
          locale={locale}
          namespaces={["products", "contact"]}
        >
          <Providers>
            {children}
          </Providers>
        </TranslationsProvider>
  );
}
