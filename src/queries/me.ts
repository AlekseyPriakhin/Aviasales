import { useCreateSingleQuery } from '@/queries';
import { useSession } from 'next-auth/react';
import queryKeys from '@/queries/keys';

import type { IUser } from '@/types/user';

const URL = '/me';

export const useMe = () => {
  const { status } = useSession();

  const { data, ...query } = useCreateSingleQuery<IUser>({
    key: queryKeys.me(),
    url: URL,
    enabled: status === 'authenticated',
  });

  return { me: data, ...query };
};
