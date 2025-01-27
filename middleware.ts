import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./configs/i18ncofig";
import { type NextRequest, NextResponse } from "next/server";
import { protectRoute } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const normalizedPathname = pathname.replace(/^\/(ka|en)(?=\/|$)/, "");

  const { redirect } = await protectRoute(normalizedPathname);

  if (redirect) {
    // if (pathname === redirect) {
    //   return NextResponse.next();
    // }
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  const i18nResponse = i18nRouter(request, i18nConfig);
  if (i18nResponse) {
    return i18nResponse;
  }

  if (pathname === "/") {
    const defaultLocale = i18nConfig.defaultLocale || "en";
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  const locale = request.nextUrl.locale || i18nConfig.defaultLocale;
  const isMissingLocale =
    !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;

  if (isMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$|app/auth/callback/api/route.ts|api/)(?:ka|en)?.*)",
  ],
};
