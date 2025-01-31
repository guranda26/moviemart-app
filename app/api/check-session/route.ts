import { stripe } from "@/utils/supabase/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
interface Product {
  movie_id: number | null; 
  name: string | null;      
  quantity: number | null; 
  price: number;            
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status === "paid") {
      const productDetails = session.line_items?.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100,
      })) || [];

      const productWithMovieIds = await Promise.all(
        productDetails.map(async (product): Promise<Product | null> => {
          const supabase = await createClient();
          const { data: movie, error } = await supabase
            .from("movies")
            .select("id")
            .eq("title", product.name)
            .single();

            if (error || !movie) {
              console.error("Error fetching movie_id:", error);
              return null;
            }
          return {
            ...product,
            movie_id: movie?.id, 
          };
        })
      );

      const validProducts = productWithMovieIds.filter(Boolean);
      console.log('validProducts', validProducts);
      

      const supabase = await createClient();
      const { error } = await supabase.from("orders").insert(
        validProducts.map((product) => ({
          session_id: sessionId,
          user_email: session.customer_email,
          movie_id: product?.movie_id,  
          movie_name: product?.name,    
          quantity: product?.quantity,
          user_id: session?.metadata?.userId,
        }))
      );

      if (error) {
        console.error("Error saving orders:", error);
        return NextResponse.json(
          { error: error.message || "An unknown error occurred." },
          { status: 500 }
        );
      }

      return NextResponse.json({ session, productDetails: validProducts });
    }

    return NextResponse.json({ session });
  } catch (error: unknown) {
    console.error("Error in POST /api/check-session:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An unknown error occurred." },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
