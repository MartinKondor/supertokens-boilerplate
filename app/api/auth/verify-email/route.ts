import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import verifyEmailTemplate from "./verifyEmailTemplate";

type POSTRequestType = NextRequest & {
    body: {
        email: string
    }
};

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     description: Send a verification email to the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "martin.kondor@peakfs.io"
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 */
export async function POST(request: POSTRequestType) {
    try {
        
        // Read the body
        const body = await new Response(request.body).json();
        const resend = new Resend(process.env.RESEND_API_KEY);
        const email = body.email;

        const token = crypto.randomBytes(8).toString('hex');
        const sendEmailInfo = {
            from: 'SuperTokens Template <onboarding@resend.dev>',
            to: [email],
            subject: 'Verify your email address',
            html: verifyEmailTemplate(email, token)
        };

        // Save the token in the database
        // TODO: Save token into the database

        await resend.emails.send(sendEmailInfo);

        return NextResponse.json({
            status: 200,
            sendEmailInfo
        });

    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}