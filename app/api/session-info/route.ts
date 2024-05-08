import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import { withSession } from "supertokens-node/nextjs";

ensureSuperTokensInit();

export function GET(request: NextRequest) {
    return withSession(request, async (err, session) => {
        if (err) {
            return NextResponse.json(err, { status: 500 });
        }
        return NextResponse.json({
            status: "OK",
            sessionHandle: session?.getHandle(),
            accessTokenPayload: session?.getAccessTokenPayload(),
        });
    });
}
