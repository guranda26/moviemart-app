"use client";

import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { usePurchaseStatus } from "@/app/[locale]/(dashboard)/hooks/usePurchaseStatus";
import { addToCart } from "@/app/actions/addToCartAction";
import { useTranslation } from "react-i18next";
import { TbShoppingCartShare } from "react-icons/tb";
import { CgSearchLoading } from "react-icons/cg";
import { MdCloudDone } from "react-icons/md";

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
         className="hover:scale-110 rounded-md text-white relative group flex items-center justify-center gap-2"
        type="submit"
          disabled={pending} 
          data-cy="add-to-cart-btn"
        >
       {isLoading ? 
       <>
       <CgSearchLoading />
       <span className="absolute left-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-textCol break-none w-12">{t("movie_details:loading")}</span>
       </>
      : 
       <>
       <TbShoppingCartShare />
       <span className="text-sm block">{t("movie_details:add_to_cart")}</span>
       </>
       }
        </button>
      </form>) :
      <div>
        <MdCloudDone />
        <span className="text-sm">{t("movie_details:purchased")}</span>
      </div>
      // <button className="py-2 px-3 bg-gray-500 rounded-md text-white">
        // {t("movie_details:purchased")}
        // </button>
      }
    </>
  );
};

export default AddToCartButton;
