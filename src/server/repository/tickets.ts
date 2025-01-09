import { Prisma } from '@prisma/client';

import { createPaginationParams, filterByUser, getUserBySession, paginate, withDbClient } from '@/server/repository';
import { mapTicket } from '@/server/repository/mappers';

import { MODEL_NAMES } from '@/server/model';
import { getNextSeat, validateSeat } from '@/server/model/ticket';

import type { ITicketCreateParams, ITicketsParams } from '@api/tickets/route';
import type { TError, ISession } from '@/server/repository';
import type { ITicket } from '@/types/ticket';

// const filterByFlight = (flightId?: number): Prisma.TicketWhereInput => {
//   if (!flightId) return {};

//   return { ticketClass: { flight: { id: flightId } } };
// };

const filterByStatus = (status: ITicketsParams['status']): Prisma.TicketWhereInput => {
  const date: Prisma.DateTimeFilter<typeof MODEL_NAMES.FLIGHT> =
    status === 'all' ? {} : status === 'active' ? { gte: new Date() } : { lte: new Date() };

  return { ticketClass: { flight: { date } } };
};

export const getTickets = async ({ page, per, flightId: id, status = 'active' }: ITicketsParams, session: ISession) => {
  return withDbClient(async client => {
    const filter: Prisma.TicketWhereInput = {
      user: filterByUser(session),
      // ...filterByFlight(id),
      ...filterByStatus(status),
    };

    const query = () =>
      client.ticket.findMany({
        include: { ticketClass: { include: { flight: { include: { route: true } } } }, user: true },
        ...createPaginationParams(page, per),
        where: { ...filter, ticketClass: { flight: { id } } },
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

    await client.flight.update({
      where: { id: flightId },
      data: { availableSeatsCount: { decrement: 1 }, reservedSeatsCount: { increment: 1 } },
    });
    await client.ticketClass.update({
      where: { id: ticketClassId },
      data: { available: { decrement: 1 }, reserved: { increment: 1 } },
    });

    return [mapTicket(ticket), null];
  });
};
