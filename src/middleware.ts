import type { NextRequest } from "next/server";
import { createClient } from "./prismicio";
import { createLocaleRedirect } from "@prismicio/next";

export async function middleware(request: NextRequest) {
    const client = createClient();

    // Redirect to default locale if the locale is missing
    const redirect = await createLocaleRedirect({ client, request });

    if (redirect) {
        return redirect;
    }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    // Regex fetched from Clerk's own documentation
    // https://clerk.com/docs/references/nextjs/auth-middleware#usage
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
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
