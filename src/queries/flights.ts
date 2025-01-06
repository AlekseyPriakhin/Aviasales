import { useCreateInfiniteQuery, useCreatePaginatedQuery, useCreateSingleQuery } from '@/queries';

import queryKeys from '@/queries/keys';

import type { IFlight } from '@/types/flight';
import type { IFlightParams } from '@/app/api/flights/route';
import type { ISeat } from '@/types/ticket';
import type { IReservedSeatsParams } from '@/app/api/flights/[id]/reserved/route';

const URL = '/flights';

export const useInfiniteFlights = (params?: IFlightParams) => {
  const { data, ...query } = useCreateInfiniteQuery<IFlight, IFlightParams>({
    key: queryKeys.flights(),
    url: URL,
    initParams: params,
  });

  return { flights: data, ...query };
};

export const usePaginatedFlights = (params?: IFlightParams) => {
  const { data, ...query } = useCreatePaginatedQuery<IFlight, IFlightParams>({
    key: ['flights-pagy'],
    url: URL,
    initParams: params,
  });

  return { flights: data || [], ...query };
};

export const useFlight = (id: number) => {
  const { data, ...query } = useCreateSingleQuery<IFlight | null>({
    key: queryKeys.flights.flight(id),
    url: URL,
    itemId: id,
  });

  return { flight: data, ...query };
};

export const useReservedSeats = (id: number, params?: IReservedSeatsParams) => {
  const { data, ...query } = useCreateSingleQuery<ISeat[]>({
    key: queryKeys.flights.flight.reserved(id),
    url: `${URL}/${id}/reserved`,
    initParams: params,
  });

  return { reservedSeats: data || [], ...query };
};
