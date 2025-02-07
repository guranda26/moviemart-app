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
import { FaNewspaper } from "react-icons/fa6";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";

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
              <Link href={"/blogs"} className="flex flex-col items-center">
                <FaNewspaper className="text-2xl" />
                {t("header:blog")}
              </Link>
            </li>
            <li>
              <div className="relative group">
                <Link href={"/wishlist-form"}
                className="flex flex-col items-center"
                data-cy="wishlist-url"
                >
                  <FaHeartCirclePlus className="text-2xl" />
                  <span>{t("common_placeholder:wishlist")}</span>
                </Link>
                <Link href={"/wishlist"}>
                </Link>
              </div>
            </li>
            <li>
              <Link href={"/contact"} className="flex flex-col items-center">
              <AiFillMessage className="text-2xl" />
                <span>{t("header:contact")}</span>
              </Link>
            </li>
            <li className="relative group">
              <div className="relative z-50">
                <Link href="/profile" className="flex items-center flex flex-col items-center">
                  <LuCircleUserRound className="text-2xl" />
                  <span className="hidden md:inline-block">{t("common_placeholder:profile")}</span>
                </Link>             
                <ul className="absolute left-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      {t("common_placeholder:profile")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/movies"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      {t("common_placeholder:movies")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      {t("common_placeholder:orders")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/subscribe"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      {t("common_placeholder:subscription")}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link href={"/cart"} className="flex flex-col items-center">
                <MdOutlineShoppingCartCheckout className="text-2xl" />
                <span className="hidden md:inline-block">{t("common_placeholder:cart")}</span>
                {/* {t("header:cart")} */}
              </Link>
            </li>
            <li>
              <form action={signOutAction} className="">
                <button
                  type="submit"
                  className="font-bold flex flex-col items-center"
                  data-cy='log-out'
                >
                  <GiExitDoor width={20} className="text-2xl" />
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
