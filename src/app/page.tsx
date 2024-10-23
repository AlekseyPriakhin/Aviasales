'use client';
import PageContent from '@/components/PageContent/PageContent';

import { useSession } from 'next-auth/react';

const Page = () => {
  const { status } = useSession();
  return <PageContent background="secondary">{status}</PageContent>;
};

export default Page;
