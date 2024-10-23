import { PrismaClient } from '@prisma/client';
import { wrapToResponse } from '@/app/api';
import { NextRequest, NextResponse } from 'next/server';
import type { IUser } from '@/types/user';
import { SHA256 } from 'crypto-js';

interface ILoginParams {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const client = new PrismaClient();

  const params = (await request.json()) as ILoginParams;
  const user = await client.user.findFirst({ where: { email: params.email } });

  console.log('checking', user && SHA256(params.password).toString() === user.password);

  if (user && SHA256(params.password).toString() === user.password) {
    return NextResponse.json(
      wrapToResponse<IUser>({
        id: user.id,
        email: user.email as string,
        name: user.name as string,
        phoneNumber: user.phoneNumber as string,
        secondName: user.secondName as string,
      }),
    );
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}
