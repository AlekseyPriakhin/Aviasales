import { createPaginationParams, paginate, withDbClient } from '@/server/repository';
import { mapFlight } from '@/server/repository/mappers';
import { Prisma } from '@prisma/client';
import type { IFlight } from '@/types/flight';
import type { IFlightParams } from '@/app/api/flights/route';

const filterByDate = (date: string): Prisma.FlightWhereInput => {
  if (!date) return {};
  return { date: { equals: date } };
};

const filterByRoute = ({ from, to }: { from: string; to: string }): Prisma.FlightWhereInput => {
  return { route: { AND: { to: { contains: to }, from: { contains: from } } } };
};

export const getFlights = async ({ page, per, to = '', date = '', from = '' }: IFlightParams) => {
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
      });
    const totalQuery = () => client.flight.count({ where: filter });

    return paginate({ query, mapper: mapFlight }, totalQuery, page, per);
  });
};

export const getFlight = async (id: number) => {
  return withDbClient<IFlight | null>(async client => {
    const flight = await client.flight.findFirst({ where: { id }, include: { route: true, ticketClasses: true } });

    if (!flight) return null;
    return mapFlight(flight);
  });
};
