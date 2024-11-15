import { createPaginationParams, filterByUser, getUserBySession, paginate, withDbClient } from '@/server/repository';
import { MODEL_NAMES } from '@/server/model';
import { mapTicket } from '@/server/repository/mappers';
import { Prisma } from '@prisma/client';
import type { ITicketCreateParams, ITicketsParams } from '@api/tickets/route';
import type { IError, ISession } from '@/server/repository';
import { getNextSeat, validateSeat } from '../model/ticket';

const filterByFlight = (flightId?: number): Prisma.TicketWhereInput => {
  if (!flightId) return {};

  return { ticketClass: { flightId } };
};

const filterByStatus = (status: ITicketsParams['status']): Prisma.TicketWhereInput => {
  const date: Prisma.DateTimeFilter<typeof MODEL_NAMES.FLIGHT> =
    status === 'all' ? {} : status === 'active' ? { gte: new Date() } : { lte: new Date() };

  return { ticketClass: { flight: { date } } };
};

export const getTickets = async ({ page, per, flightId: id, status = 'active' }: ITicketsParams, session: ISession) => {
  return withDbClient(async client => {
    const filter: Prisma.TicketWhereInput = {
      AND: { user: filterByUser(session), ...filterByStatus(status), ...filterByFlight(id) },
    };

    const query = () =>
      client.ticket.findMany({
        include: { ticketClass: { include: { flight: { include: { route: true } } } }, user: true },
        ...createPaginationParams(page, per),
        where: filter,
      });
    const totalQuery = () => client.ticket.count({ where: filter });

    return paginate({ query, mapper: mapTicket }, totalQuery, page, per);
  });
};

export const create = (
  { ticketClassId, ticketClass, seat }: ITicketCreateParams,
  session: ISession,
): IError | unknown => {
  return withDbClient(async client => {
    if (seat) {
      const otherFlightTickets = await client.ticket.findMany({
        where: {
          AND: {
            ticketClassId,
            ticketClass: { name: ticketClass },
          },
        },
        include: { ticketClass: true },
      });

      const [isValid, error] = validateSeat(seat, ticketClass, otherFlightTickets);

      if (!isValid) return error;
    }

    const [user, error] = await getUserBySession(client, session);
    if (error || !user) return error;

    // const seatNumber = getNextSeat(ticketClass, otherFlightTickets, await client.ticketClass.findMany())[0];

    const ticket = await client.ticket.create({
      data: {
        createdAt: new Date(),
        seat: seat as number,
        ticketClassId,
        userId: user.id,
      },
      include: { ticketClass: { include: { flight: { include: { route: true } } } } },
    });

    return mapTicket(ticket);
  });
};
