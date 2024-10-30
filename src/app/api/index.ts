import { NextRequest } from 'next/server';

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
