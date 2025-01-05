import { PrismaClient } from '@prisma/client';
import { wrapToResponse } from '@/app/api';
import { NextRequest, NextResponse } from 'next/server';
import type { IUser } from '@/types/user';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const client = new PrismaClient();

  const id = (await params).id;

  const user = await client.user.findFirst({ where: { id } });

  if (user === null) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(
    wrapToResponse<IUser>({
      id: user.id,
      email: user.email as string,
      name: user.name as string,
      phoneNumber: user.phoneNumber as string,
      secondName: user.secondName as string,
      role: (user as any).role || 'user',
    }),
  );
}
