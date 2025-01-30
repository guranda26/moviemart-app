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
    } = await request.json();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }


    const supabase = await createClient();
    const { error } = await supabase
      .from("orders")
      .insert({
        movie_id: productId,
        user_id: user.id,
        title: productName,
        price: productPrice,
        description: productDescription,
        images: productImage,
      })
      .single();

    if (error) {
      throw new Error(`Error inserting order: ${error.message}`);
    }

    if (!productId || !productName || !productPrice) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: productId, productName, productPrice",
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
