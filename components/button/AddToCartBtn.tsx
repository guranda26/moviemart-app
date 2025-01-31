"use client";

import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { usePurchaseStatus } from "@/app/[locale]/(dashboard)/hooks/usePurchaseStatus";
import { addToCart } from "@/app/actions/addToCartAction";
import { useTranslation } from "react-i18next";

export interface AddToCartButtonProps {
  userId: string;
  productId: number;
  productName: string;
  productPrice: number;
}

const AddToCartButton = ({ userId, productId, productName, productPrice }: AddToCartButtonProps) => {
const [state, formAction, pending] = useActionState(addToCart, {
    message: "",
    error: false,
    success: false,
  });

  const {t} = useTranslation()
  const { isPurchased, isLoading } = usePurchaseStatus(userId, productId);

  useEffect(() => {
    if (state?.message) {
      if (state.error) {
        toast.error(state.message, { position: "top-center", autoClose: 3000 });
      } else {
        toast.success(state.message, { position: "top-center", autoClose: 3000 });
      }
    }
  }, [state]);

  return (
    <>
      <ToastContainer />
      { !isPurchased ? (
      <form action={formAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="productName" value={productName} />
        <input type="hidden" name="productPrice" value={productPrice} />
        <button
          className="py-2 px-3 bg-teal-600 hover:bg-teal-800 transition-colors hover:scale-105 rounded-md text-white w-[110px]"
          type="submit"
          disabled={pending} 
          data-cy="add-to-cart-btn"
        >
       {isLoading ? `${t("movie_details:loading")}` : `${t("movie_details:add_to_cart")}`}
        </button>
      </form>) :
      <button className="py-2 px-3 bg-gray-500 rounded-md text-white">{t("movie_details:purchased")}</button>
      }
    </>
  );
};

export default AddToCartButton;
