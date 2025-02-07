'use client'

import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {

  const {t} = useTranslation()

  return (
    <footer className="bg-footerBg text-textCol py-3 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MovieApp. {t("movie_details:rights")}.</p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-6 text-xs md:text-sm flex-wrap">
            <li>
              <Link href="/about" className="hover:underline">
                {t("movie_details:about")}
              </Link>
            </li>
            <li className="break-all">
              <Link href="/privacy" className="hover:underline">
                {t("movie_details:privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
              {t("movie_details:terms")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
