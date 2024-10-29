import { createPaginationParams, paginateV2, withDbClient } from '@/server/repository';
import type { Ticket } from '@prisma/client';
import type { ITicket } from '@/types/ticket';
import type { IParams } from '@/queries';

const mapTicket = (ticket: Ticket): ITicket => ({
  ...ticket,
  currency: ticket.currency as ITicket['currency'],
});

export const getTickets = async ({ page, per }: IParams) => {
  return withDbClient(async client => {
    const query = () => client.ticket.findMany({ ...createPaginationParams(page, per), include: { flight: true } });
    const totalQuery = () => client.ticket.count();

    return paginateV2({ query, mapper: mapTicket }, totalQuery, page, per);
  });
};
