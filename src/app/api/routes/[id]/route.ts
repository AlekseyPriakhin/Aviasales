import { NextRequest, NextResponse } from 'next/server';
import { authorize, extractBody, wrapToResponse } from '@/app/api';
import { IRouteCreateParams } from '../route';
import { updateRoute } from '@/server/repository/routes';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const [session, error] = await authorize('admin');
  if (error || !session) return error;

  const id = (await params).id;
  const data = await extractBody<IRouteCreateParams>(request);

  const route = await updateRoute(Number(id), data);
  return NextResponse.json(wrapToResponse(route));
}
