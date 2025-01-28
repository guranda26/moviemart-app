"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

type LinkProps = {
  href: string;
  className?: string;
};

const ReturnLink = ({ href, className }: LinkProps) => {
  const { t } = useTranslation();

  return (
    <Link
      href={href}
      className={`absolute top-16 lg:top-4 left-4 my-2 xl:my-0 flex items-center gap-2 px-2 py-1 xs:px-4 xs:py-2 text-sm font-medium text-white bg-redButton rounded shadow hover:bg-hoverRedBtn transition-transform transform hover:scale-105 duration-300 z-50 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 inline-block" />
      <span className="hidden xl:inline-block">{t("common:go_back")}</span>
    </Link>
  );
};

export default ReturnLink;
