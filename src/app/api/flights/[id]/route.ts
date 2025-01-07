import { authorize, extractBody, wrapToResponse } from '@/app/api';
import { NextRequest, NextResponse } from 'next/server';
import { getFlight, updateFlight } from '@/server/repository/flights';

import type { IFlightCreateParams } from '@/app/api/flights/route';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const flight = await getFlight(Number(id));

  if (flight === null) return NextResponse.json({ error: `Flight with id - ${id} not found` }, { status: 404 });

  return NextResponse.json(wrapToResponse(flight));
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const [session, error] = await authorize('admin');
  if (error || !session) return error;

  const id = (await params).id;
  const data = await extractBody<IFlightCreateParams>(request);

  const flight = await updateFlight(Number(id), data);

  return NextResponse.json(wrapToResponse(flight));
}
