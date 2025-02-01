"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import MonthlySubscriptionBtn from "@/components/MonthlySubscriptionBtn";
import AnnualSubscriptionBtn from "@/components/button/AnnualSubscriptionBtn";
import Loading from "@/components/Loading";

export default function SubscribePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        router.push("/sign-in"); 
      }
    };

    fetchUser();
  }, []);

  if (!userId) {
    return <Loading />;
  }

  return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-background text-textCol px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Choose Your Plan</h1>
        <p className="text-lg mb-10 text-center max-w-lg">
          Select the subscription that best fits your needs and enjoy exclusive benefits.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Monthly Plan */}
          <div className="bg-profileBg text-white rounded-lg shadow-lg p-6 text-center border border-redButton">
            <h2 className="text-2xl font-semibold mb-3">Monthly Plan</h2>
            <p className="text-lg mb-5">$19.99/month</p>
            <ul className="text-sm mb-6 space-y-2">
              <li>&#10003; Access to all premium content</li>
              <li>&#10003; Cancel anytime</li>
              <li>&#10003; Exclusive members-only offers</li>
            </ul>
            <MonthlySubscriptionBtn userId={userId} />
          </div>
  
          {/* Annual Plan */}
          <div className="bg-white dark:bg-bgDark rounded-lg shadow-lg p-6 text-center border border-redButton">
            <h2 className="text-2xl font-semibold mb-3">Annual Plan</h2>
            <p className="text-lg mb-5">$190.00/year</p>
            <ul className="text-sm mb-6 space-y-2">
              <li>&#10003; Save 20% compared to monthly</li>
              <li>&#10003; Priority customer support</li>
              <li>&#10003; Early access to new features</li>
            </ul>
            <AnnualSubscriptionBtn userId={userId} />
          </div>
        </div>
      </section>
  );
}