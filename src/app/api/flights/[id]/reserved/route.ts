import { NextRequest, NextResponse } from 'next/server';
import { wrapToResponse } from '@/app/api';
import { getReservedSeats } from '@/server/repository/flights';

import type { IParams } from '@/app/api';
import type { ITicketClass } from '@/types/ticketClass';

export interface IReservedSeatsParams extends IParams {
  ticketClass: ITicketClass['name'];
}

const queryParams = (request: NextRequest): IReservedSeatsParams => ({
  ticketClass: request.nextUrl.searchParams.get('ticketClass') as ITicketClass['name'],
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const data = await getReservedSeats(Number(id), queryParams(request));

  return NextResponse.json(wrapToResponse(data));
}
