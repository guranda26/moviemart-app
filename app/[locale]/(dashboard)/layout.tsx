import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import ".././globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import i18nConfig from "@/configs/i18ncofig";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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

export enum Locale {
  en = "EN",
  ka = "KA",
  es = "ES",
}

type LocaleParams = {
  locale: Locale;
  [key: string]: string | number | undefined;
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
