"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";

const ThemeButton = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("user-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="flex space-x-2 items-center ml-auto max-w-[50px]">
      <button
        onClick={() => handleThemeChange("light")}
        className={`cursor-pointer p-2 rounded-full ${
          resolvedTheme === "light"
            ? "bg-white text-gray-800"
            : "bg-transparent"
        }`}
      >
        <MdLightMode className="max-w-5 max-h-5" />
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className={`cursor-pointer p-2 rounded-full ${
          resolvedTheme === "dark" ? "bg-gray-700 text-white" : "bg-transparent"
        }`}
      >
        <FaMoon className="max-w-5 max-h-5" />
      </button>
      <button
        onClick={() => handleThemeChange("system")}
        className={`cursor-pointer p-2 rounded-full ${
          theme === "system" ? "bg-gray-500 text-white" : "bg-transparent"
        }`}
      >
        <BsLaptop className="max-w-5 max-h-5" />
      </button>
    </div>
  );
};

export default ThemeButton;
