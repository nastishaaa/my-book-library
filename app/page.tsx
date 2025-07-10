'use client'

import HomePage from './ui/HomePage';
import HomePageForAuthorizeUser from './ui/HomePageForAuthorizeUser';
import { useSession } from 'next-auth/react';

export default function Home() {
    const session = useSession();

    return (
        <div className="p-6">
            {session?.data ?
                <HomePageForAuthorizeUser /> :
                <HomePage />}
        </div>
    );
}
