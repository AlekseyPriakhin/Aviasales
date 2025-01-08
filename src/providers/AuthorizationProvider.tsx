'use client';
import { useMe } from '@/queries/me';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

import type { INodeProps } from '@/types';
import { AppRoute } from '@/helpers/routing';

const authorizableRoutes: AppRoute[] = ['/tickets', '/admin', '/admin/flights', '/admin/routes'];

const AuthorizationProvider = ({ children }: INodeProps) => {
  useMe();
  const { status } = useSession();

  const pathname = usePathname();

  useLayoutEffect(() => {
    if (status === 'unauthenticated' && authorizableRoutes.includes(pathname as AppRoute)) return redirect('/');
  });

  return children;
};

export default AuthorizationProvider;
