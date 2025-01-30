import createClient from "@/utils/supabase/server";

export const GET = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart")
    .select("*,movies(title, imageSrc, price)");

  if (error) {
    console.error("Error fetching cartData", error);
  }

  return Response.json(data);
};
