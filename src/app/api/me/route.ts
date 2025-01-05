import { authorize, wrapToResponse } from '@/app/api';
import { NextResponse } from 'next/server';
import { findUserBySession } from '@/server/repository/users';

export async function GET() {
  const [session, error] = await authorize();

  if (error || !session) return NextResponse.json(error);

  const user = await findUserBySession(session);

  if (user === null) return NextResponse.json({ message: 'Not authorized', code: 401 });

  return NextResponse.json(wrapToResponse(user));
}
