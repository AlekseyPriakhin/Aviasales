'use client';
import { useMe } from '@/queries/me';

import type { INodeProps } from '@/types';
const AuthorizationProvider = ({ children }: INodeProps) => {
  useMe();
  return children;
};

export default AuthorizationProvider;
