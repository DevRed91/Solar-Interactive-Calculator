import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'hi', 'mr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const accepted = acceptLanguage
    .split(',')
    ?.map((lang) => lang.split(';')[0].trim());

  for (const lang of accepted) {
    if (locales.includes(lang)) return lang;
    const baseLang = lang.split('-')[0];
    if (locales.includes(baseLang)) return baseLang;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // skip static files like sw.js, manifest.json, icons, etc.
  const PUBLIC_FILE = /\.(.*)$/;
  const isPublic =
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/manifest.json') ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/icon') ||
    PUBLIC_FILE.test(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|images|icons|api).*)'],
};
