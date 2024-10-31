import { createPaginationParams, filterByUser, paginateV2, withDbClient } from '@/server/repository';
import { MODEL_NAMES } from '@/server/model';
import { mapTicket } from '@/server/repository/mappers';
import { Prisma } from '@prisma/client';
import type { ITicketsParams } from '@api/tickets/route';
import type { ISession } from '@/server/repository';

const filterByStatus = (status: ITicketsParams['status']): Prisma.TicketWhereInput => {
  const date: Prisma.DateTimeFilter<typeof MODEL_NAMES.FLIGHT> =
    status === 'all' ? {} : status === 'active' ? { gte: new Date() } : { lte: new Date() };

  return { ticketClass: { flight: { date } } };
};

export const getTickets = async ({ page, per, status = 'active' }: ITicketsParams, session: ISession) => {
  return withDbClient(async client => {
    const filter: Prisma.TicketWhereInput = { AND: { ...filterByUser(session), ...filterByStatus(status) } };
    const query = () =>
      client.ticket.findMany({
        include: { ticketClass: { include: { flight: { include: { route: true } } } }, user: true },
        ...createPaginationParams(page, per),
        where: { ...filter },
      });
    const totalQuery = () => client.ticket.count({ where: { ...filter } });

    return paginateV2({ query, mapper: mapTicket }, totalQuery, page, per);
  });
};
