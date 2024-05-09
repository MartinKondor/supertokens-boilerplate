import { NextRequest, NextResponse } from "next/server";

type POSTRequestType = NextRequest & {
    body: {
        phone: string,
        token: string
    }
};

/**
 * @swagger
 * /api/auth/verify-phone-token:
 *   post:
 *     description: Verify the sent token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token verified successfully
 */
export async function POST(request: POSTRequestType) {
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