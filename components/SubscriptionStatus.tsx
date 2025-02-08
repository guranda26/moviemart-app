import Stripe from "stripe";
import createClient from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkSubscriptionStatus = async (userId: string) => {
  const supabaseClient = await createClient();

  const { data: user, error: userError } = await supabaseClient
    .from("profile")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single();

    if (userError || !user?.stripe_customer_id) {
      console.warn("User or Stripe customer ID not found");
      return false;
    }

  const subscriptions = await stripe.subscriptions.list({
    customer: user.stripe_customer_id,
    status: "all",
  });

  const hasActiveSubscription = subscriptions.data.some(
    (sub) => sub.status === "active"
  );

  return hasActiveSubscription;
};