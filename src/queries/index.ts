import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api } from '@/axios';
import { PAGE, PER } from '@api/index';

import type { IPagination, IParams, IResponse, IResponseList } from '@/app/api';

//API Types

interface IUsePaginatedQueryParams {
  page: number;
}

interface ISingleQueryParams {
  key: string[];
  itemId: string | number;
  url: string;
}
//

interface IPaginatedQueryParams<T = unknown, TParams extends object = object> {
  key: string;
  itemId: string | number;
  initParams?: TParams;
  handler: (params?: TParams) => Promise<IResponseList<T>> | IResponseList<T>;
}

export const purifyObject = <T extends object = object>(obj: T): T => {
  const res = Object.fromEntries(Object.entries(obj).filter(([, v]) => (Array.isArray(v) ? v.length : v)));
  return res as T;
};

export const useCreateSingleQuery = <T>({ key, itemId, url }: ISingleQueryParams) => {
  const queryKey = [key, itemId];

  const query = useQuery({
    queryKey,
    queryFn: () => api.get<IResponse<T>>(`${url}/${itemId}`),
    select: res => res.data.data,
    placeholderData: keepPreviousData,
  });

  return { ...query, queryKey };
};

export const useCreatePaginatedQuery = <T, TParams extends IUsePaginatedQueryParams = IUsePaginatedQueryParams>({
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
  const [pagination, setPagination] = useState<IPagination>({ page: PAGE, total: 0, count: PER, totalPages: 0 });

  return { ...query, isNothingFound, queryKey, pagination, params, setParams };
};

type InfiniteQueryOptions<T> = UseInfiniteQueryOptions<
  IResponseList<T>,
  unknown,
  InfiniteData<IResponseList<T>>,
  IResponseList<T>,
  QueryKey,
  number
>;

interface IInfiniteParams<T = any, Params extends IParams = IParams> {
  key: string[];
  initParams?: Params;
  options?: Partial<InfiniteQueryOptions<T>>;
  url: string;
}

export const useCreateInfiniteQuery = <T = any, Params extends IParams = IParams>({
  key,
  options,
  url,
  initParams = {} as Params,
}: IInfiniteParams<T, Params>) => {
  const [params, setParams] = useState(purifyObject(initParams));
  const queryKey = [key, purifyObject(params)];

  const [isNothingFound, setNothingFound] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPagination>({ page: PAGE, total: 0, count: PER, totalPages: 0 });
  const [isFetchNextPageAvailable, setIsFetchNextPageAvailable] = useState(false);
  const [normalizedData, setNormalizedData] = useState<T[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<IResponseList<T>>(url, { params: { page: pageParam, ...initParams } });
      return data;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: res => {
      return res.pagination.page < res.pagination.totalPages ? res.pagination.page + 1 : undefined;
    },
    ...options,
  });

  useEffect(() => {
    setNothingFound(query.data?.pages.some(e => e.pagination.total === 0) || false); // TODO почемуто undefined
    setPagination(p => query.data?.pages.at(-1)?.pagination ?? p);
    setIsFetchNextPageAvailable(pagination.page < (query.data?.pages.at(-1)?.pagination.totalPages ?? 1));
    setNormalizedData(query.data?.pages.map(e => e.data).flat() ?? []);
  }, [query.data, pagination.page]);

  return {
    queryKey,
    pagination,
    isNothingFound,
    isFetchNextPageAvailable,
    ...query,
    data: normalizedData,
    setParams,
  };
};
