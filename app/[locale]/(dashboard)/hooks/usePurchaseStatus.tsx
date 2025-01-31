import { useEffect, useState } from "react";
import { checkPurchaseStatus } from "@/utils/supabase/checkPurchaseStatus";

export const usePurchaseStatus = (userId: string, productId: number) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId || !productId) {
      setIsLoading(false);
      return;
    }

    const checkPurchase = async () => {
      try {
        const purchased = await checkPurchaseStatus(userId, productId);
        setIsPurchased(!!purchased);
      } catch (error) {
        console.error("Error checking purchase status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPurchase();
  }, [userId, productId]);

  return { isPurchased, isLoading };
}