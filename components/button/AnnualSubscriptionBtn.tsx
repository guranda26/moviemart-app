"use client";

import { createAnnualSubscriptionAction } from "@/app/actions/stripe/createAnnualSubscriptionAction";
import { useState } from "react";

const AnnualSubscriptionBtn = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await createAnnualSubscriptionAction(userId);
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
        className="w-full bg-redButton hover:bg-hoverRedBtn text-white font-semibold py-2 px-4 rounded"
      >
        {loading ? "Redirecting..." : "Subscribe Now"}
      </button>
    </form>
  );
};

export default AnnualSubscriptionBtn;