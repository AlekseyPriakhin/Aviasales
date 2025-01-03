import { useCreateSingleQuery } from '@/queries';
import queryKeys from '@/queries/keys';
import { useEffect, useState } from 'react';

const URL = '/routes';

interface ISearchParams {
  query?: string;
}

const MIN_SEARCH_LENGTH = 3;

export const useSearchRoutesQuery = (tag = '') => {
  const [enabled, setEnabled] = useState(false);

  const { data, params, setParams, ...query } = useCreateSingleQuery<string[], ISearchParams>({
    key: queryKeys.routes.search(tag),
    url: `${URL}/search`,
    enabled,
  });

  useEffect(() => {
    if (!params.query) {
      return setEnabled(false);
    }

    if (params.query.length >= MIN_SEARCH_LENGTH) setEnabled(true);
    else setEnabled(false);
  }, [params]);

  const search = (q: string) => {
    console.log(q, enabled);

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
