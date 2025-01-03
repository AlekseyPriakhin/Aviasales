import { getSearchResults } from '@/server/repository/searchQuery';
import { NextRequest, NextResponse } from 'next/server';
import { wrapToResponse } from '../..';

const params = (request: NextRequest) => ({
  query: request.nextUrl.searchParams.get('query') || '',
});

export async function GET(request: NextRequest) {
  const data = await getSearchResults(params(request).query);

  return NextResponse.json(wrapToResponse(data));
}
