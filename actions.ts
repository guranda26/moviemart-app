"use server";

import { encodedRedirect, returnError } from "@/utils/utils";
import createClient from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { stripe } from "./utils/supabase/lib/stripe";

export const signUpAction = async (formData: FormData) => {
  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const age = formData.get("age");
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !username || !age) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { username, age },
    },
  });

  if (!data || !data.user) {
    return {
      success: false,
      message: "User creation failed",
    };
  }  

  const user = data?.user;

  if (error || !user) {
    console.error(error?.message || "Unknown error during sign-up");
    return {
      success: false,
      message: "Sign-up failed",
    };
  }

  let customerId = null;

  try {
    const customer = await stripe.customers.create({
      email,
      name: username,
      metadata: {
        supabase_user_id: user.id,
      },
    });
    customerId = customer.id    
  } catch (error) {
    console.error("Stripe customer creation failed:", error);
    return {
      success: false,
      message: "Failed to create Stripe customer",
    };    
  }


  const { error: profileError } = await supabase
    .from("profile")
    .upsert({ id: user.id, username, email, age, stripe_customer_id: customerId });

  if (profileError) {
    console.error("Error inserting profile data:", profileError.message);
    return profileError.message || "Failed to save profile";
  }
  return {
    success: true,
    message:
      "Thanks for signing up!",
  };
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }
  const supabase = await createClient();
  const { data, error: queryError } = await supabase
    .from("profile")
    .select("email")
    .eq("email", email)
    .single();

  if (queryError || !data) {
    console.error(queryError?.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "No account with that email exists."
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return {
      success: false,
      message: "The user doesn't exist",
    };
  }

  if (password !== confirmPassword) {
    const errorResponse = returnError("error", "Passwords do not match");
    console.log("errorResponse", errorResponse);

    return errorResponse;
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/protected/reset-password", error.message);
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/home");
};

type Provider =
  | "google"
  | "github"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "apple";

  const signInWith = (provider: Provider) => async () => {
    const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;
    const supabase = await createClient();
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: auth_callback_url },
    });
  
    if (error) {
      console.error("Error during OAuth sign-in:", error);
      return;
    }
  
    if (data?.url) {
      redirect(data.url);
      return;
    }
  
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;
  
    if (userError || !user) {
      console.error("Error fetching user:", userError);
      return;
    }
  
    const email = user.email;
    const username = user.user_metadata?.user_name || "GitHub User";
    const age = "";
  
    const { data: existingUser, error: fetchError } = await supabase
      .from("profile")
      .select("id, stripe_customer_id")
      .eq("email", email)
      .single();
  
    let customerId = existingUser?.stripe_customer_id || null;
  
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking for existing user:", fetchError);
      return;
    }
  
    if (!customerId) {
      try {
        const customer = await stripe.customers.create({
          email,
          name: username,
          metadata: { supabase_user_id: user.id },
        });
        customerId = customer.id;
      } catch (stripeError) {
        console.error("Stripe customer creation failed:", stripeError);
      }
    }
  
    const { error: profileError } = await supabase
      .from("profile")
      .upsert({
        id: existingUser?.id || user.id, 
        username,
        email,
        age,
        stripe_customer_id: customerId,
      });
  
    if (profileError) {
      console.error("Error updating profile:", profileError);
    } else {
      console.log("Profile updated successfully.");
    }
  };
  

export const signinWithGithub = signInWith("github");
export const signinWithGoogle = signInWith("google");
