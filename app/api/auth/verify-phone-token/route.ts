import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import log from "@/lib/logger";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
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

        // Send the token to Twilio to verify
        return client.verify.v2.services(process.env.TWILIO_SERVICE_SID as string)
            .verificationChecks
            .create({to: phone, code: token})
            .then(verification_check => {
                log(request, verification_check.status);
                if (verification_check.status == "approved") {
                    return NextResponse.json({
                        status: 200,
                        phone,
                        token
                    });
                }
                else {
                    return NextResponse.json({
                        status: 406,
                        phone,
                        token
                    });
                }
            });
    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}