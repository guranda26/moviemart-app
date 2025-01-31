import { redirect } from "next/navigation";
import WishlistForm from "@/components/WishlistForm";
import  { getUser } from "@/utils/supabase/server";

export default async function WishlistPage() {

    const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <WishlistForm userId={user.id} />;
}