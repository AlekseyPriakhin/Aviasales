import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

//API Types

export interface IPagination {
  page: number;
  count: number;
  total: number;
  totalPages: number;
}

export interface IResponse<T> {
  data: T | null;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPagination;
}

//

interface IUsePaginatedQueryParams {
  page: number;
}

const PER_PAGE = 10;

interface ISingleQueryParams<T = unknown> {
  key: string;
  itemId: string | number;
  handler: (id: number) => Promise<IResponse<T>> | IResponse<T>;
}

interface IPaginatedQueryParams<T = unknown, TParams extends object = object> {
  key: string;
  itemId: string | number;
  initParams?: TParams;
  handler: (params?: TParams) => Promise<IListResponse<T>> | IListResponse<T>;
}

export const purifyObject = <T extends object = object>(obj: T): T => {
  const res = Object.fromEntries(Object.entries(obj).filter(([, v]) => (Array.isArray(v) ? v.length : v)));
  return res as T;
};

export const useSingleQuery = <T>({ key, itemId, handler }: ISingleQueryParams<T>) => {
  const queryKey = [key, itemId];

  const query = useQuery({
    queryKey,
    queryFn: () => handler(Number(itemId)),
    select: res => res.data,
    placeholderData: keepPreviousData,
  });

  return { ...query, queryKey };
};

export const usePaginatedQuery = <T, TParams extends IUsePaginatedQueryParams = IUsePaginatedQueryParams>({
  key,
  handler,
  initParams = {} as TParams,
}: IPaginatedQueryParams<T, TParams>) => {
  const [params, setParams] = useState<TParams>(purifyObject(initParams));
  const queryKey = [key, purifyObject(initParams)];

  const query = useQuery({
    queryKey,
    queryFn: () => handler(initParams),
    placeholderData: keepPreviousData,
    select: res => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setIsNothingFound(res.pagination.count === 0);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setPagination({ ...res.pagination });
      return res.data;
    },
  });

  const [isNothingFound, setIsNothingFound] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({ page: 1, total: 0, count: PER_PAGE, totalPages: 0 });

  return { ...query, isNothingFound, queryKey, pagination, params, setParams };
};
