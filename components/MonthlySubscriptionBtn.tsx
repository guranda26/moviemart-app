"use client";

import { createSubscriptionAction } from "@/app/actions/stripe/createSubscriptionActions";
import { useState } from "react";

const MonthlySubscriptionBtn = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await createSubscriptionAction(userId);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubscribe}>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-btnBg hover:bg-hoverDarkBtn text-textCol font-semibold py-2 px-4 rounded"
      >
        {loading ? "Redirecting..." : "Subscribe Now"}
      </button>
    </form>
  );
};

export default MonthlySubscriptionBtn;