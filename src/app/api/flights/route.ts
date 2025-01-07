import { NextRequest, NextResponse } from 'next/server';
import { authorize, extractBody, extractPaginationData, wrapToResponse } from '@/app/api';
import { createFlight, getFlights } from '@/server/repository/flights';

import type { IParams } from '@/app/api';
import { TicketClassName } from '@/types/ticketClass';

export interface IFlightParams extends IParams {
  from?: string;
  to?: string;
  date?: string[];
}

const params = (request: NextRequest): IFlightParams => ({
  ...extractPaginationData(request),
  from: request.nextUrl.searchParams.get('from') || '',
  to: request.nextUrl.searchParams.get('to') || '',
  date: request.nextUrl.searchParams.getAll('date') || [],
});

export async function GET(request: NextRequest) {
  const [data, pagination] = await getFlights(params(request));
  return NextResponse.json(wrapToResponse(data, pagination));
}

export interface IFlightCreateParams {
  company: string;
  departureAirport: string;
  departureAirportCode: string;
  arrivingAirport: string;
  arrivingAirportCode: string;
  date: string;
  duration: number;
  ticketClasses: { id?: number; name: TicketClassName; total: number; cost: number }[];
  routeId: number;
}

export async function POST(request: NextRequest) {
  const [session, err] = await authorize('admin');
  if (err || !session) return err;

  const data = await extractBody<IFlightCreateParams>(request);
  return NextResponse.json(wrapToResponse(await createFlight(data)));
}
