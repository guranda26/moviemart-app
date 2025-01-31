import { checkSubscriptionStatus } from '@/components/SubscriptionStatus';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    console.log('User ID:', userId); // Log the incoming userId

    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'User ID is required' }),
        { status: 400 }
      );
    }

    const subscriptionStatus = await checkSubscriptionStatus(userId);

    return new Response(
      JSON.stringify({ isSubscribed: subscriptionStatus }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking subscription:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
