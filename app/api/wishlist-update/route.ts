import createClient from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, name, type, language, year, comment, image_src, comment_ka } = await req.json();

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("wishlist")
      .update({ name, type, language, year, comment, image_src, comment_ka })
      .eq("id", id);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
    return NextResponse.json({ message: "Wishlist movie is updated successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating profile:", error.message);
    } else {
      throw new Error("Something went wrong. Please try again later");
    }
    return NextResponse.json(
      { error: "Failed to update wishlist page", status: 500 },
      { status: 500 }
    );
  }
}
