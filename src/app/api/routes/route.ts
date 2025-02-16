import { authorize, extractBody, extractPaginationData, wrapToResponse, type IParams } from '@/app/api';
import { createRoute, getRoutes } from '@/server/repository/routes';
import { clearCache } from '@/server/repository/searchQuery';
import { NextRequest, NextResponse } from 'next/server';

export type IRouteParams = IParams;

const params = (request: NextRequest) => ({
  ...extractPaginationData(request),
});

export async function GET(request: NextRequest) {
  const [data, pagination] = await getRoutes(params(request));

  return NextResponse.json(wrapToResponse(data, pagination));
}

export interface IRouteCreateParams {
  from: string;
  to: string;
  description: string;
}

export async function POST(request: NextRequest) {
  const [session, authErr] = await authorize('admin');
  if (authErr || !session) return authErr;

  const data = await extractBody<IRouteCreateParams>(request);
  const route = await createRoute(data);

  clearCache();

  return NextResponse.json(wrapToResponse(route));
}
