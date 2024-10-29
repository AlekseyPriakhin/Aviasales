import '@/styles/globals.scss';
import styles from './layout.module.scss';

import { ThemeProvider } from '@gravity-ui/uikit';
import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import ReactQueryProvider from '@/providers/reactQuery';
import SessionProvider from '@/providers/SessionProvide';
import Header from '@/components/Header/header';
import type { AppTheme } from '@/hooks/useTheme';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviasales app',
  description: 'SPA development course',
};

const DEFAULT_THEME: AppTheme = 'light';
const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

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
          <body className={[DEFAULT_BODY_CLASSNAME, styles['body']].join(' ')}>
            <ThemeProvider theme={DEFAULT_THEME}>
              <Header />
              <main className={styles['main']}>{children}</main>
            </ThemeProvider>
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
