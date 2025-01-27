import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo =
    requestUrl.searchParams.get("redirect_to")?.toString() || "/";

  if (code) {
    const supabase = await createClient();
    const { data: session, error: authError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (authError) {
      console.error("Error exchanging code for session:", authError);
      return NextResponse.json(
        { error: "Failed to exchange code for session", status: 500 },
        { status: 500 }
      );
    }

    if (session?.user) {
      // console.log("Authenticated user:", session.user);

      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        console.error("Profile not found, creating profile...", profile);

        const username = session.user.user_metadata?.full_name || "New User";
        const email = session.user.email;

        const { error: createError } = await supabase
          .from("profile")
          .insert({ id: session.user.id, username, email });

        if (createError) {
          console.error("Error creating profile:", createError);
          return NextResponse.json({
            error: "Failed to create user profile",
            status: 500,
          });
        }

        // console.log("New profile created:", newProfile);
      }
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return NextResponse.redirect(`${origin}`);
}
