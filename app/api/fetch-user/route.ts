import createClient from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not logged in", status: 401 },
        { status: 401 }
      );
    }

    const supabase = await createClient();
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Profile not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, profile });
  } catch (error) {
    console.error("Error in fetch-profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
