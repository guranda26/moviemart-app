import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
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
};

export async function getUser() {
  const { auth } = await createClient();
  const user = (await auth.getUser()).data.user;
  return user;
}

export async function protectRoute(pathname: string) {
  const user = await getUser();

  if (
    !user &&
    ![
      "/sign-in",
      "/sign-up",
      "/home",
      "/forgot-password",
      "/subscribe",
      "/privacy-policy",
      "/terms-and-conditions",
      "/auth/callback",
      "/protected/reset-password",
      "/reset-password",
    ].includes(pathname)
  ) {
    return { redirect: "/home" };
  }

  if (user && ["/sign-in", "/sign-up"].includes(pathname)) {
    return { redirect: "/" };
  }

  return { redirect: null };
}
