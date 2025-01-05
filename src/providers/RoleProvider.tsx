'use client';
import { useMe } from '@/queries/me';
import { INodeProps } from '@/types';
import type { Role } from '@/types/user';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface IProps extends INodeProps {
  allowed: Role | Role[];
}

const isAllowed = (userRole: Role, allowed: Role | Role[]) => {
  if (Array.isArray(allowed)) return allowed.includes(userRole);
  else return userRole === allowed;
};

const RoleProvider = ({ allowed, children }: IProps) => {
  const { me } = useMe();

  useEffect(() => {
    if (me && !isAllowed(me.role, allowed)) return redirect('/');
  }, [me, allowed]);

  return <>{children}</>;
};

export default RoleProvider;
