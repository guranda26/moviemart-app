"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error(error);
          }
        },
      },
    }
  );
}

export async function getUser() {
  const { auth } = await createClient();
  const user = (await auth.getUser()).data.user;
  return user;
}

export async function protectRoute(pathname: string) {
  const normalizedPathname = pathname.replace(/^\/(ka|en)(?=\/|$)/, "");
  const user = await getUser();

  // console.log("User:", user);
  // console.log("Original Pathname:", pathname);
  // console.log("Normalized Pathname:", normalizedPathname);

  const authRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/home"];

  if (
    !user &&
    ![
      "/sign-in",
      "/sign-up",
      "/home",
      "/forgot-password",
      "/subscribe",
      // "/privacy-policy",
      // "/terms-and-conditions",
      "/auth/callback",
      "/protected/reset-password",
      "/reset-password",
    ].includes(pathname)
  ) {
    return { redirect: "/home" };
  }

  if (user && authRoutes.includes(pathname)) {
    console.log("Redirecting to /");
    return { redirect: "/" };
  }

  return { redirect: null };
}
