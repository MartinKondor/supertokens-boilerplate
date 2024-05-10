import { NextRequest, NextResponse } from "next/server";

type POSTRequestType = NextRequest & {
    body: {
        email: string,
        token: string
    }
};

/**
 * @swagger
 * /api/auth/verify-email-token:
 *   post:
 *     description: Verify the sent token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
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
        const email = body.email;
        const token = body.token;

        // TODO: Get & check the token from in the database

        return NextResponse.redirect("/");

    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}