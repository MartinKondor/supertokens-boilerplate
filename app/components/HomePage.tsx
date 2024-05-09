import { cookies, headers } from "next/headers";
import { TryRefreshComponent } from "./tryRefreshClientComponent";
import { redirect } from "next/navigation";
import { SessionAuthForNextJS } from "./sessionAuthForNextJS";
import { getSSRSession } from "supertokens-node/nextjs";
import { SessionContainer } from "supertokens-node/recipe/session";
import { ensureSuperTokensInit } from "@/app/config/backend";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { HomePageClient } from "./HomePageClient";

config.autoAddCss = false;
ensureSuperTokensInit();

async function getSSRSessionHelper(): Promise<{
    session: SessionContainer | undefined;
    hasToken: boolean;
    hasInvalidClaims: boolean;
    error: Error | undefined;
}> {
    let session: SessionContainer | undefined;
    let hasToken = false;
    let hasInvalidClaims = false;
    let error: Error | undefined = undefined;

    try {
        ({ session, hasToken, hasInvalidClaims } = await getSSRSession(cookies().getAll(), headers()));
    } catch (err: any) {
        error = err;
    }
    return { session, hasToken, hasInvalidClaims, error };
}

export async function HomePage() {
    const { session, hasToken, hasInvalidClaims, error } = await getSSRSessionHelper();

    if (error) {
        return <div>Something went wrong while trying to get the session. Error - {error.message}</div>;
    }

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return redirect("/auth");
        }

        if (hasInvalidClaims) {
            return <SessionAuthForNextJS />;
        } else {
            // To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
            return <TryRefreshComponent key={Date.now()} />;
        }
    }

    return (
        <SessionAuthForNextJS>
            <HomePageClient currentUserId={session.getUserId()} />
        </SessionAuthForNextJS>
    );

}
