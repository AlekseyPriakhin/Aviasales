import { Prisma, PrismaClient, User } from '@prisma/client';
import { PAGE, PER } from '@api/index';
import type { IPagination } from '@api/index';

export type ISession = {
  email: string;
};

export interface IError {
  message: string;
  code?: number;
}

export type TError = IError | IError[] | null;

export const getUserBySession = async (client: PrismaClient, session: ISession): Promise<[User | null, TError]> => {
  const user = await client.user.findFirst({ where: { email: session.email } });
  if (user === null) return [null, { message: 'User not found', code: 404 }];

  return [user, null];
};

export const filterByUser = (data: ISession): Prisma.UserWhereInput => {
  return { email: data.email };
};

export const paginate = async <T = unknown, U = unknown>(
  {
    query,
    mapper,
  }: {
    query: () => Prisma.PrismaPromise<T[]>;
    mapper: (item: T) => U;
  },
  totalQuery: () => Prisma.PrismaPromise<number>,
  page = PAGE,
  per = PER,
): Promise<[U[], IPagination]> => {
  const data = (await query()).map(mapper);

  const total = await totalQuery();

  return [
    data,
    {
      page,
      total,
      totalPages: Math.ceil(total / per),
      count: data.length,
    },
  ];
};

export const createPaginationParams = (page = PAGE, per = PER) => ({ skip: per * (page - 1), take: per });

export const withDbClient = async <T = unknown>(cb: (client: PrismaClient) => Promise<T>) => {
  const client = new PrismaClient();
  return cb(client)
    .catch(e => {
      // eslint-disable-next-line no-console
      console.debug(e);
      throw e;
    })
    .finally(() => client.$disconnect());
};
