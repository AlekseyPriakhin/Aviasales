import { authorize, extractPaginationData, wrapToResponse } from '@api/index';
import { NextRequest, NextResponse } from 'next/server';
import { getTickets } from '@/server/repository/tickets';
import type { IParams } from '@api/index';

export interface ITicketsParams extends IParams {
  status?: 'active' | 'elapsed' | 'all';
}

const params = (request: NextRequest): ITicketsParams => ({
  ...extractPaginationData(request),
  status: (request.nextUrl.searchParams.get('status') as ITicketsParams['status']) || 'active',
});

export async function GET(request: NextRequest) {
  const { error, session } = await authorize();
  if (error) return error;

  const [data, pagination] = await getTickets(params(request), session);

  return NextResponse.json(wrapToResponse(data, pagination));
}
