import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import { withSession } from "supertokens-node/nextjs";

ensureSuperTokensInit();

/**
 * @swagger
 * /api/session-info:
 *   get:
 *     description: Returns session information
 *     responses:
 *       200:
 *         description: Session information retrieved successfully
 */
export function GET(request: NextRequest) {
    return withSession(request, async (err, session) => {
        if (err) {
            return NextResponse.json({
                status: 500,
                message: err
            });
        }
        return NextResponse.json({
            status: 200,
            sessionHandle: session?.getHandle(),
            accessTokenPayload: session?.getAccessTokenPayload(),
        });
    });
}
