"use client";

import { usePurchaseStatus } from "@/app/[locale]/(dashboard)/hooks/usePurchaseStatus";
import React from "react";
import { useTranslation } from "react-i18next";

interface BuyProductButtonProps {
  userId: string;
  productId: number;
  productName: string;
  productPrice: string | number;
  productDescription?: string;
  productImage?: string;
}

const BuyProductButton = ({
  userId,
  productId,
  productName,
  productPrice,
  productDescription,
  productImage,
}: BuyProductButtonProps) => {

  const {isPurchased, isLoading} = usePurchaseStatus(userId, productId)
  const {t} = useTranslation()

  async function handleBuyProduct() {
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          productPrice,
          productDescription,
          productImage,
          userId,
        }),
        
      });


      if (!response.ok) {
        throw new Error("Failed to create Stripe Checkout session.");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        console.error("No URL returned from API.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error processing checkout: ${error.message}`);
      } else {
        console.error("An unknown error occurred during checkout.");
      }
    }
  }
  return (
    <>
    {!isPurchased ? (
        <button
        className="py-2 px-3 bg-[#e24a4a] hover:bg-[#b43e3e]  transition-all-color hover:scale-105 rounded-md text-white w-[110px]"
        onClick={() => handleBuyProduct()}
        data-cy="buy-product-btn"
        >
       {isLoading ? `${t("movie_details:loading")}` : `${t("movie_details:buy_now")}`}
       </button>
      ) : (
        <button
        className="py-2 px-3 bg-[#e24a4a] hover:bg-[#b43e3e]  transition-all-color hover:scale-105 rounded-md text-white w-[110px]"
        onClick={() => handleBuyProduct()}
        >
       {t("movie_details:purchased")}
       </button> 
      )}
    </>
  );
};

export default BuyProductButton;
