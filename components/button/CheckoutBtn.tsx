"use client";

import { CheckoutButtonProps } from "@/Interfaces/Cart";
import React from "react";
import { useTranslation } from "react-i18next";

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cart }) => {
  const {t} = useTranslation()
  const transformCartToLineItems = () =>
    cart.map((item) => {
      if (!item.movies.title || !item.movies.title) {
        console.error("Invalid item data: ", item);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.movies.title,
            images: item.movies.imageSrc ? [item.movies.imageSrc] : [],
          },
          unit_amount: Math.round(item.movies.price * 100),
        },
        quantity: 1
      };
    });


  const handleCheckout = async () => {
    const lineItems = transformCartToLineItems();

    const invalidItems = lineItems.filter(
      (item) =>
        !item.quantity || !item.price_data || !item.price_data.unit_amount
    );
    if (invalidItems.length > 0) {
      console.log("Invalid line items:", invalidItems);
      alert("One or more items are incomplete. Please review your cart.");
      return;
    }

    console.log("Valid Line Items to Send:", JSON.stringify(lineItems));

    const res = await fetch("/api/cart-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lineItems,
        metadata: cart.map((item) => ({
          productId: item.movie_id,
          userId: item.user_id,
        })),
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create Stripe Checkout session.");
    }

    const { url } = await res.json();

    if (url) {
      window.location.href = url;
    } else {
      console.error("No URL returned from API.");
    }
    window.location.href = url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="py-2 px-3 bg-[#e24a4a] hover:bg-[#b43e3e]  transition-all-color hover:scale-105 rounded-md text-white w-[110px]"
      >
      {t("movie_details:checkout")}
    </button>
  );
};

export default CheckoutButton;
