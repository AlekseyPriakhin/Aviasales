import { useCreateInfiniteQuery, useCreateSingleQuery } from '@/queries';

import type { IFlight } from '@/types/flight';
import type { IFlightParams } from '@/app/api/flights/route';
import type { ISeat } from '@/types/ticket';
import type { IReservedSeatsParams } from '@/app/api/flights/[id]/reserved/route';

const URL = '/flights';

export const useInfiniteFlights = (params?: IFlightParams) => {
  const { data, ...query } = useCreateInfiniteQuery<IFlight, IFlightParams>({
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

export const useReservedSeats = (id: number, params?: IReservedSeatsParams) => {
  const { data, ...query } = useCreateSingleQuery<ISeat[]>({
    key: ['reserved-seats'],
    url: `${URL}/${id}/reserved`,
    initParams: params,
  });

  return { reservedSeats: data || [], ...query };
};
