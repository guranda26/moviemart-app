import { supabase } from "@/utils/supabase/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = await req.json();

    console.log("response", response);

    const { id, username, email, password } = response;

    // if (!name || !description || !image_link) {
    //   throw new Error("Name, description, and photo URL are required");
    // }

    // const generatedId = Date.now();

    const { error } = await supabase.from("profile").insert([
      {
        id,
        username,
        email,
        password,
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
