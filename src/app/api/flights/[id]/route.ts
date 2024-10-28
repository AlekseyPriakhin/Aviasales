import { wrapToResponse } from '@/app/api';
import { NextRequest, NextResponse } from 'next/server';
import { getFlight } from '@/server/repository/flights';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const flight = await getFlight(Number(id));

  if (flight === null) return NextResponse.json({ error: `Flight with id - ${id} not found` }, { status: 404 });

  return NextResponse.json(wrapToResponse(flight));
}
