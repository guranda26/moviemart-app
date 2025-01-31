// const { data, error } = await supabase
//   .from('characters')
//   .select('id', 'name')
//   .order('id', { ascending: false })

import createClient from "@/utils/supabase/server";

export const GET = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart")
    .select("movie_id")
    .order("movie_id", {ascending: false})

  if (error) {
    console.error("Error fetching cartData", error);
  }

  return Response.json(data);
};
