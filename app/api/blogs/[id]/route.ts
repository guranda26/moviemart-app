import { NextRequest } from "next/server";
import createClient from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;

    if (!id) {
      return new Response("Product ID is required", { status: 400 });
    }

    const supabase = await createClient();
    const session = supabase.auth.getSession();

    if (!session) {
      return new Response("User not logged in", { status: 401 });
    }

    const { data: blog, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return new Response("Error fetching product", { status: 500 });
    }

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    console.error("Error in fetch blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
};
