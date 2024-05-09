import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import log from "@/lib/logger";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
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
        let verificationCode = null;

        // Send the SMS
        client.verify.v2.services(process.env.TWILIO_SERVICE_SID as string)
            .verifications
            .create({to: phone, channel: 'sms'})
            .then(verification => {
                log(request, verification.sid);
                verificationCode = verification.sid;
            });

        return NextResponse.json({
            status: 200,
            phone,
            verificationCode
        });

    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}