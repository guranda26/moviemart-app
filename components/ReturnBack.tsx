"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ReturnBackButtonProps } from "../Interfaces/ReturnBack";

const ReturnBackButton: React.FC<ReturnBackButtonProps> = ({
  fallbackRoute = "/",
}) => {
  const path = usePathname();
  const router = useRouter();

  const returnBack = () => {
    const pathSegments = path.split("/").filter(Boolean);
    if (pathSegments.length > 1) {
      const newPath = `/${pathSegments.slice(0, -1).join("/")}`;
      router.push(newPath);
    } else {
      router.push(fallbackRoute);
    }
  };

  return (
    <button
      className="bg-redButton hover:bg-hoverRedBtn border border-[#7e1313] text-white px-4 py-2 rounded-lg transition"
      onClick={returnBack}
    >
      Return Back
    </button>
  );
};

export default ReturnBackButton;
