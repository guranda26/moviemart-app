import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./configs/i18ncofig";
import { type NextRequest, NextResponse } from "next/server";
import { protectRoute } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const normalizedPathname = pathname.replace(/^\/(ka|en)(?=\/|$)/, "");

  console.log("Normalized Pathname:", normalizedPathname);

  const { redirect } = await protectRoute(normalizedPathname);

  if (redirect) {
    if (pathname === redirect) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  const i18nResponse = i18nRouter(request, i18nConfig);
  if (i18nResponse) {
    return i18nResponse;
  }

  // If the user accesses the root '/', redirect to the default locale
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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$|app/auth/callback/route.ts)(?:ka|en)?.*)",
  ],
};
