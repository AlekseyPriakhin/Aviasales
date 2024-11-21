import { authorize, extractBody, extractPaginationData, wrapToResponse } from '@api/index';
import { NextRequest, NextResponse } from 'next/server';
import { getTickets, create as bookTicket } from '@/server/repository/tickets';

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
  const [session, error] = await authorize();
  if (error || !session) return error;

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
  const [session, authError] = await authorize();
  if (authError || !session) return authError;

  const data = await extractBody<ITicketCreateParams>(request);

  const [ticket, error] = await bookTicket(data, session);
  if (error || !ticket) return NextResponse.json(error, { status: 400 });

  return NextResponse.json(wrapToResponse(ticket));
}
