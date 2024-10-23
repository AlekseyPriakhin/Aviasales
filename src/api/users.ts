import { useCreateSingleQuery } from '@/api';
import { getUser } from '@/server/repository/users';
import { IUser } from '@/types/user';

// export const useInfiniteUsers = () => {
//   const { data, ...query } = useCreateInfiniteQuery<IUser>({
//     key: ['users'],
//     handler: getUsers,
//     initParams: {
//       page: 1,
//     },
//   });

//   return { users: data, ...query };
// };

export const useUser = (id: number) => {
  const { data, ...query } = useCreateSingleQuery<IUser | null>({
    key: ['user'],
    itemId: id,
    handler: getUser,
  });

  return { user: data, ...query };
};
