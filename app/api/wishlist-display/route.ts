import createClient from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();

    const supabase = await createClient();
    const { data: movies, error: moviesError } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", user?.id);

      if (moviesError) {
        console.error("Supabase error:", moviesError);
        return new NextResponse(
          JSON.stringify({ error: "Movies are not found in the wishlist", status: 404 }),
          {
            status: 404,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        );
      }

    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Error in fetch movies:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", status: 500 }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
