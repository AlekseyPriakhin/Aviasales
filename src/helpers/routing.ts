import type { IAppSearchParams } from '@/hooks/searchParams';

type NonApiRoute<T extends string> = T extends `/api/${string}` ? never : T;

export type AppRoute = NonApiRoute<__next_route_internal_types__.RouteImpl<''>>;

export const createAppRoute = (
  path: AppRoute,
  { searchParams, queryParam }: { searchParams?: IAppSearchParams; queryParam?: string } = {
    searchParams: {},
    queryParam: '',
  },
) => {
  const params = new URLSearchParams(searchParams as any).toString();

  const urlBuilder: string[] = [path];
  if (queryParam) urlBuilder.push(`/${queryParam}`);
  if (params) urlBuilder.push(`?${params}`);
  return urlBuilder.join('');
};
