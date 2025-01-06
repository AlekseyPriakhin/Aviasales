import { ISession, withDbClient } from '@/server/repository';

import type { User } from '@prisma/client';
import type { IUser, Role } from '@/types/user';

const mapUser = (user: User): IUser => ({
  id: user.id,
  name: user.name as string,
  secondName: user.secondName as string,
  phoneNumber: user.phoneNumber as string,
  email: user.email as string,
  role: user.role as Role,
});

export const getUser = (id: string) => {
  return withDbClient<IUser | null>(async client => {
    const user = await client.user.findUnique({ where: { id } });
    if (!user) return null;

    return mapUser(user);
  });
};

export const findUserBySession = (session: ISession) => {
  return withDbClient<IUser | null>(async client => {
    const user = await client.user.findFirst({ where: { email: session.email } });
    if (!user) return null;

    return mapUser(user);
  });
};
