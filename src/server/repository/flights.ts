import { createPaginationParams, paginate, withDbClient } from '@/server/repository';
import { mapFlight } from '@/server/repository/mappers';
import { Prisma } from '@prisma/client';
import { Currency } from '@/server/model';

import type { IFlightCreateParams, IFlightParams } from '@/app/api/flights/route';
import type { IReservedSeatsParams } from '@/app/api/flights/[id]/reserved/route';
import type { ISeat } from '@/types/ticket';

const filterByDate = (date: string[]): Prisma.FlightWhereInput => {
  if (date.length === 2) return { date: { gte: date[0], lte: date[1] } };
  if (date.length === 1) return { date: { equals: date[0] } };

  return {};
};

const filterByRoute = ({ from, to }: { from: string; to: string }): Prisma.FlightWhereInput => {
  return { route: { AND: { to: { contains: to }, from: { contains: from } } } };
};

const orderBy = (sort?: IFlightParams['sortBy']): Prisma.FlightOrderByWithRelationInput => {
  if (sort === 'date') return { date: 'asc' };
  if (sort === 'seats') return { availableSeatsCount: 'desc' };
  return {};
};

export const getFlights = async ({ page, per, to = '', sortBy = undefined, date = [], from = '' }: IFlightParams) => {
  return withDbClient(async client => {
    const filter: Prisma.FlightWhereInput = {
      ...filterByRoute({ to, from }),
      ...filterByDate(date),
    };

    const query = () =>
      client.flight.findMany({
        ...createPaginationParams(page, per),
        include: { route: true, ticketClasses: true },
        where: filter,
        orderBy: orderBy(sortBy),
      });
    const totalQuery = () => client.flight.count({ where: filter });

    return paginate({ query, mapper: mapFlight }, totalQuery, page, per);
  });
};

export const getFlight = async (id: number) => {
  return withDbClient(async client => {
    const flight = await client.flight.findFirst({ where: { id }, include: { route: true, ticketClasses: true } });

    if (!flight) return null;
    return mapFlight(flight);
  });
};

const filterByTicketClass = (ticketClass?: ISeat['ticketClass']): Prisma.TicketClassWhereInput => {
  if (!ticketClass) return {};

  return { name: { equals: ticketClass } };
};

export const getReservedSeats = async (id: number, params = {} as IReservedSeatsParams) => {
  return withDbClient<ISeat[]>(async client => {
    const tickets = await client.ticket.findMany({
      include: { ticketClass: true },
      where: { ticketClass: { AND: { flightId: id, ...filterByTicketClass(params.ticketClass) } } },
    });

    return tickets.map<ISeat>(t => ({
      seat: t.seat,
      flightId: id,
      ticketClassId: t.ticketClassId,
      ticketClass: t.ticketClass.name as ISeat['ticketClass'],
    }));
  });
};

export const createFlight = (params: IFlightCreateParams) => {
  return withDbClient(async client => {
    const ticketClasses = params.ticketClasses;

    const totalSeats = ticketClasses.reduce((acc, tc) => acc + tc.total, 0);

    const flight = await client.flight.create({
      data: {
        company: params.company,
        date: new Date(params.date),
        duration: params.duration,
        availableSeatsCount: totalSeats,
        reservedSeatsCount: 0,
        routeId: params.routeId,
        departureAirport: params.departureAirport,
        departureAirportCode: params.departureAirportCode,
        arrivingAirport: params.arrivingAirport,
        arrivingAirportCode: params.arrivingAirportCode,
        totalSeatsCount: totalSeats,
      },
    });

    ticketClasses.forEach(async (e, i) => {
      await client.ticketClass.create({
        data: { ...e, order: i, available: e.total, reserved: 0, currency: Currency.RUB, flightId: flight.id },
      });
    });

    return getFlight(flight.id);
  });
};

export const updateFlight = (id: number, params: IFlightCreateParams) => {
  return withDbClient(async client => {
    const ticketClasses = params.ticketClasses;
    const total = ticketClasses.reduce((acc, tc) => acc + tc.total, 0);

    await client.flight.update({
      where: { id },
      data: {
        company: params.company,
        date: new Date(params.date),
        duration: params.duration,
        availableSeatsCount: total,
        routeId: params.routeId,
        departureAirport: params.departureAirport,
        departureAirportCode: params.departureAirportCode,
        arrivingAirport: params.arrivingAirport,
        arrivingAirportCode: params.arrivingAirportCode,
        totalSeatsCount: total,
      },
    });

    ticketClasses.forEach(async e => {
      await client.ticketClass.update({
        where: { id: e.id },
        data: { ...e },
      });
    });

    return getFlight(id);
  });
};
