import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { getServerSession } from 'next-auth';
import { db } from '@/server/db';

import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { SHA256 } from 'crypto-js';

interface ISessionUser {
  id: string;
  name: string;
  secondName: string;
  email: string;
  phoneNumber: string;
}

// declare module 'next-auth' {
//   interface Session {
//     user: ISessionUser;
//   }
// }

const checkUser = async ({ email, password }: { email: string; password: string }): Promise<ISessionUser | null> => {
  const client = new PrismaClient();

  const user = await client.user.findFirst({ where: { email: email } });

  if (user && SHA256(password).toString() === user.password) {
    return {
      id: user.id,
      email: user.email as string,
      name: user.name as string,
      secondName: user.secondName as string,
      phoneNumber: user.phoneNumber as string,
    };
  }

  return null;
};

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'password',
      credentials: {
        mail: { label: 'Почта', type: 'text', placeholder: 'Почта' },
        password: { label: 'Пароль', type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials?.mail || !credentials.password) return null;
        return await checkUser({ email: credentials?.mail, password: credentials?.password });
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, new-cap
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
