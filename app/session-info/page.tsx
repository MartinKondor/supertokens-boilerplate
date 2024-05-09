"use client";
import { useEffect, useState } from 'react';
import Header from "@/app/components/Header";
import ReactJson from 'react-json-view';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';

export default function UserView() {
    const [sessionInfo, setSessionInfo] = useState(null);

    useEffect(() => {
        const fetchSessionInfo = async () => {
            const res = await fetch(`/api/session-info`);
            const sessionInfo = await res.json();
            setSessionInfo(sessionInfo);
        };
        fetchSessionInfo();
    }, []);

    if (!sessionInfo) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Header title="Session Info" />
            <div>
                <ReactJson src={sessionInfo} theme="monokai" />
            </div>
        </div>
    );
}