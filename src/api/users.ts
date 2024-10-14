import { useCreateSingleQuery } from '@/api';
import { getUser } from '@/repository/users';
import { IUser } from '@/types/user';

export const useUser = (id: number) => {
  const { data, ...query } = useCreateSingleQuery<IUser | null>({
    key: 'user',
    itemId: id,
    handler: getUser,
  });

  return { user: data, ...query };
};
