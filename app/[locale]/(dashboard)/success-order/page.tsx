"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

export default function OrderSuccess() {
  const router = useRouter();

  const [status, setStatus] = useState("loading");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

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
            Something went wrong
          </h1>
          <p className="mt-4 text-gray-600">
            Your operation has failed. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700">Redirecting to the movies page...</p>
      </div>
    </div>
  );
}
