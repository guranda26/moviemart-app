import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("q") || "";

    const supabase = await createClient();
    let query = supabase.from("movies").select("*");

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data: movies, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

