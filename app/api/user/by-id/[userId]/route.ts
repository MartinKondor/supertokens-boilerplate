import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import supertokens from "supertokens-node";

ensureSuperTokensInit();

/**
 * @swagger
 * /api/user/by-id/{userId}:
 *   get:
 *     description: Returns the user with the specified userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: bef2f9ae-3a86-432f-9dc9-c409ab3d2e66
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: User returned successfully
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    const tenantId: string = "public";
    const searchObj = { id: params.userId };
    const userInfo = await supertokens.listUsersByAccountInfo(tenantId, searchObj);
    if (!userInfo || userInfo.length === 0) {
        return NextResponse.json({
            status: 204,
            message: `User with ${params.userId} doesn't exist`
        });
    }
    const user = userInfo["0"];
    return NextResponse.json({
        ...user,
        status: 200
    });
}