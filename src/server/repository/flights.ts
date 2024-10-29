import { IParams, createPaginationParams, paginateV2, withDbClient } from '@/server/repository';
import type { Flight, Route } from '@prisma/client';
import type { IFlight } from '@/types/flight';

const mapFlight = (flight: Flight & { route: Route }): IFlight => ({
  ...flight,
  route: flight.route,
});

export const getFlights = async ({ page, per }: IParams) => {
  return withDbClient(async client => {
    const query = () => client.flight.findMany({ ...createPaginationParams(page, per), include: { route: true } });
    const totalQuery = () => client.flight.count();

    return paginateV2({ query, mapper: mapFlight }, totalQuery, page, per);
  });
};

export const getFlight = async (id: number) => {
  return withDbClient<IFlight | null>(async client => {
    const flight = await client.flight.findFirst({ where: { id }, include: { route: true } });

    if (!flight) return null;
    return mapFlight(flight);
  });
};
