"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import ReturnBackButton from "@/components/ReturnBack";

export default function OrderSuccess() {
  const router = useRouter();

  const [status, setStatus] = useState("loading");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const {t} = useTranslation()

  useEffect(() => {
    if (sessionId) {
      saveOrderToSupabase();
    } else {
      console.error("No session ID found.");
      setStatus("failed");
    }
  }, [sessionId]);

  async function saveOrderToSupabase() {
    try {
      const response = await fetch(`/api/check-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) throw new Error("Failed to fetch session details.");

      const { session } = await response.json();

      if (session.payment_status === "paid") {
        toast.success("Payment Successful!", { position: "bottom-right" });

        const timer = setTimeout(() => {
          router.push("/movies"); 
        }, 3000);

        setStatus("loaded");

        return () => clearTimeout(timer); 
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      setStatus("failed");
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">
          <Loading />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-red-600">
            {t('checkout:error_txt')}
          </h1>
          <p className="mt-4 text-gray-600">
          {t('checkout:error_msg')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
        <div className="p-6 flex flex-col bg-white rounded shadow-md gap-3 max-w-[400px]">
        <h1 className="text-3xl font-bold text-[#136F63] mb-4">{t("checkout:success_msg")}</h1>
        <ReturnBackButton className="bg-purpleButton" />      
    </div>
    </div>
  );
}
