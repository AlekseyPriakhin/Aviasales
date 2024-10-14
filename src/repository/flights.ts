import { getEntities } from '@/data/data';
import { paginate, wrapToListPromise, wrapToPromise } from '@/repository';
import type { IParams } from '@/api';
import type { IFlight } from '@/types/flight';

export const getFlights = (params = {} as IParams) => {
  const { page = 1 } = params;

  const [data, pagination] = paginate(getEntities('flights'), page, params.per);

  return wrapToListPromise<IFlight>(data, pagination);
};

export const getFlight = (id: number) => {
  return wrapToPromise<IFlight | null>(getEntities('flights').find(e => e.id === id) ?? null);
};
