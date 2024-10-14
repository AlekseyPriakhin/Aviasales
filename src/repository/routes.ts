import { getEntities } from '@/data/data';
import { paginate, wrapToListPromise, wrapToPromise } from '@/repository';
import { IRoute } from '@/types/route';

export const getRoutes = (page = 1) => {
  const [data, pagination] = paginate(getEntities('routes'), page);

  return wrapToListPromise<IRoute>(data, pagination);
};

export const getRoute = async (id: number) => {
  return wrapToPromise<IRoute | null>(getEntities('routes').find(e => e.id === id) ?? null);
};
