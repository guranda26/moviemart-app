"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { MdDelete } from "react-icons/md";
import CheckoutButton from "@/components/button/CheckoutBtn";
import { useTranslation } from "react-i18next";
import {toast} from 'react-toastify'
import Image from "next/image";
import Loading from "@/components/Loading";

const Page = () => {
  const { cart = [], fetchCart } = useCart();
  const {t} = useTranslation()
  const [loading, setLoading] = useState(false)

  const onDelete = async (productId: number) => {
    console.log('deleting productId', productId);
    if (!confirm("Are you sure you want to delete this item?")) return;
    setLoading(true)

    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-from-cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );
      setLoading(false)
      if (!response.ok) {
        throw new Error("Failed to delete the item from the cart");
      }

      await fetchCart();

      console.log('cart', cart);

      

    } catch (error) {
      console.error("Error deleting item:", error);
      toast.success("There was an error deleting the item. Please try again.");
    } finally {
      setLoading(false); 
    }
  };


  const totalAmount = cart
    ? cart.reduce(
        (total, item) => total + item.movies.price * item.quantity,
        0
      )
    : 0;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full md:w-[75vw] p-3 md:p-6 mx-auto text-center min-h-screen flex flex-col">
      <h2 className="text-2xl xs:text-4xl font-bold text-textCol mb-10 justify-self-start">
        {t("movie_details:cart")}
      </h2>
  
      {loading && <Loading />}
  
      {cart && cart.length > 0 ? (
        <>
          <div className="w-full">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-t p-4 bg-white rounded-lg shadow-md flex justify-center xs:justify-between items-center mb-4 flex-wrap"
              >
                <img
                  src={item.movies.imageSrc}
                  alt={item.movies.title}
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-md xs:text-lg font-medium text-gray-700">
                    {item.movies.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {t("products:price")}: ${item.movies.price}
                  </p>
                </div>
                <div>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete(item.movie_id)}
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <MdDelete size={24} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <Image width={200} height={200} src={'/assets/shopping-cart.svg'} alt="shopping cart" />
          <h2 className="text-center text-textCol text-base sm:text-lg">
            {t("movie_details:empty_cart")}
          </h2>
        </div>
      )}
  
      {cart && cart.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-lg mt-6">
          <h2 className="text-xl text-black font-semibold">
            {t("movie_details:sum")}: ${totalAmount}
          </h2>
          <CheckoutButton cart={cart} />
        </div>
      )}
    </div>
  );
  
  
};

export default Page;
