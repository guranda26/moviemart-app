"use client";

import { signOutAction } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThemeButton from "../button/ThemeButton";
import { GiExitDoor } from "react-icons/gi";
import { LuCircleUserRound } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import ToggleLanguage from "../ToggleLanguage";
import "react-tooltip/dist/react-tooltip.css";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaNewspaper, FaHeartCirclePlus } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";


export enum Locale {
  en = "EN",
  ka = "KA",
}

const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section>
      <header className="flex justify-between max-w-screen bg-headerBg p-2 xs:p-4 lg:p-0">
        <nav className="w-full p-4 lg:px-10">
          <div className="flex items-center justify-between lg:hidden">
            <Link href="/">
              <Image src="/assets/logo.png" alt="logo" width={40} height={50} className="xs:w-[50px] xs:h-[60px]"/>
            </Link>
            <div className="flex gap-5 items-center">
            <form action={signOutAction} className={`hidden xs:flex ${isMobileMenuOpen && "hidden"}`}>
              <button type="submit" className={`font-bold flex flex-col ${isMobileMenuOpen && "hidden"} items-center ml-auto`}>
                <GiExitDoor className="text-2xl" />
                <span className="text-xs">{t("header:sign_out")}</span>
              </button>
            </form>
              <ToggleLanguage />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl"
            >
              {isMobileMenuOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
            </button>
            </div>
          </div>
          <ul
            className={`lg:flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${isMobileMenuOpen ? "flex" : "hidden"} lg:block`}
          >
            <li>
            <Link href="/" className="hidden lg:block">
              <Image src="/assets/logo.png" alt="logo" width={50} height={60} />
            </Link>
            </li>
            <li>
              <Link href="/blogs" className="flex flex-col items-center">
                <FaNewspaper className="text-2xl" />
                {t("header:blog")}
              </Link>
            </li>
            <li>
              <Link href="/wishlist-form" className="flex flex-col items-center">
                <FaHeartCirclePlus className="text-2xl" />
                {t("common_placeholder:wishlist")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex flex-col items-center">
                <AiFillMessage className="text-2xl" />
                {t("header:contact")}
              </Link>
            </li>
            <li className="relative group">
              <div className="relative z-50">
                <Link href="/profile" className="flex flex-col items-center">
                  <LuCircleUserRound className="text-2xl" />
                  <span>{t("common_placeholder:profile")}</span>
                </Link>
                <ul className="absolute left-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">
                      {t("common_placeholder:profile")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/movies" className="block px-4 py-2 hover:bg-gray-700">
                      {t("common_placeholder:movies")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-700">
                      {t("common_placeholder:orders")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/subscribe" className="block px-4 py-2 hover:bg-gray-700">
                      {t("common_placeholder:subscription")}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link href="/cart" className="flex flex-col items-center">
                <MdOutlineShoppingCartCheckout className="text-2xl" />
                <span>{t("common_placeholder:cart")}</span>
              </Link>
            </li>
            <li className="order-hide">
              <Link href="/orders" className="flex flex-col items-center lg:hidden">
                <IoBagCheckOutline className="text-2xl" />
                <span>{t("common_placeholder:orders")}</span>
              </Link>
            </li>
            <li>
              <form action={signOutAction}>
                <button type="submit" className="font-bold flex flex-col items-center justify-center mx-auto">
                  <GiExitDoor className="text-2xl" />
                  <span>{t("header:sign_out")}</span>
                </button>
              </form>
            </li>
            <li className={`${isMobileMenuOpen && "mx-auto"}`}>
              <ThemeButton />
            </li>
            <li className="text-center hidden lg:flex lg:flex-col">
              <ToggleLanguage />
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
