'use client';
import RoleProvider from '@/providers/RoleProvider';
import type { INodeProps } from '@/types';

const AdminLayout = ({ children }: INodeProps) => {
  return <RoleProvider allowed={'admin'}>{children}</RoleProvider>;
};

export default AdminLayout;
