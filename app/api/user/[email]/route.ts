import { ensureSuperTokensInit } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import supertokens from "supertokens-node";

ensureSuperTokensInit();

export async function GET(
    req: NextRequest,
    { params }: { params: { email: string } }
) {
    const tenantId: string = "public";
    const searchObj = { email: params.email };
    const userInfo = await supertokens.listUsersByAccountInfo(tenantId, searchObj);
    if (!userInfo || userInfo.length === 0) {
        return NextResponse.json({ message: "User with 'email' doesn't exist" });
    }
    const user = userInfo["0"];
    return NextResponse.json({
        status: "OK",
        ...user
    });
}