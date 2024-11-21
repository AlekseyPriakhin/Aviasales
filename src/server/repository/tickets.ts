import { Prisma } from '@prisma/client';

import { createPaginationParams, filterByUser, getUserBySession, paginate, withDbClient } from '@/server/repository';
import { mapTicket } from '@/server/repository/mappers';

import { MODEL_NAMES } from '@/server/model';
import { getNextSeat, validateSeat } from '@/server/model/ticket';
import { updateCounters } from '@/server/model/ticketClass';

import type { ITicketCreateParams, ITicketsParams } from '@api/tickets/route';
import type { TError, ISession } from '@/server/repository';
import type { ITicket } from '@/types/ticket';

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

export const create = ({ ticketClassId, flightId, ticketClass, seat }: ITicketCreateParams, session: ISession) => {
  return withDbClient<[ITicket | null, TError]>(async client => {
    const [user, error] = await getUserBySession(client, session);
    if (error || !user) return [null, error];

    const otherFlightTickets = await client.ticket.findMany({
      where: {
        AND: {
          ticketClassId,
          ticketClass: { name: ticketClass, flightId },
        },
      },
      include: { ticketClass: true },
    });

    const ticketClasses = await client.ticketClass.findMany({ where: { flightId } });

    let seatNumber = seat;
    if (!seatNumber) {
      const [nextSeat, nextSeatError] = getNextSeat(ticketClass, otherFlightTickets, ticketClasses);

      if (nextSeatError) return [null, nextSeatError];
      seatNumber = nextSeat;
    }

    const [isValid, seatError] = validateSeat(seatNumber, ticketClass, otherFlightTickets, ticketClasses);
    if (seatError || !isValid) return [null, seatError];

    const ticket = await client.ticket.create({
      data: {
        createdAt: new Date(),
        seat: seatNumber,
        ticketClassId,
        userId: user.id,
      },
      include: { ticketClass: { include: { flight: { include: { route: true } } } } },
    });

    if (!ticket) return [null, { message: 'Ticket not created', code: 500 }];

    await client.ticketClass.update({ where: { id: ticketClassId }, data: updateCounters() });

    return [mapTicket(ticket), null];
  });
};
