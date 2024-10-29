import { withDbClient } from '@/server/repository';

import type { User } from '@prisma/client';
import type { IUser } from '@/types/user';

const mapUser = (user: User): IUser => ({
  id: user.id,
  name: user.name as string,
  secondName: user.secondName as string,
  phoneNumber: user.phoneNumber as string,
  email: user.email as string,
});

export const getUser = (id: string) =>
  withDbClient<IUser | null>(async client => {
    const user = await client.user.findUnique({ where: { id } });
    if (!user) return null;

    return mapUser(user);
  });
