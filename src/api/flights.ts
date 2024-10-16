import { useCreateInfiniteQuery, useCreateSingleQuery } from '@/api';
import { getFlight, getFlights } from '@/repository/flights';

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

export const useFlight = (id: number) => {
  const { data, ...query } = useCreateSingleQuery<IFlight | null>({
    key: ['flight'],
    handler: getFlight,
    itemId: id,
  });

  return { flight: data, ...query };
};
