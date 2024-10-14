import { useCreateInfiniteQuery } from '@/api';
import { getFlights } from '@/repository/flights';

import type { IFlight } from '@/types/flight';
import type { IParams } from '@/api';

export const useInfiniteFlights = (params?: IParams) => {
  const { data, ...query } = useCreateInfiniteQuery<IFlight>({
    key: ['flights'],
    handler: getFlights,
    initParams: params,
  });

  return { flights: data, ...query };
};
