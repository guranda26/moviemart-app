import createClient from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, username, email, age } = await req.json();

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("profile")
      .update({ username, email, age })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating profile:", error.message);
    } else {
      throw new Error("Something went wrong. Please try again later");
    }
    return NextResponse.json(
      { error: "Failed to update profile", status: 500 },
      { status: 500 }
    );
  }
}
