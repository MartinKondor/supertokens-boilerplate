import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import { getUserByEmail } from "@/lib/user";

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
    try {
        const user = await getUserByEmail(params.email);
        return NextResponse.json({
            ...user,
            status: 200
        });
    }
    catch (error: Error) {
        return NextResponse.json({
            status: 204,
            message: `User with ${params.email} doesn't exist`
        });
    }
}