import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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

export interface IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPaginationParams {
  page?: number;
  per?: number;
}

export type IParams = IPaginationParams & {};
//

const PER_PAGE = 10;
interface IUsePaginatedQueryParams {
  page: number;
}

interface ISingleQueryParams<T = unknown> {
  key: string;
  itemId: string | number;
  handler: (id: number) => Promise<IResponse<T>> | IResponse<T>;
}

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

export const useCreateSingleQuery = <T>({ key, itemId, handler }: ISingleQueryParams<T>) => {
  const queryKey = [key, itemId];

  const query = useQuery({
    queryKey,
    queryFn: () => handler(Number(itemId)),
    select: res => res.data,
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
  const [pagination, setPagination] = useState<IPagination>({ page: 1, total: 0, count: PER_PAGE, totalPages: 0 });

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
  handler: (params?: Params) => Promise<IResponseList<T>> | IResponseList<T>;
}

export const useCreateInfiniteQuery = <T = any, Params extends IParams = IParams>({
  key,
  options,
  handler,
  initParams = {} as Params,
}: IInfiniteParams<T, Params>) => {
  const [params, setParams] = useState(purifyObject(initParams));
  const queryKey = [key, purifyObject(params)];

  const [isNothingFound, setNothingFound] = useState<boolean>();
  const [pagination, setPagination] = useState<IPagination>({ page: 1, total: 0, count: PER_PAGE, totalPages: 0 });
  const [isFetchNextPageAvailable, setIsFetchNextPageAvailable] = useState(false);
  const [normalizedData, setNormalizedData] = useState<T[]>();

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => handler({ page: pageParam, ...params }),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: ({ pagination }) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      // setPagination(pagination);
      return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined;
    },
    ...options,
  });

  useEffect(() => {
    setNothingFound(query.data?.pages.some(e => e.pagination.total === 0));
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
