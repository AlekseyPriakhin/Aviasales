import { NextRequest, NextResponse } from 'next/server';
import { extractPaginationData, wrapToResponse } from '@/app/api';
import { getFlights } from '@/server/repository/flights';

export async function GET(request: NextRequest) {
  const [data, pagination] = await getFlights({ ...extractPaginationData(request) });

  return NextResponse.json(wrapToResponse(data, pagination));
}
