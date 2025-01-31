"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnBackButton from "@/components/ReturnBack";

export default function OrderCancel() {
  const {t} = useTranslation("checkout")
  const router = useRouter();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");


  console.log('productName', sessionId);
  
  const PushRoute = () => {
    router.push("/cart");
  };


  useEffect(() => {
    toast.error("Payment canceled !", {
      position: "bottom-right",
      autoClose: 4000
    });
    setTimeout(() => {
      PushRoute();
    }, 5000);
  }, []);
  

  if (!sessionId) {
    router.push("/");
    return null;
  }

  

  return (
    <div className=" h-screen  px-6 flex items-center justify-center bg-background">
      <div className="flex items-center justify-center bg-green-400">
        <div className="p-6 flex flex-col bg-white rounded shadow-md gap-3">
          <h1 className="text-3xl font-bold text-red-600">{t('checkout:cancel_txt')}</h1>
          <p className="text-gray-700">
            {t("checkout:cancel_msg")}
            <br />
          </p>

          <ReturnBackButton />
        </div>
      </div>
    </div>
  );
}
