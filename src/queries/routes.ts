import { IRouteCreateParams, IRouteParams } from '@/app/api/routes/route';
import { useCreateMutation, useCreatePaginatedQuery, useCreateSingleQuery } from '@/queries';
import queryKeys from '@/queries/keys';
import { ID } from '@/types';
import { IRoute } from '@/types/route';
import { useState } from 'react';

const URL = '/routes';

interface ISearchParams {
  query?: string;
}

export const MIN_SEARCH_LENGTH = 3;

export const usePaginatedRoutes = (params?: IRouteParams) => {
  const { data, ...query } = useCreatePaginatedQuery<IRoute, IRouteParams>({
    key: queryKeys.routes(),
    url: URL,
    initParams: params,
  });

  return { routes: data, ...query };
};

export const useSearchRoutesQuery = (tag = '') => {
  const [enabled, setEnabled] = useState(false);

  const { data, params, setParams, ...query } = useCreateSingleQuery<string[], ISearchParams>({
    key: queryKeys.routes.search(tag),
    url: `${URL}/search`,
    enabled,
  });

  const search = (q: string) => {
    if (q.length >= MIN_SEARCH_LENGTH) setEnabled(true);
    else setEnabled(false);

    setParams({ query: q });
  };

  return {
    items: enabled ? data || [] : [],
    search,
    enabled,
    params,
    ...query,
  };
};

export const useCreateRoute = () => {
  const { mutate, queryClient, ...query } = useCreateMutation<IRoute, IRouteCreateParams>({
    url: URL,
    method: 'post',
    options: {
      onSuccess: () => {
        console.log('invalidate', queryKeys.routes());

        queryClient.invalidateQueries({ queryKey: queryKeys.routes() });
      },
    },
  });

  return { createRoute: mutate, queryClient, ...query };
};

export const useUpdateRoute = (routeId: ID) => {
  const { mutate, queryClient, ...query } = useCreateMutation<IRoute, IRouteCreateParams>({
    url: `${URL}/${routeId}`,
    method: 'put',
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.routes() });
      },
    },
  });

  return { updateRoute: mutate, queryClient, ...query };
};
