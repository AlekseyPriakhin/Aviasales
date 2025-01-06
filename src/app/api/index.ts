import { NextRequest } from 'next/server';
import { getServerAuthSession } from './auth/[...nextauth]/route';
import { IError } from '@/server/repository';
import { Role } from '@/types/user';
import { findUserBySession } from '@/server/repository/users';

export const PAGE = 1;
export const PER = 10;

export interface IPagination {
  page: number;
  count: number;
  total: number;
  totalPages: number;
}

export interface IParams {
  page?: number;
  per?: number;
}

export interface IResponse<T> {
  data: T | null;
}

export interface IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export const wrapToResponse = <T = unknown>(data: T | T[], pagination?: IPagination) => {
  if (Array.isArray(data) && pagination) {
    return {
      data,
      pagination,
    } as IResponseList<T>;
  }

  return { data } as IResponse<T>;
};

export const extractPaginationData = (req: NextRequest) => ({
  page: Number(req.nextUrl.searchParams.get('page')) || PAGE,
  per: Number(req.nextUrl.searchParams.get('per')) || PER,
});

export const authorize = async (role?: Role): Promise<[{ email: string } | null, IError | null]> => {
  const session = await getServerAuthSession();
  if (!session || !session.user) return [null, { message: 'Not authorized', code: 401 }];

  if (role) {
    const user = await findUserBySession({ email: session.user.email as string });
    if (user?.role !== role) return [null, { message: 'Request forbidden', code: 403 }];
  }

  return [{ email: String(session.user.email) }, null];
};

export const extractBody = async <T = unknown>(request: NextRequest) => {
  const res = (await request.json()) as { params: T };
  return res.params;
};
