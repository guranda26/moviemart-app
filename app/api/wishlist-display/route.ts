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
    const { data: movies, error: moviesError } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", user.id);

    if (moviesError) {
      console.error("Supabase error:", moviesError);
      return NextResponse.json(
        { error: "Movies are not found in the wishlist", status: 404 },
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    console.error("Error in fetch movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
