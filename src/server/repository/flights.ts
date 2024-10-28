import { IParams, createPaginationParams, paginateV2 } from '@/server/repository';
import { Flight, PrismaClient, Route } from '@prisma/client';
import type { IFlight } from '@/types/flight';

const mapFlight = (flight: Flight & { route: Route }): IFlight => ({
  ...flight,
  route: flight.route,
});

export const getFlights = async ({ page, per }: IParams) => {
  const dbClient = new PrismaClient();

  const query = () => dbClient.flight.findMany({ ...createPaginationParams(page, per), include: { route: true } });
  const totalQuery = () => dbClient.flight.count();

  const response = await paginateV2({ query, mapper: mapFlight }, totalQuery, page, per);

  dbClient.$disconnect();

  return response;
};

export const getFlight = async (id: number) => {
  const dbClient = new PrismaClient();

  const flight = await dbClient.flight.findFirst({ where: { id }, include: { route: true } });

  dbClient.$disconnect();

  return flight ? mapFlight(flight) : null;
};
