import { useCreateSingleQuery } from '@/queries';
import queryKeys from '@/queries/keys';
import { useState } from 'react';

const URL = '/routes';

interface ISearchParams {
  query?: string;
}

export const MIN_SEARCH_LENGTH = 3;

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
