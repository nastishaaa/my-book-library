import { NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';

export async function GET() {
    await signOut({ redirect: false });

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
};