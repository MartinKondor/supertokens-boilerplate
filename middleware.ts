import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionContainer } from "supertokens-node/recipe/session";
import { withSession } from "supertokens-node/nextjs";
import { ensureSuperTokensInit } from "./app/config/backend";
import chalk from "chalk";

ensureSuperTokensInit();
type RequestType = NextRequest & { session?: SessionContainer };

export async function middleware(request: RequestType) {
    if (process.env.NODE_ENV.toLowerCase().startsWith("dev")) {
        // console.log(chalk.cyanBright(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`));
        return NextResponse.next();
    }
    else {
        if (request.headers.has("x-user-id")) {
            console.warn(
                "The FE tried to pass x-user-id, which is only supposed to be a backend internal header. Ignoring."
            );
            request.headers.delete("x-user-id");
        }
    
        if (request.nextUrl.pathname.startsWith("/api/auth")) {
            // this hits our pages/api/auth/* endpoints
            return NextResponse.next();
        }
    
        return withSession(request, async (err, session) => {
            if (err) {
                return NextResponse.json(err, { status: 500 });
            }
            if (session === undefined) {
                return NextResponse.next();
            }
            return NextResponse.next({
                headers: {
                    "x-user-id": session.getUserId(),
                },
            });
        });
    }
}

export const config = {
    matcher: "/api/:path*",
};