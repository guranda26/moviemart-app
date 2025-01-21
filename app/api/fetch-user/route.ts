import { createClient } from "@/utils/supabase/server"; // Ensure the correct import path
import { getUser } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Retrieve user using the shared getUser function
    const user = await getUser();

    // If no user is logged in, return an appropriate error response
    if (!user) {
      return NextResponse.json(
        { error: "User not logged in", status: 401 },
        { status: 401 }
      );
    }

    // Create a Supabase client to fetch the user's profile
    const supabase = await createClient();
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    // Handle errors while fetching the profile
    if (profileError) {
      return NextResponse.json(
        { error: "Profile not found", status: 404 },
        { status: 404 }
      );
    }

    // Return the user and profile data
    return NextResponse.json({ user, profile });
  } catch (error) {
    console.error("Error in fetch-profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
