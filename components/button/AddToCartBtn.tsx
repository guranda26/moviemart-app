"use client";

import { useActionState, useEffect } from "react";
import { addToCart } from "../addToCart";
import { toast, ToastContainer } from "react-toastify";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  productPrice: number;
}

const AddToCartButton = ({ productId, productName, productPrice }: AddToCartButtonProps) => {
  const [state, formAction, pending] = useActionState(addToCart, {
    message: "",
    error: false,
    success: false,
  });

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
          {pending ? "Adding..." : "Add to Cart"}
        </button>
      </form>
    </>
  );
};

export default AddToCartButton;
