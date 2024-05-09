import { NextRequest } from "next/server";
import chalk from "chalk";

export default function log(request: NextRequest, msg: string | undefined = undefined) {
    const msg1 = `[${chalk.cyanBright(new Date().toISOString())}] ${chalk.green(request.method)}`;
    const msg2 = `${chalk.bgMagenta(request.nextUrl.pathname)} ${msg ? msg : ""}`;
    console.log(`${msg1} ${msg2}`);
}
