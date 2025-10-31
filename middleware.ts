import {NextRequest, NextResponse} from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
    console.log("customLog","middleware called ....")

    const res: NextResponse = await auth0.middleware(request);
    if (res && res !== NextResponse.next()) {
        // Auth0 handled the request (e.g., redirected to auth/login)
        console.log("customLog","should redirect ....")
        const redirectUrl = res.headers.get("Location");
        console.log("customLog", "Auth0 redirecting to:", redirectUrl);
        return res;
    }

    const session = await auth0.getSession(request);
    console.log("customLog","session", session);
    if (!session?.user) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
    ],
};