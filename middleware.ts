import {NextRequest, NextResponse} from "next/server";
import {auth0, ROLES_CLAIM} from "./lib/auth0";

export async function middleware(request: NextRequest) {

    const res: NextResponse = await auth0.middleware(request);
    const session = await auth0.getSession(request);
    if (request.nextUrl.pathname.startsWith("/auth")) {

        // console.log("--- session: ----", session)
        // if (request.nextUrl.pathname.startsWith("/auth/callback")) {
        //     if (session) {
        //         console.log("--- auth/callback: called with session ----",)
        //         const existing = await UserModel.findOne({ extId: session?.user.sub })
        //         if (!existing) {
        //             // save user details
        //             UserModel.create({ extId: session?.user.sub, name: session?.user.name, email: session?.user.email}).catch(console.error);
        //         }
        //     }
        //
        // }
        return res;
    }


    if (request.nextUrl.pathname.startsWith("/student")) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/auth/login?returnTo=/student/chat", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/auth/login?returnTo=/admin/chat", request.url));
        }

        const roles = (session.user[ROLES_CLAIM] as string[]) || [];
        console.log("customLog -> roles:", roles);
        // Logged in but not admin → forbidden
        if (!roles.includes("admin")) {
            return NextResponse.redirect(new URL("/403?page=admin", request.url));
        }
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