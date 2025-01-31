import createClient from "@/utils/supabase/server";

export const DELETE = async (req: Request) => {
  const supabase = await createClient();

  const { movieId } = await req.json();

  const bigIntmovieId = BigInt(movieId); 


  console.log('movieId', bigIntmovieId);

  if (!movieId) {
    return new Response(JSON.stringify({ error: "Movie ID is required" }), {
      status: 400,
    });
  }


  const {data: moviesData, error: fetchError} = await supabase
  .from("wishlist")
  .delete()
  .eq("id", movieId)

  
if(fetchError) {
  console.error("Error deleting movie from wishlist:", fetchError.message);
  return new Response(
    JSON.stringify({ error: fetchError.message }), 
    { status: 500 }
  );
}


return new Response(
  JSON.stringify({ message: "Movie deleted successfully", moviesData }),
  {status: 200}
)

}