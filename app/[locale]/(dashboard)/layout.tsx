import type { Metadata } from "next";
import ".././globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import i18nConfig from "@/configs/i18ncofig";
import ClientSideToastContainer from "@/components/ClientSideToastContainer";

export const metadata: Metadata = {
  title: "Moviemart Platform",
  description: "Watch movies and series exclusively on Moviemart",
};

export enum Locale {
  en = "EN",
  ka = "KA",
  es = "ES",
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <ClientSideToastContainer />
    <section className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </section>
    </>
  );
}
