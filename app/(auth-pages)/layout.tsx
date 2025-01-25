import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";

import ".././globals.css";
import { Suspense } from "react";
import Loading from "@/components/Loading";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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

export const metadata: Metadata = {
  title: "Moviemart Platform",
  description: "Watch movies and series exclusively on Moviemart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
