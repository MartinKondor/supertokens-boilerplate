import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import verifyPhoneTemplate from "./verifyPhoneTemplate";

type POSTRequestType = NextRequest & {
    body: {
        email: string
    }
};

/**
 * @swagger
 * /api/auth/verify-phone:
 *   post:
 *     description: Send a verification SMS to the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification SMS sent successfully
 */
export async function POST(request: POSTRequestType) {
    try {
        
        // Read the body
        const body = await new Response(request.body).json();
        const phone = body.phone;

        // TODO: Implement logic to send a verification SMS to the user

        return NextResponse.json({
            status: 200,
            phone
        });

    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}