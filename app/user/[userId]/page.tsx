"use client";
import { useEffect, useState } from 'react';
import Header from "@/app/components/Header";
import ReactJson from 'react-json-view';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';

export default function UserView() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = window.location.pathname.split('/')[2];
        const fetchUser = async () => {
            const res = await fetch(`/api/user/by-id/${userId}`);
            const user = await res.json();
            setUser(user);
        };
        fetchUser();
    }, []);

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Header title="User View" />
            <div>
                <ReactJson src={user} theme="monokai" />
            </div>
        </div>
    );
}