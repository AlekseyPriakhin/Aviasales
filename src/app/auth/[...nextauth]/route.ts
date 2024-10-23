import NextAuth, { getServerSession } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/server/db';

import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import type { IUser } from '@/types/user';
import type { IResponse } from '@/app/api';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
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
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.mail,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = (await res.json()) as IResponse<IUser>;

        if (json.data?.id) {
          return json.data;
        }

        return null;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, new-cap
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
