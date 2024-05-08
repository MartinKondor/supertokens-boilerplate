import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import { getUserByEmail } from "supertokens-node/recipe/emailpassword";

export async function GET(
    request: NextRequest,
    { params }: { params: { email: string } }
) {
    ensureSuperTokensInit();
    console.log(params.email);

    const user = await getUserByEmail(params.email);
    if (!user) {
        return NextResponse.json({ message: "User with 'email' doesn't exist" });
    }

    const res = NextResponse.json({
        message: params.email
    });
    return res;
}