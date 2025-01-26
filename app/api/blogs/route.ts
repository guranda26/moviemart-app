import { createClient } from "@/utils/supabase/server";
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
    const { data: blogs, error: blogsError } = await supabase
      .from("blogs")
      .select("*");

    if (blogsError) {
      return NextResponse.json(
        { error: "Blogs are not found", status: 404 },
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("Error in fetch blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
