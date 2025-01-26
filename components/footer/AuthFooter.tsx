"use client";

import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const AuthFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="text-textCol text-xs flex flex-col sm:flex-row h-full gap-2 justify-center items-center text-center">
      <Link className="hover:text-[#c6c6c6]" href={"/privacy-policy"}>
        {t("home:privacy_policy")}
      </Link>
      <span className="sm:inline-block hidden">|</span>
      <Link className="hover:text-[#c6c6c6]" href={"/terms-and-conditions"}>
        {t("home:terms_and_conditions")}
      </Link>
    </footer>
  );
};

export default AuthFooter;
