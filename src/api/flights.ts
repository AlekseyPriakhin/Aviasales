import { useCreateInfiniteQuery, useCreateSingleQuery } from '@/api';

import type { IFlight } from '@/types/flight';
import type { IParams } from '@/api';

const URL = '/flights';

export const useInfiniteFlights = (params?: IParams) => {
  const { data, ...query } = useCreateInfiniteQuery<IFlight>({
    key: ['flights'],
    url: URL,
    initParams: params,
  });

  return { flights: data, ...query };
};

export const useFlight = (id: number) => {
  const { data, ...query } = useCreateSingleQuery<IFlight | null>({
    key: ['flight'],
    url: URL,
    itemId: id,
  });

  return { flight: data, ...query };
};
