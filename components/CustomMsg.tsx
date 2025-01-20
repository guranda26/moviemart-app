"use client";

import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomMsg({
  action,
  msg,
}: {
  action: "success" | "error";
  msg: string;
}) {
  useEffect(() => {
    if (action === "success") {
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
      });
    } else if (action === "error") {
      toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  }, [action, msg]);

  return <ToastContainer className="z-50 mt-5" />;
}
