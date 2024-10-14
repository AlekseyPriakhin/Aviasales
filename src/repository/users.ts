import type { IUser } from '@/types/user';
import { getEntities } from '@/data/data';
import { wrapToPromise } from '@/repository';

export const getUsers = () => {
  return wrapToPromise<IUser[]>(
    getEntities('users').map(e => ({
      ...e,
    })),
  );
};

export const getUser = async (id: number) => {
  return wrapToPromise<IUser | null>(getEntities('users').find(e => e.id === id) ?? null);
};
