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


// export async function POST(req: Request) {
//   try {
//     const response = await req.json();

//     console.log("response", response);

//     const { name, description, category, price, image_link } = response;

//     if (!name || !description || !image_link) {
//       throw new Error("Name, description, and photo URL are required");
//     }

//     const generatedId = Date.now();

//     const { error } = await supabase.from("products").insert([
//       {
//         id: generatedId,
//         image_link,
//         name,
//         description,
//         price,
//         category,
//       },
//     ]);

//     if (error) {
//       throw new Error(error.message);
//     }

//     const { data: updatedProducts, error: fetchError } = await supabase
//       .from("products")
//       .select("*");

//     if (fetchError) {
//       throw new Error(fetchError.message);
//     }

//     return NextResponse.json({
//       message: "Product created successfully!",
//       products: updatedProducts,
//     });
//   } catch (error) {
//     console.error("Error creating product or price:", error);
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
