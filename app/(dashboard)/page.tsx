import { signOutAction } from "@/actions";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const page = async () => {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return <h1>Redirect here</h1>;
};

export default page;
