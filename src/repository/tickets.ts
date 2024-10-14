import { getEntities } from '@/data/data';
import { paginate, wrapToListPromise } from '@/repository';
import type { ITicket } from '@/types/ticket';

export const getTickets = (userId: number, page = 1) => {
  const [data, pagination] = paginate(
    getEntities('tickets').filter(e => e.userId === userId),
    page,
  );

  return wrapToListPromise<ITicket>(data, pagination);
};
