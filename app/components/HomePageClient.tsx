"use client";
import Link from "next/link";
import { ensureSuperTokensInit } from "@/app/config/backend";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import {
    faUser, faBookOpen, faFile,
    faSignOut, faEnvelope, faPhone
} from '@fortawesome/free-solid-svg-icons';

import styles from "../page.module.css";
import { SignOutIcon } from "../../assets/images";
import { SignOutLink } from "./SignOutLink";
import { LoadingSpinner } from "./LoadingSpinner";


config.autoAddCss = false;
ensureSuperTokensInit();
type PropsType = {
    currentUserId: string;
};  

export function HomePageClient({ currentUserId }: PropsType) {
    let [isLoading, setIsLoading] = useState(false);

    const links = [
        {link: `/user/${currentUserId}`, name: "My Profile", icon: faUser},
        {link: "/api-doc", name: "API Docs", icon: faBookOpen},
        {link: "/session-info", name: "Session Info", icon: faFile},
        {link: "/api/auth/sign-out", name: "Sign Out", icon: faSignOut},
    ];

    if (process.env.NODE_ENV === "development") {
        links.push({link: "/api/auth/verify-email", name: "Verify Email", icon: faEnvelope});
        links.push({link: "/api/auth/verify-phone", name: "Verify Phone", icon: faPhone});
    }

    return (
        <div>
            <div>
                <h1>Home Page</h1>  
            </div>
            {isLoading ? <LoadingSpinner /> : (
                <div>
                    {links.map(link =>
                        link.name !== "Sign Out" ?
                        <Link href={link.link} className={styles.linksContainerLink} key={link.name} onClick={() => setIsLoading(true)}>
                            <FontAwesomeIcon icon={link.icon} />
                            <div className={styles.linkName} role={"button"}>{link.name}</div>
                        </Link>
                        :
                        <SignOutLink name={link.name} link={link.link} icon={SignOutIcon} key={link.name} onClick={() => setIsLoading(true)} />
                    )}
                </div>  
            )}
        </div>
    );

}
