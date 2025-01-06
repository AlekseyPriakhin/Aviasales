import { IRouteCreateParams, IRouteParams } from '@/app/api/routes/route';
import { createPaginationParams, paginate, withDbClient } from '@/server/repository';
import { mapRoute } from '@/server/repository/mappers';

export const getRoutes = async ({ page, per }: IRouteParams) => {
  return withDbClient(async client => {
    const query = () => client.route.findMany({ ...createPaginationParams(page, per), orderBy: { id: 'asc' } });
    const totalQuery = () => client.route.count();

    return paginate({ query, mapper: mapRoute }, totalQuery, page, per);
  });
};

export const createRoute = async (params: IRouteCreateParams) => {
  return withDbClient(async client => {
    const route = await client.route.create({ data: params });

    return mapRoute(route);
  });
};

export const updateRoute = async (id: number, params: IRouteCreateParams) => {
  return withDbClient(async client => {
    const route = await client.route.update({ where: { id }, data: params });

    return mapRoute(route);
  });
};
