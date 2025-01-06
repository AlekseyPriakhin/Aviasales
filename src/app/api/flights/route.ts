import { NextRequest, NextResponse } from 'next/server';
import { extractPaginationData, wrapToResponse } from '@/app/api';
import { getFlights } from '@/server/repository/flights';

import type { IParams } from '@/app/api';

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

export async function POST() {}
