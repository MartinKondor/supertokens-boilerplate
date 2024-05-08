import { cookies, headers } from "next/headers";
import { TryRefreshComponent } from "./tryRefreshClientComponent";
import styles from "../page.module.css";
import { SignOutIcon } from "../../assets/images";
import { SignOutLink } from "./SignOutLink";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SessionAuthForNextJS } from "./sessionAuthForNextJS";
import { getSSRSession } from "supertokens-node/nextjs";
import { SessionContainer } from "supertokens-node/recipe/session";
import { ensureSuperTokensInit } from "@/app/config/backend";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faBookOpen,
    faFile,
    faSignOut
} from '@fortawesome/free-solid-svg-icons';

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

    const currentUserId = session.getUserId();
    const links = [
        {link: `/user/${currentUserId}`, name: "My Profile", icon: faUser},
        {link: "/api-doc", name: "API Docs", icon: faBookOpen},
        {link: "/session-info", name: "Session Info", icon: faFile},
        {link: "/api/auth/sign-out", name: "Sign Out", icon: faSignOut},
    ];

    return (
        <SessionAuthForNextJS>
            <div className={styles.homeContainer}>
                <div>
                    {links.map(link =>
                        link.name !== "Sign Out" ?
                        <Link href={link.link} className={styles.linksContainerLinkCust} key={link.name}>
                            <FontAwesomeIcon icon={link.icon} />
                            <div style={{marginLeft: 5}} role={"button"}>{link.name}</div>
                        </Link>
                        :
                        <SignOutLink name={link.name} link={link.link} icon={SignOutIcon} key={link.name} />
                    )}
                </div>
            </div>  
        </SessionAuthForNextJS>
    );

}
