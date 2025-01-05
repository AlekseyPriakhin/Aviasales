'use client';
import { useMe } from '@/queries/me';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

import type { INodeProps } from '@/types';

const authorizableRoutes = ['/tickets'];

const AuthorizationProvider = ({ children }: INodeProps) => {
  useMe();
  const { status } = useSession();

  const pathname = usePathname();

  useLayoutEffect(() => {
    if (status === 'unauthenticated' && authorizableRoutes.includes(pathname)) return redirect('/');
  });

  return children;
};

export default AuthorizationProvider;
