import { checkSubscriptionStatus } from "@/components/SubscriptionStatus";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PremiumPage() {
  const supabaseClient = await createClient();
  const { data: user } = await supabaseClient.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const isPremium = await checkSubscriptionStatus(user?.user.id);

  if (!isPremium) {
    redirect("/movies");
  }

  return (
    <div>
      <h1>Welcome to Premium Content!</h1>
      {/* Your premium content here */}
    </div>
  );
}