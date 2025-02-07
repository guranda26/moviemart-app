import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { dir } from "i18next";
import "./[locale]/globals.css";
import { Locale } from "@/Types/types";
import i18nConfig from "@/configs/i18ncofig";

export const metadata: Metadata = {
  title: "Moviemart Platform",
  description: "Watch movies and series exclusively on Moviemart",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});


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

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${lato.variable} flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
