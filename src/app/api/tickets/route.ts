import { authorize, extractBody, extractPaginationData, wrapToResponse } from '@api/index';
import { NextRequest, NextResponse } from 'next/server';
import { getTickets } from '@/server/repository/tickets';

import type { IParams } from '@api/index';
import type { TicketClassName } from '@/types/ticketClass';

export interface ITicketsParams extends IParams {
  flightId?: number;
  status?: 'active' | 'elapsed' | 'all';
  class?: Lowercase<TicketClassName>;
}

const params = (request: NextRequest): ITicketsParams => ({
  ...extractPaginationData(request),
  status: (request.nextUrl.searchParams.get('status') as ITicketsParams['status']) || 'active',
  flightId: Number(request.nextUrl.searchParams.get('flightId')) || undefined,
});

export async function GET(request: NextRequest) {
  const { error, session } = await authorize();
  if (error) return error;

  const [data, pagination] = await getTickets(params(request), session);

  return NextResponse.json(wrapToResponse(data, pagination));
}

export interface ITicketCreateParams {
  flightId: number;
  ticketClassId: number;
  ticketClass: TicketClassName;
  seat?: number;
}

export async function POST(request: NextRequest) {
  const { error, session } = await authorize();
  if (error) return error;

  const d = await extractBody<ITicketCreateParams>(request);
  console.log(d);

  return NextResponse.json({ result: 'success' });
}
