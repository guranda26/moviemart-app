import { stripe } from "@/utils/supabase/lib/stripe";
import createClient from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lineItems, metadata } = await req.json();

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        {
          error: "Invalid or empty line items provided",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user?.id) {
        return NextResponse.json(
          { error: "User not authenticated." },
          { status: 401 }
        );
      }


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.SITE_URL}/success-order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/cancel-checkout?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        userId: data.user.id,
        products: JSON.stringify(metadata.map((item: {productId: number, userId: string}) => ({
          productId: item.productId,
          userId: item.userId,
        }))),      
      },
    });

    const {error: clearCartErr} = await supabase
      .from("cart")
      .delete()
      .eq("user_id", data.user.id)

    if (clearCartErr) {
      console.error("Error clearing the cart:", clearCartErr);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(`Error in POST ${process.env.NEXT_PUBLIC_BASE_URL}/api/cart-checkout`, error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
