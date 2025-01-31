"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import MonthlySubscriptionBtn from "@/components/button/MonthlySubscriptionBtn";
import AnnualSubscriptionBtn from "@/components/button/AnnualSubscriptionBtn";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";

export default function SubscribePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const {t} = useTranslation()

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
        <h1 className="text-3xl xs:text-4xl font-bold mb-6 text-center"> {t("subscription:subscription_txt")}</h1>
        <p className="text-lg mb-10 text-center max-w-lg">
        {t("subscription:subscription_msg")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-profileBg text-white rounded-lg shadow-lg p-6 text-center border border-redButton">
            <h2 className="text-2xl font-semibold mb-3">{t("subscription:monthly_plan")}</h2>
            <p className="text-lg mb-5">$19.99/{t("subscription:month")}</p>
            <ul className="text-sm mb-6 space-y-2">
              <li>&#10003; {t("subscription:access_txt")}</li>
              <li>&#10003; {t("subscription:wishlist")}</li>
              <li>&#10003; {t("subscription:cancel")}</li>
              <li>&#10003; {t("subscription:exclusive")}</li>
            </ul>
            <MonthlySubscriptionBtn userId={userId} />
          </div>
  
          <div className="bg-white dark:bg-bgDark rounded-lg shadow-lg p-6 text-center border border-redButton">
            <h2 className="text-2xl font-semibold mb-3">{t("subscription:annual_plan")}</h2>
            <p className="text-lg mb-5">$190.00/{t("subscription:year")}</p>
            <ul className="text-sm mb-6 space-y-2">
              <li>&#10003; {t("subscription:annual_benefit")}</li>
              <li>&#10003; {t("subscription:wishlist")}</li>
              <li>&#10003; {t("subscription:customer_support")}</li>
              <li>&#10003; {t("subscription:access_features")}</li>
            </ul>
            <AnnualSubscriptionBtn userId={userId} />
          </div>
        </div>
      </section>
  );
}