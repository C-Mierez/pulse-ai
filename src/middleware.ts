import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./prismicio";

export async function middleware(request: NextRequest) {
    const client = createClient();
    const repository = await client.getRepository();

    // Get the locales from the repository
    const locales = repository.languages.map((lang) => lang.id);
    const defaultLocale = locales[0];

    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    const pathnameIsMissingLocale = locales.every((locale) => {
        // Check if the pathname is missing the locale
        return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
    });

    // Redirect to default locale if there is no supported locale prefix
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname}`, request.url),
        );
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - icon.png
         */
        "/((?!api|_next/static|_next/image|icon.png|sitemap.xml).*)",
    ],
};

// const repository = await client.getRepository();

// // Get the locales from the repository
// const localeIds = repository.languages.map((lang) => lang.id);
// const defaultLocale = localeIds[0];

// // Check the current locale in the pathname
// const { pathname } = request.nextUrl;
// const pathnameIsMissingLocale = localeIds.every((locale) => {
//     // Check if the pathname is missing the locale
//     return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
// });

// // Rewrite the URL to include the default locale if it's missing
// if (pathnameIsMissingLocale) {
//     return NextResponse.rewrite(
//         new URL(`/${defaultLocale}${pathname}`, request.url),
//     );
// }

// // Check whether the locale in the referrer has changed from the nextUrl
// const referer = request.headers.get("referer");
// if (referer) {
//     // Remove origin from url
//     const refererUrl = new URL(referer);
//     const refererPath = refererUrl.pathname;
//     console.log(refererPath);
//     const refererPathLocale = refererPath.split("/")[1];
//     console.log(refererPathLocale);
//     const nextUrlLocale = request.nextUrl.pathname.split("/")[1];
//     console.log(nextUrlLocale);

//     if (refererPathLocale !== nextUrlLocale) {
//         // Redirect to the same referer page in the new locale instead
//         console.log(
//             "new url",
//             new URL(
//                 `/${nextUrlLocale}/${refererPath.split("/").slice(2).join("/")}`,
//                 request.url,
//             ).href,
//         );
//         return NextResponse.rewrite(
//             new URL(
//                 `/${nextUrlLocale}/${refererPath.split("/").slice(2).join("/")}`,
//                 request.url,
//             ),
//         );
//     }
// }
