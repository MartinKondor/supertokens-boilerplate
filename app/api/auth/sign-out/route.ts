import { NextRequest, NextResponse } from "next/server";
import { ensureSuperTokensInit } from "../../../config/backend";
import { withSession } from "supertokens-node/nextjs";

ensureSuperTokensInit();

/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     description: Logs out a user and invalidates the session
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
export async function POST(request: NextRequest) {
    return withSession(request, async (err: Error | null, session) => {
        if (err) {
            return NextResponse.json({
                status: 500,
                message: err
            });
        }
        await session.revokeSession();
        return NextResponse.json({
            status: 200,
        });
    });
}