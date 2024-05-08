import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import supertokens from "supertokens-node";

ensureSuperTokensInit();

/**
 * @swagger
 * /api/user/by-email/{email}:
 *   get:
 *     description: Returns the user with the specified email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: martin.kondor+Tests@peakfs.io
 *         description: The email of the user
 *     responses:
 *       200:
 *         description: User returned successfully
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { email: string } }
) {
    const tenantId: string = "public";
    const searchObj = { email: params.email };
    const userInfo = await supertokens.listUsersByAccountInfo(tenantId, searchObj);
    if (!userInfo || userInfo.length === 0) {
        return NextResponse.json({
            status: 204,
            message: `User with ${params.email} doesn't exist`
        });
    }
    const user = userInfo["0"];
    return NextResponse.json({
        ...user,
        status: 200
    });
}