import createClient from "@/utils/supabase/server";

export const DELETE = async (req: Request) => {
  const supabase = await createClient();

  const { productId } = await req.json();

  const bigIntProductId = BigInt(productId); 

  console.log('productId', productId);
  

  if (!productId) {
    return new Response(JSON.stringify({ error: "Product ID is required" }), {
      status: 400,
    });
  }

  const { data: existingData, error: fetchError } = await supabase
  .from("cart")
  .delete()
  .eq("movie_id", bigIntProductId)
  .single()

console.log("Existing data before delete:", existingData, "Error:", fetchError);

    

    if (fetchError) {
      console.error("Error deleting product from cart:", fetchError.message);
      return new Response(
        JSON.stringify({ error: fetchError.message }), 
        { status: 500 }
      );
    }
    

  return new Response(
    JSON.stringify({ message: "Product deleted successfully", existingData }),
    { status: 200 }
  );
};
