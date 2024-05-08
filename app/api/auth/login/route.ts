import { NextRequest, NextResponse } from "next/server";
import { ensureSuperTokensInit } from "../../../config/backend";
import EmailPassword from "supertokens-node/recipe/emailpassword";

ensureSuperTokensInit();

type LoginRequestType = {
    email: string;
    password: string;
    tenantId: string | undefined | null;
};

export async function POST(req: NextRequest) {
    try {
        
        // Read the data from the ReadableStream and convert it to JSON
        const body = await new Response(req.body).json();
        let { email, password, tenantId }: LoginRequestType = body;

        if (typeof email !== "string" || typeof password !== "string") {
            throw new Error("Invalid 'email' or 'password' field");
        }

        if (typeof tenantId !== "string") {
            tenantId = "public";
        }

        const result = await EmailPassword.signIn(tenantId, email, password);
        return NextResponse.json({ ...result });
    } catch (error: Error) {
        return NextResponse.json({ error: error.message });
    }
}