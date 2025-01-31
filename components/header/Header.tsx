"use client";

import { signOutAction } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeButton from "../button/ThemeButton";
import { GiExitDoor } from "react-icons/gi";
import { LuCircleUserRound } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import ToggleLanguage from "../ToggleLanguage";
import "react-tooltip/dist/react-tooltip.css";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

export enum Locale {
  en = "EN",
  ka = "KA",
}

const Header = () => {
  const { t } = useTranslation();
  return (
    <section>
      <header className="flex justify-between max-w-screen bg-headerBg">
        <nav className="w-full px-10">
          <ul className="flex items-center justify-between">
            <li>
              <Link href={"/"}>
                <Image
                  src={"/assets/logo.png"}
                  alt="logo"
                  width={70}
                  height={80}
                />
              </Link>
            </li>
            <li>
              <Link href={"/blogs"} className="text-2xl">
                {t("header:blog")}
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className="text-2xl">
                {t("header:contact")}
              </Link>
            </li>
            <li>
              <Link href={"/cart"} className="text-2xl">
                <MdOutlineShoppingCartCheckout />
                {/* {t("header:cart")} */}
              </Link>
            </li>
            <li>
              <div className="text-2xl relative group">
                <Link href={"/wishlist-form"} data-cy="wishlist-url"
                >
                  <Image width={20} height={20} src="/assets/wishlist.png" alt="wishlist" className="w-5" />
                </Link>
                <Link href={"/wishlist"}>
                <span className="hidden md:inline-block absolute left-1/2 -translate-x-1/2 top-10 bg-gray-800 text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white"
                >
                  Wishlist
                </span>
                </Link>
              </div>
            </li>
            <li className="relative group">
              <Link href="/profile" className="text-2xl relative group">
                <LuCircleUserRound />
                <span className="hidden md:inline-block absolute left-1/2 -translate-x-1/2 top-10 bg-gray-800 text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <form action={signOutAction} className="">
                <button
                  type="submit"
                  className="font-bold flex flex-col items-center"
                  data-cy='log-out'
                >
                  <GiExitDoor width={20} className="text-3xl" />
                  <span>{t("header:sign_out")}</span>
                </button>
              </form>
            </li>
            <li>
              <ThemeButton />
            </li>
            <li className="text-center md:flex md:flex-col">
              <ToggleLanguage />
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
