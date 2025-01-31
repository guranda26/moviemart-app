"use server";

import Stripe from "stripe";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createSubscriptionAction = async (userId: string) => {
  if (!userId || typeof userId !== "string") {
    console.log(typeof userId, 'userId');
    
    throw new Error("Invalid user ID");
  }

  const supabaseClient = await createClient();

  const { data: user, error: userError } = await supabaseClient
    .from("profile")
    .select("email, stripe_customer_id")
    .eq("id", userId)
    .single();

    console.log("User data:", user);
    console.log("User error:", userError);
    
    if (userError || !user) {
      throw new Error("User not found");
    }
    
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: userId,
        },
      });
      customerId = customer.id;
  
      const { error: updateError } = await supabaseClient
        .from("profile")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
  
      if (updateError) {
        console.error("Error updating profile with Stripe customer ID:", updateError);
        throw new Error("Failed to save Stripe customer ID");
      }
    }
  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/movies?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel-checkout?canceled=true`,
    client_reference_id: userId,
    customer: customerId,
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe session");
  }

  redirect(session.url);
};
