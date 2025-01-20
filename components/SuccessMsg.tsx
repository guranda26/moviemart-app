"use client";

import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function SuccessMsg({ msg }: { msg: string }) {
  const router = useRouter();

  useEffect(() => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
    });

    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [msg, router]);

  return <ToastContainer />;
}
