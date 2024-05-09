import { NextRequest, NextResponse } from "next/server";

type POSTRequestType = NextRequest & {
    body: {
        token: string
    }
};

/**
 * @swagger
 * /api/auth/verify-phone-token:
 *   get:
 *     description: Verify the sent token
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token verified successfully
 */
export async function GET(request: POSTRequestType) {
    try {
        
        // Read the body
        const body = await new Response(request.body).json();
        const phone = body.phone;
        const token = body.token;

        // Get the token from the database and verify
        // TODO: Database connection
        // TODO: On correct token, redirect to the home page

        return NextResponse.json({
            status: 200,
            phone,
            token
        });

    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}