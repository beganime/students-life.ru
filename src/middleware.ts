import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "./i18n-config";

// Only Turkmen and Uzbek browser languages get their own locale.
// Everyone else (Turkey, Europe, USA, Russia, etc.) → ru.
const LANG_MAP: Record<string, Locale> = {
    tk: 'tk', // Turkmen browser → /tk
    uz: 'oz', // Uzbek browser  → /oz
};

function getLocale(request: NextRequest): Locale {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const primaryLang = acceptLanguage
        .split(',')[0]
        .split(';')[0]
        .trim()
        .toLowerCase()
        .split('-')[0];
    return LANG_MAP[primaryLang] ?? 'ru';
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|trusts).*)"],
};
