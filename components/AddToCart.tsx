"use server";

import Stripe from "stripe";
import createClient from "@/utils/supabase/server";

export const addToCart = async (
  prevState: { message: string, success: boolean, error: boolean } | null,
  formData: FormData
) => {
  const productId = Number(formData.get("productId"));
  const productName = String(formData.get("productName"));
  const productPrice = Number(formData.get("productPrice"));

  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) {
    return { message: "You need to log in to add items to the cart.", error: true };
  }

  const { data: existingCartItem, error: fetchError } = await supabase
    .from("cart")
    .select("*")
    .eq("movie_id", productId)
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching cart item:", fetchError);
    return { message: "Failed to check the cart. Please try again.", error: true };
  }

  if (existingCartItem) {
    return { message: "This product is already in your cart.", error: true };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const stripeProduct = await stripe.products.create({ name: productName });
  const stripePrice = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: Math.round(productPrice * 100),
    currency: "usd",
  });

  const { error: insertError } = await supabase.from("cart").insert({
    movie_id: productId,
    user_id: userId,
    stripe_movie_id: stripeProduct.id,
    stripe_price_id: stripePrice.id,
    quantity: 1,
  });

  if (insertError) {
    console.error("Error inserting new item:", insertError);
    return { message: "There was an error adding the product to your cart.", error: true };
  }

  return { message: "Product added to cart successfully!", success: true };
};
