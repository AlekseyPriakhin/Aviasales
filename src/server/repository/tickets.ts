import { createPaginationParams, paginateV2, withDbClient } from '@/server/repository';
import { MODEL_NAMES } from '@/server/model';
import type { Prisma, Ticket } from '@prisma/client';
import type { ITicket } from '@/types/ticket';
import type { ITicketsParams } from '@api/tickets/route';

const mapTicket = (ticket: Ticket): ITicket => ({
  ...ticket,
  currency: ticket.currency as ITicket['currency'],
});

const filterByStatus = (status: ITicketsParams['status']): Prisma.TicketWhereInput => {
  const date: Prisma.DateTimeFilter<typeof MODEL_NAMES.FLIGHT> =
    status === 'all' ? {} : status === 'active' ? { gte: new Date() } : { lte: new Date() };

  return { flight: { date } };
};

export const getTickets = async ({ page, per, status = 'active' }: ITicketsParams) => {
  return withDbClient(async client => {
    const query = () =>
      client.ticket.findMany({
        include: { flight: true },
        ...createPaginationParams(page, per),
        where: { ...filterByStatus(status) },
      });
    const totalQuery = () => client.ticket.count({ where: { ...filterByStatus(status) } });

    return paginateV2({ query, mapper: mapTicket }, totalQuery, page, per);
  });
};
