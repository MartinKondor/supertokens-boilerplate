import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";

ensureSuperTokensInit();

export async function GET(
    request: NextRequest,
    { params }: { params: { email: string } }
) {
    if (!await doesEmailExist(params.email)) {
        return NextResponse.json({ message: "User with 'email' doesn't exist" });
    }

    const res = NextResponse.json({
        message: params.email
    });
    return res;
}
