"use server";

import { encodedRedirect, returnError } from "@/utils/utils";
import createClient from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

  const user = data.user;
  // console.log("user", user);

  if (error || !user) {
    console.error(error?.message || "Unknown error during sign-up");
    return {
      success: false,
      message: error?.message || "Sign-up failed",
    };
  }

  const { error: profileError } = await supabase
    .from("profile")
    .upsert({ id: user.id, username, email, age });

  if (profileError) {
    console.error("Error inserting profile data:", profileError.message);
    return profileError.message || "Failed to save profile";
  }
  return {
    success: true,
    message:
      "Thanks for signing up! Please check your email for a verification link.",
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
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

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
  const supabase = await createClient();

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

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/protected/reset-password", error.message);
  }

  // if (error) {
  //   return {
  //     success: false,
  //     message: "Password update failed: " + error.message,
  //   };
  // }
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
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  // console.log("data", data);

  if (error) {
    console.error("Error during OAuth sign-in:", error);
  }

  if (data?.url) {
    redirect(data.url);
  } else {
    const user = (await supabase.auth.getUser()).data.user;
    // console.log("user", user);

    if (user) {
      const username = user.user_metadata?.user_name || "GitHub User";
      const email = user.email;
      const age = "";

      // console.log("user?", user);

      const { error: profileError } = await supabase
        .from("profile")
        .upsert({ id: user.id, username, email, age });

      if (profileError) {
        console.error("Error saving profile data:", profileError);
      } else {
        console.log("Profile saved successfully.");
      }
    }
  }
};

export const signinWithGithub = signInWith("github");
export const signinWithGoogle = signInWith("google");
