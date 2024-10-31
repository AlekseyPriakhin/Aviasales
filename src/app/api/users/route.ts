import { PrismaClient } from '@prisma/client';
import { wrapToResponse } from '@/app/api';
import { NextRequest, NextResponse } from 'next/server';
import type { IUser } from '@/types/user';

export async function GET(request: NextRequest) {
  const client = new PrismaClient();

  const page = Number(request.nextUrl.searchParams.get('page')) || 1;
  const per = Number(request.nextUrl.searchParams.get('per')) || 10;

  const users = await client.user
    .findMany({
      skip: per * (page - 1),
      take: per,
    })
    .finally(async () => client.$disconnect());

  return NextResponse.json(
    wrapToResponse<IUser>(
      users.map(({ id, email, name, secondName, phoneNumber }) => ({
        id,
        email: email as string,
        name: name as string,
        secondName: secondName as string,
        phoneNumber: phoneNumber as string,
      })),
      { page, count: per, total: 1, totalPages: 1 },
    ),
  );
}
