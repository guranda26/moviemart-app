import { stripe } from "@/utils/supabase/lib/stripe";
import createClient, { getUser } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      productId,
      productName,
      productPrice,
      productDescription,
      productImage,
      userId,
    } = await request.json();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }

    if (!productId || !userId || !productName || !productPrice) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: productId, productName, productPrice, userId",
        },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              images: productImage ? [productImage] : [],
              description: productDescription || "No description available",
            },
            unit_amount: Math.round(productPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/success-order?session_id={CHECKOUT_SESSION_ID}&product_name=${encodeURIComponent(
        productName
      )}&product_price=${encodeURIComponent(productPrice)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel-checkout`,
    });

    const supabase = await createClient();
    const { error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId, 
          movie_id: productId,
          movie_name: productName,
          movie_image: productImage,
          movie_price: productPrice,
        },
      ]);

    if (error) {
      console.error("Error saving order to database:", error);
      throw error;
    }

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error processing checkout: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}
