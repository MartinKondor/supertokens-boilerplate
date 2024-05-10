import { NextRequest, NextResponse } from "next/server";
import { ensureSuperTokensInit } from "../../../config/backend";
import EmailPassword from "supertokens-node/recipe/emailpassword";

ensureSuperTokensInit();

type SignupRequestType = {
    email: string;
    password: string;
    tenantId?: string;
};

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     description: Create a user with supertokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "martin.kondor+Tests@peakfs.io"
 *               password:
 *                 type: string
 *                 example: "Aasd1234"
 *               tenantId:
 *                 type: string
 *                 nullable: true
 *                 example: "public"
 *     responses:
 *       200:
 *         description: User created successfully
 */
export async function POST(req: NextRequest) {
    try {
        
        // Read the data from the ReadableStream and convert it to JSON
        const body = await new Response(req.body).json();
        let { email, password, tenantId }: SignupRequestType = body;

        if (typeof email !== "string" || typeof password !== "string") {
            throw new Error("Invalid 'email' or 'password' field");
        }

        if (typeof tenantId !== "string") {
            tenantId = "public";
        }

        const result = await EmailPassword.signUp(tenantId, email, password);
        return NextResponse.json({ ...result, status: 200 });
    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}