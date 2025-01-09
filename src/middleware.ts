import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { AppRoute } from '@/helpers/routing';

const authorizableRoutes: AppRoute[] = ['/tickets', '/admin', '/admin/flights', '/admin/routes'];

const getUserToken = (request: NextRequest) =>
  getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

export async function middleware(request: NextRequest) {
  const token = await getUserToken(request);

  if (authorizableRoutes.includes(request.nextUrl.pathname as any) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
