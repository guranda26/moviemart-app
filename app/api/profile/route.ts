import createClient from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = await req.json();

    // console.log("response", response);

    const { id, username, email, password, age } = response;

    const supabase = await createClient()
    const { error } = await supabase.from("profile").insert([
      {
        id,
        username,
        email,
        password,
        age,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    const { data: updatedProfile, error: fetchError } = await supabase
      .from("profile")
      .select("*");

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    return NextResponse.json({
      message: "Profile successfully updated!",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error creating product or price:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
