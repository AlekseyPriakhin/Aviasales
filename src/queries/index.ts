import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api } from '@/axios';
import { PAGE } from '@api/index';

import type { IPagination, IParams, IResponse, IResponseList } from '@/app/api';
import type { AxiosResponse } from 'axios';
import type { RecursivePartial } from '@/helpers/utils';
import type { IIdentifiable } from '@/types';

const PER = 12;
//API Types

interface IUsePaginatedQueryParams {
  page?: number;
  per?: number;
}

interface ISingleQueryParams {
  key: string[];
  itemId?: string | number;
  url: string;
  enabled?: boolean;
  initParams?: IParams;
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

export const useCreateSingleQuery = <T>({ key, enabled = true, itemId, url, initParams }: ISingleQueryParams) => {
  const queryKey: any[] = [key, itemId];
  if (initParams) queryKey.push(purifyObject(initParams));

  const query = useQuery({
    queryKey,
    queryFn: () => api.get<IResponse<T>>(itemId ? `${url}/${itemId}` : url, { params: initParams }),
    select: res => res.data.data,
    placeholderData: keepPreviousData,
    enabled,
  });

  return { ...query, queryKey };
};

export const useCreatePaginatedQuery = <T, TParams extends IUsePaginatedQueryParams = IUsePaginatedQueryParams>({
  key,
  handler,
  initParams = { page: PAGE, per: PER } as TParams,
}: IPaginatedQueryParams<T, TParams>) => {
  const [params, setParams] = useState<TParams>(purifyObject({ per: PER, page: PAGE, ...initParams }));
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
  const [params, setParams] = useState(purifyObject({ per: PER, page: PAGE, ...initParams }));
  const queryKey = [key, purifyObject(params)];

  const [isNothingFound, setNothingFound] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPagination>({ page: PAGE, total: 0, count: PER, totalPages: 0 });
  const [isFetchNextPageAvailable, setIsFetchNextPageAvailable] = useState(false);
  const [normalizedData, setNormalizedData] = useState<T[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<IResponseList<T>>(url, { params: { ...purifyObject(params), page: pageParam } });
      return data;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: res => {
      return res.pagination.page < res.pagination.totalPages ? res.pagination.page + 1 : null;
    },
    ...options,
  });

  useEffect(() => {
    if (query.data) {
      setNothingFound(query.data.pages.some(e => e.pagination.total === 0) || false); // TODO почемуто undefined
      setPagination(p => query.data.pages.at(-1)?.pagination ?? p);
      setIsFetchNextPageAvailable(pagination.page < (query.data.pages.at(-1)?.pagination.totalPages ?? 1));
      setNormalizedData(query.data.pages.map(e => e.data).flat() ?? []);
    }
  }, [query.data, pagination.page]);

  const wrappedSetParams = (newParams = {} as Params) => setParams(old => ({ ...old, ...newParams }));

  return {
    queryKey,
    pagination,
    isNothingFound,
    isFetchNextPageAvailable,
    params,
    ...query,
    data: normalizedData,
    setParams: wrappedSetParams,
  };
};

export type OnMutateHandler<Out = unknown, In = unknown> = Pick<
  UseMutationOptions<Out, unknown, In, unknown>,
  'onSuccess' | 'onError' | 'onSettled'
>;

interface IMutationParams<Out = unknown, In = unknown> {
  url: string;
  method: 'post' | 'delete' | 'put';
  options?: OnMutateHandler<AxiosResponse<Out>, In>;
}

export const useCreateMutation = <Out = unknown, In = unknown, Local extends IIdentifiable = IIdentifiable>({
  url,
  method,
  options,
}: IMutationParams<Out, In>) => {
  const handler = (params: In) => api[method]<Out>(url, { params });

  const query = useMutation({
    mutationFn: handler,
    onSuccess: v => v.data,
    ...options,
  });

  const queryClient = useQueryClient();

  const updateItem = (queryKey: any[], newData: Partial<Local> | IResponse<Local>) => {
    queryClient.setQueryData(queryKey, (previous?: IResponse<Local>) => {
      if (previous) return { data: { ...previous?.data, ...newData } };
    });
  };

  const updateInfinityItem = (queryKey: any[], itemId: number | string, newData: RecursivePartial<Local>) => {
    queryClient.setQueriesData({ queryKey }, (previous?: InfiniteData<IResponseList<Local>>) => {
      if (previous) {
        return {
          pageParams: previous.pageParams,
          pages: previous.pages.map(({ data, pagination }) => ({
            data: data.map(d => {
              if (d.id === itemId)
                return {
                  ...d,
                  ...newData,
                };
              return d;
            }),
            pagination,
          })),
        };
      }
    });
  };

  const mutationHandler = ({ params, options }: { params: In; options?: OnMutateHandler<AxiosResponse<Out>, In> }) =>
    query.mutate(params, options);

  return { ...query, queryClient, mutate: mutationHandler, updateItem, updateInfinityItem };
};
