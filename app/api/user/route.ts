import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from '../../../lib/auth'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ user: session.user }, { status: 200 });
}
