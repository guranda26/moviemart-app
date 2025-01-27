"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const useLocaleFromPath = () => {
  const [locale, setLocale] = useState("en");
  const pathname = usePathname();

  useEffect(() => {
    const isKa = pathname.includes("/ka");

    if (isKa) {
      setLocale("ka");
    } else if (!isKa && locale !== "en") {
      setLocale("en");
    }
  }, [pathname]);

  return locale;
};

export default useLocaleFromPath;
