import { useSingleQuery } from '@/api';
import { getUser } from '@/api/repository/users';
import { IUser } from '@/types/user';

export const useUser = (id: number) => {
  const { data, ...query } = useSingleQuery<IUser | null>({
    key: 'user',
    itemId: id,
    handler: getUser,
  });

  return { user: data, ...query };
};
