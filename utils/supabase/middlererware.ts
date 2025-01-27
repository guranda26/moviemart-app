import { type NextRequest, NextResponse } from "next/server";
import { protectRoute } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // const normalizedPathname = pathname.replace(/^\/(ka|en)(?=\/|$)/, "");
  // console.log("Normalized Pathname:", normalizedPathname);

  // if (pathname.startsWith("/api/")) {
  //   return NextResponse.next();
  // }

  const { redirect } = await protectRoute(pathname);

  if (redirect) {
    if (pathname === redirect) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$|app/auth/callback/api/route.ts|api/).*)",
  ],
};
