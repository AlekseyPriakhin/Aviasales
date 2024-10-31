import '@/styles/globals.scss';
import styles from './layout.module.scss';

import ReactQueryProvider from '@/providers/reactQuery';
import SessionProvider from '@/providers/SessionProvide';
import Header from '@/components/Header/header';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviasales app',
  description: 'SPA development course',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();

  return (
    <html>
      <SessionProvider session={session}>
        <ReactQueryProvider>
          <body className={[styles['body']].join(' ')}>
            <Header />
            <main className={styles['main']}>{children}</main>
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
