'use server'

import createClient from "@/utils/supabase/server";

export const checkPurchaseStatus = async (userId: string, productId: number) => {

  if (!userId || typeof userId !== "string") {
    return
  }
  
    const supabase = await createClient();


  const { data, error } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)    
    .eq("movie_id", productId);

  if (error) {
    console.error("Error checking purchase status:", error);
    throw error;
  }

  console.log('data', data, data.length);
  

  return data && data.length > 0; 
};