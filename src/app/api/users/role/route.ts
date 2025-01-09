import { NextRequest, NextResponse } from 'next/server';
import { getUserRole } from '@/server/repository/users';

const params = (request: NextRequest) => ({
    email: request.nextUrl.searchParams.get('email') || '',
})

export async function GET(request: NextRequest) {
    const role = await getUserRole(params(request).email);

    console.log(role);


    return NextResponse.json({ role });
}