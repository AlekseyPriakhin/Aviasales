import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { AppRoute } from '@/helpers/routing';
import { api, BASE_URL } from './axios';
import { Role } from './types/user';

const authorizableRoutes: AppRoute[] = ['/tickets', '/admin', '/admin/flights', '/admin/routes'];
const adminRoutes: AppRoute[] = ['/admin', '/admin/flights', '/admin/routes'];

const fetchUserRole = async (email: string) => {
    const res = await api.get<{ role: string }>(`${process.env.NEXTAUTH_URL}${BASE_URL}/users/role`, { params: { email } });

    return res?.data.role as Role || null;
};

const getUserToken = (request: NextRequest) =>
    getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

export async function middleware(request: NextRequest) {
    const token = await getUserToken(request);
    const pathName = request.nextUrl.pathname as AppRoute;

    if (authorizableRoutes.includes(pathName) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (adminRoutes.includes(pathName)) {
        const role = await fetchUserRole(token?.email as string);

        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}
