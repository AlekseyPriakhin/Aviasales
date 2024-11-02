import { createPaginationParams, paginate, withDbClient } from '@/server/repository';
import { mapFlight } from '@/server/repository/mappers';
import type { IFlight } from '@/types/flight';
import type { IParams } from '@/app/api';

export const getFlights = async ({ page, per }: IParams) => {
  return withDbClient(async client => {
    const query = () =>
      client.flight.findMany({ ...createPaginationParams(page, per), include: { route: true, ticketClasses: true } });
    const totalQuery = () => client.flight.count();

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
