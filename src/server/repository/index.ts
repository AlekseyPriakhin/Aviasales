import type { IPagination } from '@/app/api';
import { Prisma } from '@prisma/client';

export const filter = <T = unknown>(data: T[], cb: (item: T) => boolean) => {
  return data.map(cb);
};

const PAGE = 1;
const PER = 10;

export interface IParams {
  page?: number;
  per?: number;
}

export const paginate = <T = unknown>(data: T[], page: number, total: number, per = 10): [T[], IPagination] => {
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

export const paginateV2 = async <T = unknown, U = unknown>(
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
